export class Cart {
  constructor() {
    this.cartProducts = [];
  }
  addToCart(product, amount) {
    let tempARR = [product, amount];
    this.cartProducts.push(tempARR);
    localStorage.setItem("theCart", JSON.stringify(this.cartProducts));
  }
}
