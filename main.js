let api = "https://fakestoreapi.com/products";
let main = document.querySelector("main");
let loader = document.querySelector("#loader");
let input = document.querySelector("#search");
let selectCategory = document.querySelector("#select1");
let selectSort = document.querySelector("#sort");

loader.style.display = "block";

let products = [];

fetch(api)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  })
  .then((data) => {
    loader.style.display = "none";
    products = data;
    renderProducts(products);
  })
  .catch((error) => {
    console.error("Error:", error);
    loader.style.display = "none";
    main.innerHTML = `<p class="error">Failed to load products. Please try again later.</p>`;
  });

function renderProducts(data) {
  main.innerHTML = "";
  data.forEach((item) => {
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <h2 class="H2">${item.title}</h2>
      <p class="des">${item.description}</p>
      <p class="Cost">Price: $${item.price}</p>
    `;
    main.appendChild(card);
  });
}

selectCategory.addEventListener("change", function () {
  let filteredProducts = products.filter((product) => {
    return selectCategory.value === "" || product.category === selectCategory.value;
  });
  renderProducts(filteredProducts);
});

selectSort.addEventListener("change", function () {
  let sortedProducts = [...products];
  if (selectSort.value === "expensive") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (selectSort.value === "cheap") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }
  renderProducts(sortedProducts);
});

input.addEventListener("input", function () {
  let searchTerm = input.value.toLowerCase();
  let filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );
  renderProducts(filteredProducts);
});