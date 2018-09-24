export const FIELDS = Object.freeze({
    name: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your Name'
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
    },
    street: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Street'
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
    },
    postal: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Postal Code'
        },
        value: '',
        validation: {
            required: true,
            minLength: 6,
            maxLength: 6
        },
        valid: false,
        touched: false
    },
    country: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Country'
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
    },
    email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'Email'
        },
        value: '',
        validation: {
            required: true,
            isEmail: true
        },
        valid: false,
        touched: false
    },
    deliverMethod: {
        elementType: 'select',
        elementConfig: {
            options: [
                { value: 'fastest', displayValue: 'Fastest' },
                { value: 'cheapest', displayValue: 'Cheapest' }
            ]
        },
        value: 'fastest',
        validation: {},
        valid: true
    }
});