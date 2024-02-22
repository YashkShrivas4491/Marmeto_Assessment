let featuedImg = document.getElementById("featured-image");
let smallImgs = document.getElementsByClassName("small-Img");

for (let i = 0; i < smallImgs.length; i++) {
  smallImgs[i].addEventListener("click", () => {
    featuedImg.src = smallImgs[i].src;
    // Remove 'sm-card' class from all small images
    for (let j = 0; j < smallImgs.length; j++) {
      smallImgs[j].classList.remove("sm-card");
    }
    // Add 'sm-card' class to the clicked small image
    smallImgs[i].classList.add("sm-card");
  });
}
// Assuming you have a JSON file named product-data.json containing your product data.

// JavaScript code to fetch product data

fetch(
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448"
)
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
