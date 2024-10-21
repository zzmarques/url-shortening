const menu = () => {
    const btnMenu = document.querySelector("div.manu-hamb");
    const navbar = document.querySelector("nav.navbar");
    const links = document.querySelectorAll('nav.navbar ul li');
    

    const show = () => {
        if (navbar.style.display === 'none') {
            btnMenu.querySelector('i').remove();
            btnMenu.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
            navbar.style.display = 'block';
        } else {
            btnMenu.querySelector('i').remove();
            btnMenu.innerHTML = `<i class="fa-solid fa-bars"></i>`;
            navbar.style.display = 'none';
        }
        
    }

    const close = () => {
        btnMenu.querySelector('i').remove();
        btnMenu.innerHTML = `<i class="fa-solid fa-bars"></i>`;
        navbar.style.display = 'none';
    }

    links.forEach(btns => {
        btns.addEventListener('click', close)
    });

    btnMenu.addEventListener('click', show);    
}

menu();



const shortUrl = () => {
    // const url = "https://www.frontendmentor.io";
    const btnShorten = document.querySelector('div.container button.btn');

    const buscarUrl = async (url) => {
        const response = await fetch('https://cleanuri.com/api/v1/shorten', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
            'url': url 
            })
        });
        const data = await response.json();
    
        showLinks(url, data.result_url);
    }

    const showLinks = (url, link) => {
        const divInput = document.querySelector('section.sec2 div.container');
        const cardLinks = 
                `
                <div class="container-card">
                    <div class="card-link">
                        <div class="link">
                            <span>${url}</span>
                        </div>
                        <hr>
                        <div class="link-cop">
                            <span>${link}</span>
                            <button class="btn-copy">Copy</button>
                        </div>
                    </div>
                </div>
                `
        divInput.insertAdjacentHTML('afterend', cardLinks);
        const btnCopy = document.querySelectorAll('div.card-link button.btn-copy');

        const copyLink = (link, i) => {
           navigator.clipboard.writeText(link)
            btnCopy[i].innerHTML = "Copied!";
            btnCopy[i].style.backgroundColor = '#3b3054';
        }
        
        btnCopy.forEach( (btns, i) => {
            const index = i
            btns.addEventListener('click', () => {
                copyLink(link, i)
            })
        })
    }

    btnShorten.addEventListener('click', () => {
        const inputShort = document.querySelector('div.container-input input#urltxt');
        const url = inputShort.value;
        const spanErro = `<span>Please add a link</span>`;
        if (!url) {
            inputShort.classList.add("error");
            inputShort.insertAdjacentHTML('afterend', spanErro);
        } else { 
            const spanError = document.querySelector('div.container-input span') 
            inputShort.classList.remove("error");
            spanError ? spanError.remove() : '';
            buscarUrl(url);
        }
    });
}

shortUrl();

// fetch('https://cleanuri.com/api/v1/shorten', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     body: new URLSearchParams({
    //       'url': url 
    //     })
    //   })
    //   .then(response => response.json()) 
    //   .then(data => {
    //     const url = data.result_url
    //     shortUrl.push(url)
        
    //   })
    //   .catch(error => console.error('Erro ao encurtar a URL:', error));
