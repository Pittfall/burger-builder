import React, { Fragment } from 'react';

import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
    let modalClasses = classes.Modal;
    const visibility = props.show ? classes.Show : classes.NoShow;
    modalClasses += ' ' + visibility;

    // Another solution is to turn this into a class component and use the,
    // shouldComponentUpdate method to check if the show property changed.
    const modalContent = props.show ? props.children : null;

    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
            <div className={modalClasses}>
                {modalContent}
            </div>
        </Fragment>
    )
}

export default modal;