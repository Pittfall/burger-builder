import React, { Fragment } from 'react';

import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
    let modalClasses = classes.Modal;
    const visibility = props.show ? classes.Show : classes.NoShow;
    modalClasses += ' ' + visibility;


    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
            <div className={modalClasses}>
                {props.children}
            </div>
        </Fragment>
    )
}

export default modal;