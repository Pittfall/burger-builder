import React, { Component } from 'react';

import { BASE_BURGER_PRICE } from '../../../Constants/Constants';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import { SaveOrder } from '../../../Http/API/API';

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    
    this.setState({loading: true});


    const totalPrice = Object.keys(this.props.ingredients).reduce((sum, key) => {
      const priceForIngredient = this.props.ingredients[key].price * this.props.ingredients[key].quantity;
      return sum + priceForIngredient;
    }, BASE_BURGER_PRICE);

    const order = {
        ingredients: this.props.ingredients,
        price: totalPrice, // Typically this is calculated on the server.
        customer: {
            name: this.state.name,
            age: this.state.age,
            email: this.state.email,
            address: {
              street: this.state.address.street,
              postalCode: this.state.address.postalCode
            }
        },
        deliverMethod: "Fast"
    }

    SaveOrder(order)
        .then(response => {
            this.setState({loading: false});
            this.props.history.push({pathname: "/"});
        })
        .catch(error => {
            this.setState({loading: false});
            alert(error); // Temporary alert.
        });
  }

  render () {
    let form = (
      <form>
        <Input inputtype='input' type='text' name='name' placeholder="Your Name" />
        <Input inputtype='input' type='email' name='email' placeholder="Your Email" />
        <Input inputtype='input' type='text' name='street' placeholder="Street" />
        <Input inputtype='input' type='text' name='postal' placeholder="Postal Code" />
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Please enter your contact info!</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;