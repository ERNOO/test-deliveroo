import React from "react";
import "../Cart.css";
import formatPrice from "format-price";

class Cart extends React.Component {
  render() {
    if (this.props.cart.length === 0) {
      return (
        <div style={{ border: "0.5px solid grey", fontSize: 12 }}>
          Votre panier est vide
        </div>
      );
    } else {
      const basketMenus = [];
      var totalAmount = 0;

      for (let i = 0; i < this.props.cart.length; i++) {
        basketMenus.push(
          <li key={this.props.cart[i].id}>
            <button onClick={() => this.props.decrement(this.props.cart[i].id)}>
              -
            </button>
            <span>{this.props.cart[i].quantity}</span>
            <button onClick={() => this.props.increment(this.props.cart[i].id)}>
              +
            </button>
            <span>{this.props.cart[i].title}</span>
            <span>
              {formatPrice.format(
                "fr-FR",
                "EUR",
                parseFloat(this.props.cart[i].price) *
                  this.props.cart[i].quantity
              )}
            </span>
          </li>
        );
      }
      for (let i = 0; i < this.props.cart.length; i++) {
        totalAmount =
          totalAmount + this.props.cart[i].price * this.props.cart[i].quantity;
      }

      return (
        <div style={{ border: "0.5px solid grey", fontSize: 12 }}>
          <ul class="cartDetailedOrder">{basketMenus}</ul>
          <div>
            sous-total {formatPrice.format("fr-FR", "EUR", totalAmount)}
          </div>
        </div>
      );
    }
  }
}

export default Cart;
