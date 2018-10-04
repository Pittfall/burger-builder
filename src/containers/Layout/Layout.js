import React, {Fragment, Component} from 'react';
import { connect } from 'react-redux';

import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }
    
    render () {
        return (
            <Fragment>
                <Toolbar isAuth={this.props.isAuthenticated} toggleSideDrawer={this.sideDrawerToggleHandler} />
                <SideDrawer isAuth={this.props.isAuthenticated} opened={this.state.showSideDrawer} close={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
   } 
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.token !== null
    }
}

export default connect(mapStateToProps)(Layout);