import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FIELDS } from './Fields/fields';
import { checkValidity } from './Fields/validation';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import { purchaseBurger } from '../../../store/actions/order'

class ContactData extends Component {
  state = {
    orderForm: FIELDS,
    formIsValid: false
  }  

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formIdentifier in this.state.orderForm) {
      formData[formIdentifier] = this.state.orderForm[formIdentifier].value;
    }

    const order = {
        ingredients: this.props.ingredients,
        price: this.props.price,
        orderData: formData,
    }

    this.props.onOrderBurger(order);
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const orderFormCurrent = this.state.orderForm;
    orderFormCurrent[inputIdentifier].value = event.target.value;
    orderFormCurrent[inputIdentifier].valid = checkValidity(orderFormCurrent[inputIdentifier].value,
      orderFormCurrent[inputIdentifier].validation);
    orderFormCurrent[inputIdentifier].touched = true;

    let formIsValid = true;
    for (let i in orderFormCurrent) {
      if (!orderFormCurrent[i].valid) {
        formIsValid = false;
        break;
      }
    }

    this.setState({orderForm: orderFormCurrent, formIsValid: formIsValid});
  }

  render () {
    const formElements = Object.keys(this.state.orderForm).map(key => {
      const element = this.state.orderForm[key];

      return (
        <Input key={key}
          elementType={element.elementType} 
          elementConfig={element.elementConfig}
          value={element.value}
          invalid={!element.valid}
          touched={element.touched}
          changed={(event) => this.inputChangedHandler(event, key)} />
      )
    });

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements}
        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    );

    if (this.props.loading) {
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

const mapStateToProps = state => {
  return {
      ingredients: state.burgerBuilderReducer.ingredients,
      price: state.burgerBuilderReducer.totalPrice,
      loading: state.orderReducer.purchasing
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData) => dispatch(purchaseBurger(orderData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);