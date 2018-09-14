import React, { Component } from 'react';

import { BASE_BURGER_PRICE } from '../../../Constants/Constants';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import { SaveOrder } from '../../../Http/API/API';

class ContactData extends Component {
  getElement = (elemType, type, placeHolder) => {
    return {
      elementType: elemType,
      elementConfig: {
        type: type,
        placeholder: placeHolder
      },
      value: ''
    }
  }

  state = {
    orderForm: {
      name: this.getElement('input', 'text', 'Your Name'),
      street: this.getElement('input', 'text', 'Street'),
      postal: this.getElement('input', 'text', 'Postal Code'),
      country: this.getElement('input', 'text', 'Country'),
      email: this.getElement('input', 'email', 'Your Email'),
      deliverMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ],
          value: ''
        }
      }
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
    const formElements = Object.keys(this.state.orderForm).map(key => {
      const element = this.state.orderForm[key];

      return (
        <Input key={key}
          elementType={element.elementType} 
          elementConfig={element.elementConfig}
          value={element.value} />
      )
    });

    let form = (
      <form>
        {formElements}
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