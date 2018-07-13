import React from "react";
import axios from "axios";
import LinesEllipsis from "react-lines-ellipsis";
import Cart from "./Cart";

class Home extends React.Component {
  state = {
    selectedRestaurant: "",
    selectedDescription: "",
    selectedPicture: "",
    isLoading: true,
    menu: {},
    cart: []
  };

  renderPicture(keys, i, j) {
    if (this.state.menu[keys[i]][j].picture) {
      return (
        <img
          src={this.state.menu[keys[i]][j].picture}
          className="mealContent_img"
        />
      );
    }
    return null;
  }

  decrement = id => {
    // On crée une copie du panier car nous ne modifions jamais le state directement
    const newCart = [...this.state.cart];

    for (let i = 0; i < newCart.length; i++) {
      if (newCart[i].id === id && newCart[i].quantity > 0) {
        newCart[i].quantity--;
        break;
      }
    }

    this.setState({
      cart: newCart
    });
  };

  // Incrémenter la quantité d'un produit
  increment = id => {
    // On crée une copie du panier car nous ne modifions jamais le state directement
    const newCart = [...this.state.cart];

    for (let i = 0; i < newCart.length; i++) {
      if (newCart[i].id === id) {
        newCart[i].quantity++;
        break;
      }
    }

    this.setState({
      cart: newCart
    });
  };

  addMenu = menu => {
    // On crée une copie du panier car nous ne modifions jamais le state directement
    const newCart = [...this.state.cart];

    // Nous allons vérifier si le menu est déjà dans le panier
    let menuFound = false;
    for (let i = 0; i < newCart.length; i++) {
      if (newCart[i].id === menu.id) {
        // Quand le menu est trouvé, on sauvegarde sa position dans le tableau
        menuFound = true;
        // Si le menu est déjà présent, on incrémente la quantité
        newCart[i].quantity++;
        // Nous pouvons sortir de la boucle avec break car nous avons trouvé le menu
        break;
      }
    }

    // Si le menu n'a jamais été ajouté :
    if (menuFound === false) {
      newCart.push({
        id: menu.id,
        title: menu.title,
        quantity: 1,
        price: menu.price
      });
    }

    // Ajouter le menu dans le panier
    this.setState({
      cart: newCart
    });
  };

  render() {
    const morningMenu = [];
    const keys = Object.keys(this.state.menu);
    console.log(keys);
    if (this.state.isLoading === true) {
      return <span>"loading..."</span>;
    } else {
      for (let i = 0; i < keys.length; i++) {
        if (this.state.menu[keys[i]].length > 0) {
          console.log("hello if");

          morningMenu.push(<h2 key={keys[i]}>{keys[i]}</h2>);
          const items = [];
          for (let j = 0; j < this.state.menu[keys[i]].length; j++) {
            items.push(
              <li
                key={this.state.menu[keys[i]][j].id}
                className="mealContent"
                style={{ border: "1px solid grey" }}
                onClick={() => this.addMenu(this.state.menu[keys[i]][j])}
              >
                <div>
                  <h3>{this.state.menu[keys[i]][j].title}</h3>
                  <LinesEllipsis
                    text={this.state.menu[keys[i]][j].description}
                    maxLine="3"
                    ellipsis="..."
                    trimRight
                    basedOn="letters"
                    className="description"
                  />
                  <p>{this.state.menu[keys[i]][j].price}</p>
                </div>
                {this.renderPicture(keys, i, j)}
              </li>
            );
          }
          morningMenu.push(<ul className="morningMenu">{items}</ul>);
        }
      }
    }
    console.log("morningMenu");

    console.log(morningMenu);
    return (
      <div>
        <div id="blocRestaurant">
          <div id="headRestaurant">
            <div id="restPresentation">
              <h1>{this.state.selectedRestaurant}</h1>
              <p>{this.state.selectedDescription}</p>
            </div>
            <img id="restaurantpic" src={this.state.selectedPicture} />
          </div>
        </div>
        <div className="container menu">
          <div className="meals">{morningMenu}</div>
          <div className="cart">
            <div id="cartCard">
              <button id="cartButton">Valider votre panier</button>
              <Cart
                cart={this.state.cart}
                decrement={this.decrement}
                increment={this.increment}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    console.log("componentDidMount");
    axios
      .get(
        "https://s3-eu-west-1.amazonaws.com/lereacteurapp/react/deliveroo/deliveroo-cart.json"
      )
      .then(response => {
        this.setState({
          selectedRestaurant: response.data.restaurant.name,
          selectedDescription: response.data.restaurant.description,
          selectedPicture: response.data.restaurant.picture,
          menu: response.data.menu,
          isLoading: false
        });
      });
  }
}

export default Home;
