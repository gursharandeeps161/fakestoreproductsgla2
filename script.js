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

document.getElementById('sortSelect').addEventListener('change', () => {
    const sortOrder = document.getElementById('sortSelect').value;
    const sortedProducts = [...productList];
    if (sortOrder === "asc") {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
        sortedProducts.sort((a, b) => b.price - a.price);
    }
    displayProducts(sortedProducts);
});

document.getElementById('categoryFilter').addEventListener('change', () => {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filteredProducts = selectedCategory ?
        productList.filter(product => product.category === selectedCategory) :
        productList;
    displayProducts(filteredProducts);
});

fetchData();
