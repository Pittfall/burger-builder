import React, {Fragment} from 'react';

import classes from './SideDrawer.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let classesToUse = [classes.SideDrawer, classes.Close];
    if (props.opened) {
        classesToUse = [classes.SideDrawer, classes.Open];
    }

    const attachedClasses = classesToUse.join(' ');


    return (
        <Fragment>
            <Backdrop show={props.opened} clicked={props.close} />
            <div className={attachedClasses}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Fragment>
    );
};

export default sideDrawer;