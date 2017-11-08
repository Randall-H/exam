/**
 *
 *
 * @lv     => 2
 * @props  => empty
 * @notes  => none
 **/


import React, { Component } from 'react';
import Proptypes     		from 'prop-types';
/**/
import Validation from '../helpers/Validation';
/**/
const Validate = new Validation();


/**
 *
 * formId(str)  		=>
 * classObj(str)  		=>
 * eventEmitter(obj) 	=>
 * loginRequest(method) =>
 **/
export default class UserLogin extends Component {

	/**
	 *
	 * __State__
	 * @useremail(str) 		 => email address
	 * @userpass(str)	   	 => password
	 * @userpassconfirm(str) => copy of password
	 * @requestType(str)     => form submission type
	 * @mode(str)   		 => tab view type
	 **/
	constructor(props) {
		super(props);

		this.state = {
			useremail		: '',
			userpass 		: '',
			requestType     : 'login'
		};

		this._handleValidationUpdate = this._handleValidationUpdate.bind(this);

		this.handleChange 	= this.handleChange.bind(this);
		this.handleSubmit 	= this.handleSubmit.bind(this);
	}


	componentWillMount() {
		//console.log('@class_UserLogin, @method_componentWillMount()____');

	}

	componentDidMount() {
		//console.log('@class_UserLogin, @method_componentDidMount()____');


		let inputs = [...document.querySelectorAll('.zola-form_input')];
		inputs.forEach((input) => {
			//input.removeEventListener('focus', this.handleFocus, false);
			input.addEventListener('blur', this.handleFocus, false);
		});
	}


	componentWillUnmount() {

		//console.log('@class_UserLogin, @method_componentWillUnmount()____');


		let inputs = [...document.querySelectorAll('.zola-form_input')];
		inputs.forEach((input) => {
			//input.removeEventListener('focus', this.handleFocus, false);
			input.removeEventListener('blur', this.handleFocus, false);
		});
	}

	_handleValidationUpdate(errorObj) {

		Materialize.toast(errorObj.message, '2000');
	}

	/**/

	handleChange(event) {

		let value   = event.target.value,
			name    = event.target.name,
			update  = {};

		this.setState(function (){

			update[name] = value;
			return update;
		});
	}

	handleSubmit(ev) {
		ev.preventDefault();

		let emailTrigger = Validate.validate({
			validationType : 'email',
			input          : {
				value    : this.state.useremail,
				name     : 'useremail'
			}
		});

		console.log(":____VALIDATION____: email", emailTrigger);

		if (!emailTrigger.valid) {
			var emailErr = {
				inputName : 'email',
				message   : emailTrigger.advice
			};

			this._handleValidationUpdate(emailErr);
		} else {

			let passTrigger = Validate.validate({
				validationType : 'password',
				input          : {
					value    : this.state.userpass,
					name     : 'userpass'
				}
			});

			console.log(":____VALIDATION____: password", passTrigger);

			if (!passTrigger.valid) {
				var passErr = {
					inputName : 'password',
					message   : passTrigger.advice
				};

				this._handleValidationUpdate(passErr);
			} else {

				this.setState(function() {
					return {
						userpass 	: '',
						userpassconfirm : ''
					}
				});

				var data = {
					email     : this.state.useremail,
					password  : this.state.userpass,
					type 	  : this.state.requestType
				};

				this.props.loginRequest(data);
			}

		}


	}

	/**/

	render () {

		var formId = 'zola-form_id-' + this.props.formId;

		return (
			<div className="zola-form_wrapper ui-login_wrapper">
				<form id={formId} className={this.props.classObj + " zola-form"}>
					<div className="zola-form_row">
						<input
							name="useremail"
							id="useremail"
							className={"zola-form_input first_field"}
							type="email"
							value={this.state.useremail}
							autoComplete="off"
							onChange={this.handleChange}
						/>
						<label className={this.state.useremail ? "zola-form_label active" : "zola-form_label"} htmlFor='useremail'>
							email
						</label>
					</div>
					<div className={"zola-form_row final_row"}>
						<input
							name="userpass"
							id="userpass"
							className={"zola-form_input final_field"}
							type="password"
							value={this.state.userpass}
							autoComplete="off"
							onChange={this.handleChange}
						/>
						<label className={this.state.userpass ? "zola-form_label active" : "zola-form_label"} htmlFor='userpass'>
							password
						</label>
					</div>
					<div className="zola-form_button_wrapper">
						<button type="submit"
								name="login"
								onClick={this.handleSubmit}
								className="zola-form_button zola-standard_button"
								disabled={!this.state.userpass || !this.state.useremail}>
							login
						</button>
					</div>
				</form>
			</div>
		)
	}
}

UserLogin.propTypes = {
	formId    		: Proptypes.string.isRequired,
	classObj  		: Proptypes.string.isRequired,
	eventEmitter 	: Proptypes.object.isRequired,
	loginRequest 	: Proptypes.func.isRequired
};
