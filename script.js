import { Store } from "./mods/storeClass.js";
import { Product } from "./mods/productClass.js";

let myStore = new Store("My Store");

myStore.allProducts.push(
  new Product(
    1,
    "Blusher",
    "./images/blusher.jpg",
    "The Best Blusher Ever!",
    10
  )
);
myStore.allProducts.push(
  new Product(
    2,
    "Eyeliner",
    "./images/eyeliner.jpg",
    "The Blackest Eyeliner Ever!",
    5
  )
);
myStore.allProducts.push(
  new Product(
    3,
    "Lipstick",
    "./images/lipstick.jpg",
    "The Lipstick You Need!",
    15
  )
);

// localStorage.setItem("allProducts", JSON.stringify(myStore.allProducts));
myStore.renderProducts();
let addProductBTN = document.getElementById("submitProduct");
addProductBTN.addEventListener("click", (e) => myStore.addProduct(e));

//Select Input
document.getElementById("theEditTitle").addEventListener("change", (e) => {
  let theTitle = document.getElementById("theEditTitle");

  if (Number(theTitle.value) == 0) {
    document.getElementById("theEditImage").setAttribute("value", "");
    document.getElementById("theEditDesc").setAttribute("value", "");
    document.getElementById("theEditPrice").setAttribute("value", "");
  } else {
    myStore.allProducts.forEach((product) => {
      if (Number(product.id) == Number(theTitle.value)) {
        document
          .getElementById("theEditImage")
          .setAttribute("value", product.image);
        document
          .getElementById("theEditDesc")
          .setAttribute("value", product.desc);
        document
          .getElementById("theEditPrice")
          .setAttribute("value", product.price);
      }
    });
  }
});

//Save Edit
document.getElementById("submitEditProduct").addEventListener("click", (e) => {
  let theID = document.getElementById("theEditTitle").value;
  let theImage = document.getElementById("theEditImage").value;
  let theDesc = document.getElementById("theEditDesc").value;
  let thePrice = document.getElementById("theEditPrice").value;

  if (theID != "0") {
    myStore.EditProduct(theID, theDesc, theImage, thePrice);
  }
});

function createInput(inputFields) {
  let tempInput = document.createElement("input");
  inputFields.forEach((theAttribute) => {
    tempInput.setAttribute(theAttribute[0], theAttribute[1]);
  });
  return tempInput;
}
let input1 = createInput([
  ["type", "text"],
  ["id", "myInput1"],
  ["class", "myInputs"],
  ["value", "fullName"],
  ["placeholder", "full name"],
]);
console.log(input1);

function createHTMLElement(elementType, attributeFields, theInnerHTML) {
  let tempElement = document.createElement(elementType);
  attributeFields.forEach((theAttribute) => {
    tempElement.setAttribute(theAttribute[0], theAttribute[1]);
  });
  tempElement.innerHTML = theInnerHTML;
  return tempElement;
}
let myHtmlElement = createHTMLElement(
  "a",
  [
    ["href", "#"],
    ["id", "myLink1"],
    ["class", "links"],
    ["target", "_blank"],
  ],
  "My Link"
);
console.log(myHtmlElement);
let myHtmlElement2 = createHTMLElement(
  "div",
  [
    ["id", "theSection"],
    ["class", "divs"],
  ],
  "My DIV"
);
console.log(myHtmlElement2);
