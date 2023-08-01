import { Product } from "./productClass.js";
import { Cart } from "./classCart.js";

export class Store {
  name;
  constructor(name) {
    this.name = name;
    this.allProducts = [];
    this.myCart = new Cart();
    if (localStorage.getItem("theCart")) {
      this.myCart.cartProducts = JSON.parse(localStorage.getItem("theCart"));
      this.renderCart();
    }
  }
  renderCart() {
    this.myCart.cartProducts = JSON.parse(localStorage.getItem("theCart"));
    let cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "";

    this.myCart.cartProducts.forEach((cartProduct, index) => {
      //Outer product div

      let cartProductDiv = document.createElement("div");
      cartProductDiv.setAttribute("class", "cartProduct");
      cartProductDiv.setAttribute("id", `cartProduct${cartProduct[0].id}`);

      //Product Title
      let cartProductTitle = document.createElement("h3");
      cartProductTitle.innerHTML = `${cartProduct[0].title}:`;

      //Product Image

      let cartProductImage = createHTMLElement("img", [
        ["class", "productImage"],
        ["src", cartProduct[0].image],
        ["alt", cartProduct[0].title],
      ]);

      //Product Price

      let cartProductPrice = createHTMLElement(
        "p",
        [["class", "cartProductPrice"]],
        `${cartProduct[0].price}$ * `
      );

      //Product Amount

      let productAmount = this.createInput([
        ["type", "number"],
        ["id", `cartAmount${cartProduct[0].id}`],
        ["name", `amount${cartProduct[0].id}`],
        ["class", `amountOfProduct`],
        ["value", cartProduct[1]],
        ["min", `0`],
      ]);
      productAmount.addEventListener("change", () => {
        document.getElementById(`totalPrice${cartProduct[0].id}`).innerHTML =
          Number(cartProduct[0].price) * Number(productAmount.value);

        if (productAmount.value > 0) {
          let foundProduct = -1;
          this.myCart.cartProducts.forEach((element, index) => {
            if (element[0].id == cartProduct[0].id) {
              foundProduct = index;
            }
          });
          if (foundProduct == -1) {
            this.myCart.addToCart(cartProduct[0].id, productAmount.value);
          } else {
            this.myCart.cartProducts[foundProduct][1] = productAmount.value;
          }
          localStorage.setItem(
            "theCart",
            JSON.stringify(this.myCart.cartProducts)
          );
          console.log(this.myCart.cartProducts);
          this.renderCart();
        }
      });
      //Total product Price

      let TotalProductPrice = document.createElement("p");
      TotalProductPrice.innerHTML = `= <span id="totalPrice${
        cartProduct[0].id
      }">${Number(cartProduct[0].price) * Number(cartProduct[1])}</span>$`;

      // remove product from cart:

      let removeButton = document.createElement("button");
      removeButton.setAttribute("class", "RemoveBTN");
      removeButton.setAttribute("id", `remove${cartProduct[0].id}}`);
      removeButton.innerHTML = "X";
      removeButton.addEventListener("click", () => {
        this.myCart.cartProducts.splice(index, 1);

        localStorage.setItem(
          "theCart",
          JSON.stringify(this.myCart.cartProducts)
        );
        this.renderCart();
      });

      //Pushing all Elements to the Div of the Product
      cartProductDiv.appendChild(cartProductImage);
      cartProductDiv.appendChild(cartProductTitle);

      cartProductDiv.appendChild(cartProductPrice);

      cartProductDiv.appendChild(productAmount);
      cartProductDiv.appendChild(TotalProductPrice);
      cartProductDiv.appendChild(removeButton);
      //Pushing the Product's Div to the Div of all the products
      cartDiv.appendChild(cartProductDiv);

      // RemoveProductFromCart();
    });
  }
  renderProducts() {
    this.#privateRenderProducts();
  }
  #privateRenderProducts() {
    let productsDiv = document.getElementById("products");
    this.allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];
    productsDiv.innerHTML = "";

    this.allProducts.forEach((product, index) => {
      //Outer product div

      let productDiv = document.createElement("div");
      productDiv.setAttribute("class", "product");
      productDiv.setAttribute("id", `product${product.id}`);

      //Product Title

      let productTitle = document.createElement("h3");
      productTitle.innerHTML = product.title;

      //Product Image

      let productImage = createHTMLElement("img", [
        ["class", "productImage"],
        ["src", product.image],
        ["alt", product.title],
      ]);

      //Product Description
      let productDesc = document.createElement("p");
      productDesc.innerHTML = product.desc;

      //Product Price
      let productPrice = document.createElement("p");
      productPrice.innerHTML = `Price: ${product.price}$`;

      //Product Amount
      let amountP = document.createElement("p");
      amountP.setAttribute("class", `amountP`);

      let amountLabel = document.createElement("label");
      amountLabel.setAttribute("for", `amount${product.id}`);
      amountLabel.innerHTML = "Amount: ";

      let productAmount = this.createInput([
        ["type", "number"],
        ["id", `amount${product.id}`],
        ["name", `amount${product.id}`],
        ["class", `amountOfProduct`],
        ["placeholder", `0`],
        ["value", `0`],
        ["min", `0`],
      ]);
      amountP.appendChild(amountLabel);
      amountP.appendChild(productAmount);

      // add to cart button:

      let productBTN = this.createInput([
        ["type", "submit"],
        ["id", `ToCart${product.id}`],
        ["class", `AddToCartBtn`],
        ["value", `Add To Cart`],
      ]);
      productBTN.addEventListener("click", () => {
        if (productAmount.value > 0) {
          let foundProduct = -1;
          this.myCart.cartProducts.forEach((element, index) => {
            if (element[0].id == product.id) {
              foundProduct = index;
            }
          });
          if (foundProduct == -1) {
            this.myCart.addToCart(product, productAmount.value);
          } else {
            this.myCart.cartProducts[foundProduct][1] = productAmount.value;
          }
          localStorage.setItem(
            "theCart",
            JSON.stringify(this.myCart.cartProducts)
          );
          console.log(this.myCart.cartProducts);
          this.renderCart();
        }
      });

      // remove product from all products:

      let RemoveProductBTN = this.createInput([
        ["type", "submit"],
        ["id", `RemoveProduct${product.id}`],
        ["class", `RemoveProductBTN`],
        ["value", `Remove`],
      ]);

      RemoveProductBTN.addEventListener("click", () => {
        this.allProducts.splice(index, 1);
        localStorage.setItem("allProducts", JSON.stringify(this.allProducts));
        this.renderProducts();

        //deleting product from cart after removing product from all products:

        let foundProduct = "-1";
        this.myCart.cartProducts.forEach((element, index) => {
          if (Number(element[0].id) == Number(product.id)) {
            foundProduct = index;
          }
        });
        if (foundProduct != "-1") {
          this.myCart.cartProducts.splice(Number(foundProduct), 1);
          localStorage.setItem(
            "theCart",
            JSON.stringify(this.myCart.cartProducts)
          );
          this.renderCart();
        }

        location.href = "/";
      });

      //Pushing all Elements to the Div of the Product
      productDiv.appendChild(productTitle);
      productDiv.appendChild(productImage);
      productDiv.appendChild(productDesc);
      productDiv.appendChild(productPrice);
      productDiv.appendChild(amountP);
      productDiv.appendChild(productBTN);
      productDiv.appendChild(RemoveProductBTN);
      //Pushing the Product's Div to the Div of all the products
      productsDiv.appendChild(productDiv);

      //Pushing product names to edit form
      let tempSelectOption = document.createElement("option");
      tempSelectOption.setAttribute("value", product.id);
      console.log(product.title);
      tempSelectOption.innerHTML = product.title;
      document.getElementById("theEditTitle").appendChild(tempSelectOption);
    });
  }
  addProduct() {
    let theID = document.getElementById("theID").value;
    let theTitle = document.getElementById("theTitle").value;
    let theImage = document.getElementById("theImage").value;
    let theDesc = document.getElementById("theDesc").value;
    let thePrice = document.getElementById("thePrice").value;

    let tempProduct = new Product(theID, theTitle, theImage, theDesc, thePrice);
    this.allProducts.push(tempProduct);
    localStorage.setItem("allProducts", JSON.stringify(this.allProducts));
    this.renderProducts();
  }

  // edit product function:

  EditProduct(theID, theDesc, theIMG, thePrice) {
    this.allProducts.forEach((product) => {
      if (Number(theID) == Number(product.id)) {
        product.desc = theDesc;
        product.image = theIMG;
        product.price = thePrice;
      }
    });
    localStorage.setItem("allProducts", JSON.stringify(this.allProducts));
    this.renderProducts();

    //deleting product from cart after edit
    let foundProduct = "-1";
    this.myCart.cartProducts.forEach((element, index) => {
      if (Number(element[0].id) == Number(theID)) {
        foundProduct = index;
      }
    });
    if (foundProduct != "-1") {
      this.myCart.cartProducts.splice(Number(foundProduct), 1);
      localStorage.setItem("theCart", JSON.stringify(this.myCart.cartProducts));
      this.renderCart();
    }

    location.href = "/";
  }

  createInput(inputFields) {
    let tempInput = document.createElement("input");
    inputFields.forEach((theAttribute) => {
      tempInput.setAttribute(theAttribute[0], theAttribute[1]);
    });
    return tempInput;
  }
}

function createHTMLElement(elementType, attributeFields, theInnerHTML) {
  let tempElement = document.createElement(elementType);
  attributeFields.forEach((theAttribute) => {
    tempElement.setAttribute(theAttribute[0], theAttribute[1]);
  });
  tempElement.innerHTML = theInnerHTML;
  return tempElement;
}
