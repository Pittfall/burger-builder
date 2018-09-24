import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    continueHandler = () => {
      this.props.history.push({pathname: this.props.match.path +  "/contact-data"});
    }

    cancelHandler = () => {
        this.props.history.push({pathname: "/"});
    }

    render () {
        return (
            <div>
                <CheckoutSummary ingredients={this.props.ingredients} continue={this.continueHandler} cancel={this.cancelHandler} />
                <Route path={this.props.match.path + "/contact-data"} component={ContactData} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);