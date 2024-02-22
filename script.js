let featuredImg = document.getElementById("featured-image");
let smallImgs = document.getElementsByClassName("small-Img");

for (let i = 0; i < smallImgs.length; i++) {
  smallImgs[i].addEventListener("click", () => {
    featuredImg.src = smallImgs[i].src;
    // Remove 'sm-card' class from all small images
    for (let j = 0; j < smallImgs.length; j++) {
      smallImgs[j].classList.remove("sm-card");
    }
    // Add 'sm-card' class to the clicked small image
    smallImgs[i].classList.add("sm-card");
  });
}

// Get references to HTML elements
var decrementBtn = document.getElementById("decrement");
var incrementBtn = document.getElementById("increment");
var quantityLabel = document.getElementById("quantity");

// Initialize quantity value
var quantity = 1;

// Decrement button click event listener
decrementBtn.addEventListener("click", function () {
  if (quantity > 1) {
    quantity--;
    quantityLabel.textContent = quantity;
  }
});

// Increment button click event listener
incrementBtn.addEventListener("click", function () {
  quantity++;
  quantityLabel.textContent = quantity;
});

const btn = document.querySelector("button");

btn.addEventListener("click", function () {
  // Display cart message
  var cartMessage = document.getElementById("cart-message");
  cartMessage.innerHTML = "Product added to cart!";
  cartMessage.style.display = "block";
});

// JavaScript code to fetch product data
const API_DATA =
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948";

fetch(API_DATA)
  .then((response) => response.json())
  .then((data) => {
    // Once data is fetched successfully, you can use it to update the HTML content
    renderProduct(data.product);
  })
  .catch((error) => console.error("Error fetching product data:", error));

// Function to render product data
function renderProduct(product) {
  document.querySelector(".product-info p").innerHTML = `${product.vendor}`;

  document.querySelector(".product-info h3").innerText = product.title;

  document.querySelector(
    ".product-info h5"
  ).innerHTML = `Price: ${product.price}`;

  document.querySelector(
    ".product-info h4"
  ).innerHTML = `<del>${product.compare_at_price}</del>`;

  document.querySelector(".description p").innerHTML = product.description;

  // Update size options
  const sizeSelect = document.getElementById("size");
  sizeSelect.innerHTML = "";
  product.options[1].values.forEach((size) => {
    const option = document.createElement("option");
    option.value = size.toLowerCase();
    option.innerText = size;
    sizeSelect.appendChild(option);
  });

  const colorContainer = document.querySelector(".color-lable"); // Corrected class name
  colorContainer.innerHTML = ""; // Clear previous content

  product.options[0].values.forEach((color) => {
    const colorName = Object.keys(color)[0];
    const colorValue = color[colorName];

    const colorBox = document.createElement("div");
    colorBox.className = "color-box";
    colorBox.style.backgroundColor = colorValue;
    colorBox.title = colorName; // Show color name on hover

    colorContainer.appendChild(colorBox);
  });
}
