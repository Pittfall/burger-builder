export const FIELDS = Object.freeze({
    name: {
        elementType: 'input',
        elementConfig: {
            type: 'text', 
            placeholder: 'Your Name'
        },
        value: '',
        validation: {
            required: false
        },
        valid: false
    },
    street: {
        elementType: 'input',
        elementConfig: {
            type: 'text', 
            placeholder: 'Street'
        },
        value: '',
        validation: {
            required: false
        },
        valid: false
    },
    postal: {
        elementType: 'input',
        elementConfig: {
            type: 'text', 
            placeholder: 'Postal Code'
        },
        value: '',
        validation: {
            required: false,
            minLenght: 6,
            maxLength: 6
        },
        valid: false
    },
    country: {
        elementType: 'input',
        elementConfig: {
            type: 'text', 
            placeholder: 'Country'
        },
        value: '',
        validation: {
            required: false
        },
        valid: false
    },
    email: {
        elementType: 'input',
        elementConfig: {
            type: 'email', 
            placeholder: 'Email'
        },
        value: '',
        validation: {
            required: false
        },
        valid: false
    },
    deliverMethod: {
        elementType: 'select',
        elementConfig: {
            options:  [ 
                {value: 'fastest', displayValue: 'Fastest'}, 
                {value: 'cheapest', displayValue: 'Cheapest'}
            ]
        },
        validation: {},
        valid: true
    }
});