import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { authCheckState } from './store/actions/auth';

// Should only be used in large applications to make it worth it.
// Lazy loading isn't really needed here but I put it in as proof of concept.
const AsyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

class App extends Component {
  componentDidMount () {
      this.props.onTryAuthSignIn();
  }

  render() {
   let routes = (
      <Switch>
         <Route path="/auth" component={Auth} />
         <Route path="/" exact component={BurgerBuilder} />
         <Redirect to="/" />
      </Switch>
   );

   if (this.props.isAuth) {
      routes = (
         <Switch>
            <Route path="/checkout" component={AsyncCheckout} />
            <Route path="/orders" component={Orders} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
         <Redirect to="/" />
         </Switch>
      );
   }
    return (
      <div>
        { /* This can be the root component but I kept App as the root component in case layout changes and I need
        to change something at the root level. */}
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
   return {
      isAuth: state.authReducer.token !== null
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onTryAuthSignIn: () => dispatch(authCheckState())
   };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
