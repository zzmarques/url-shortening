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
    const btnShorten = document.querySelector('div.container button.btn');
    const apiKey = 'Jameds7SNp5FDsDncO4CmOVB8l9i8dmZnUkfGeZ7nMrEnLcpGfP7s2sb6RYK';
    
    const buscarUrl = async (url) => {
        const response = await fetch('https://api.tinyurl.com/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                url: url,
                domain: "tiny.one"
            })
        });
        const data = await response.json();
    
        showLinks(url, data.data?.tiny_url);
    }

    const showLinks = (url, link) => {
        const divInput = document.querySelector('section.sec2 div.container-card');
        const cardLinks = 
                `
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
                `
        divInput.insertAdjacentHTML('beforeend', cardLinks);
        const btnCopy = document.querySelectorAll('div.card-link button.btn-copy');

        const copyLink = (link, i) => {
            navigator.clipboard.writeText(link)
            btnCopy[i].innerHTML = "Copied!";
            btnCopy[i].style.backgroundColor = '#3b3054';
        }
        
        btnCopy.forEach( (btns, i) => {
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

