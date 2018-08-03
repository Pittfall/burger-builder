import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
import {INGREDIENT_NAMES} from '../../../Constants/Constants'

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        {Object.keys(INGREDIENT_NAMES).map(key => {
            return <BuildControl 
                        key={key} 
                        ingredient={INGREDIENT_NAMES[key]} 
                        added={() => props.ingredientAdded(key)} 
                        removed={() => props.ingredientRemoved(key)}
                        disable={props.disabled[key]}  />
        })}
        <button className={classes.OrderButton} disabled={!props.purchasable}>Order Now</button>
    </div>
);

export default buildControls;