const API_URL = ''; 
let currentPage = localStorage.getItem('currentPage') || 'products';

document.addEventListener('DOMContentLoaded', () => {
    loadPage(currentPage);

    document.getElementById('products-link').addEventListener('click', () => loadPage('products'));
    document.getElementById('categories-link').addEventListener('click', () => loadPage('categories'));
    document.getElementById('users-link').addEventListener('click', () => loadPage('users'));
});

async function loadPage(page) {
    localStorage.setItem('currentPage', page);
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    let data;
    if (page === 'products') {
        data = await fetchData($,{API_URL}/products);
    } else if (page === 'categories') {
        data = await fetchData($,{API_URL}/categories);
    } else if (page === 'users') {
        data = await fetchData($,{API_URL}/users);
    }

    renderCards(data);
}

async function fetchData(url) {
    const response = await fetch(url);
    return await response.json();
}

function renderCards(data) {
    const contentDiv = document.getElementById('content');
    
    let displayedCount = 4;
    
    const render = (count) => {
        contentDiv.innerHTML = ''; // Очистить контент
        const cards = data.slice(0, count).map(item => 
            <div class="card">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>
        ).join('');
        contentDiv.innerHTML += cards;

        if (data.length > count) {
            const showMoreButton = document.createElement('button');
            showMoreButton.textContent = 'Показать еще';
            showMoreButton.onclick = () => {
                displayedCount += 4;
                render(displayedCount);
            };
            contentDiv.appendChild(showMoreButton);
        }

        if (displayedCount >= data.length) {
            const hideButton = document.createElement('button');
            hideButton.textContent = 'Скрыть';
            hideButton.onclick = () => render(4);
            contentDiv.appendChild(hideButton);
        }
    };

    render(displayedCount);
}
