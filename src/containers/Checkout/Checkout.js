import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
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
        let summary = <Redirect to="/" />

        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary ingredients={this.props.ingredients} continue={this.continueHandler} cancel={this.cancelHandler} />
                    <Route path={this.props.match.path + "/contact-data"} component={ContactData} />
                </div>
            )
        }

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilderReducer.ingredients,
        purchased: state.orderReducer.purchased
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);