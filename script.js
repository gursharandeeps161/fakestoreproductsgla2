const apiUrl = "https://fakestoreapi.com/products";
const productContainer = document.querySelector("#product-container");
let productList = [];

async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        productList = data;
        displayProducts(productList);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayProducts(products) {
    productContainer.innerHTML = "";
    products.forEach(product => {
        const productCard = createProductCard(product);
        productContainer.appendChild(productCard);
    });
}

function createProductCard(product) {
    const productCard = document.createElement("div");
    productCard.classList.add("product");

    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="product-details">
            <h3>${product.title}</h3>
            <p>Category: ${product.category}</p>
            <p>Price: $${product.price}</p>
            <p>Rating: ${product.rating.rate}</p>
            <p>Count: ${product.rating.count}</p>
            <button class="desc">Description</button>
            <p class="description" style="display: none;">${product.description}</p>
        </div>
    `;

    productCard.querySelector('.desc').addEventListener('click', () => {
        const description = productCard.querySelector('.description');
        description.style.display = description.style.display === 'none' ? 'block' : 'none';
    });

    return productCard;
}

function filterByCategory(category) {
    return productList.filter(product => product.category === category);
}

document.getElementById('sortSelect').addEventListener('change', () => {
    const sortOrder = document.getElementById('sortSelect').value;
    const selectedCategory = document.getElementById('categoryFilter').value;

    let filteredProducts = productList;
    if (selectedCategory) {
        filteredProducts = filterByCategory(selectedCategory);
    }

    if (sortOrder === "asc") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    displayProducts(filteredProducts);
});

document.getElementById('categoryFilter').addEventListener('change', () => {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const sortOrder = document.getElementById('sortSelect').value;

    let filteredProducts = productList;
    if (selectedCategory) {
        filteredProducts = filterByCategory(selectedCategory);
    }

    if (sortOrder === "asc") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    displayProducts(filteredProducts);
});

fetchData();
