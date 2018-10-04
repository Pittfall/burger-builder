import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        {Object.keys(props.ingredients).map(key => {
            return <BuildControl 
                        key={key} 
                        ingredient={props.ingredients[key].name} 
                        added={() => props.ingredientAdded(key)} 
                        removed={() => props.ingredientRemoved(key)}
                        disable={props.disabled[key]}  />
        })}
        <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.order}>
            { props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER" }
        </button>
    </div>
);

export default buildControls;