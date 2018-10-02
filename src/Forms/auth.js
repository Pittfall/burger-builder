export const FIELDS = Object.freeze({
   email: {
       elementType: 'input',
       elementConfig: {
           type: 'email',
           placeholder: 'Email Address'
       },
       value: '',
       validation: {
           required: true,
           isEmail: true
       },
       valid: false,
       touched: false
   },
   password: {
      elementType: 'input',
      elementConfig: {
          type: 'password',
          placeholder: 'Password'
      },
      value: '',
      validation: {
          required: true,
          minLength: 6
      },
      valid: false,
      touched: false
  }
});