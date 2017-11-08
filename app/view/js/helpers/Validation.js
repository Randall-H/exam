/**
 *
 *
 * @lv     => N/A
 * @params => N/A
 * @notes  => validation parser for form fields
 **/


export default class InputValidation {

	constructor() {

		this.validate = this.validate.bind(this);
	}

	_handleEmail(email) {
		//console.log('@class_InputValidation, @method__handleEmail(email)____', email);

		/**
		 *
		 * @pattern => should have '@', '.', and at least 2 or more alphanumerics, references @
		 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
		 **/
		let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return {
			valid : pattern.test(email),
			advice : "Not a valid email. You may be missing an '@' character or '.com'."
		};
	}

	_handlePass(password) {
		//console.log('@class_InputValidation, @method__handlePass(password)____', password);

		/**
		 *
		 * @pattern => should contain at least one non-alphanumeric, references @ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
		 * total of 10 character check
		 **/
		let pattern = /(?=.*[^0-9a-zA-Z])/;

		if (password.length < 10) {
			return {
				valid : false,
				advice : "Not a valid password. It must be at least 10 characters long."
			};
		} else {
			return {
				valid : pattern.test(password),
				advice : "Not a valid password. It must be at contain at least 1 non-alphanumeric character."
			};
		}


	}


	validate({validationType, input}) {

		// __debugging_log__
		// console.log('@class_InputValidation, @method_validate({validationType, input})____', {
		// 	name : input.name,
		// 	valType : validationType,
		// 	input
		// });

		switch (validationType) {
			case 'email':

				return this._handleEmail(input.value);
			break;

			case 'password':

				return this._handlePass(input.value);
			break;
		}

	}


}