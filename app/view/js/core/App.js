/**
 *
 *
 * @lv     => 1_nucleus
 * @props  => see below
 * @notes  => ~ all things lead to lv_1_nucleus ~
 **/

import React, { Component } from 'react';
import { Switch }	  		from 'react-router-dom';
/**/
import { scrollSpy } 		from 'react-scroll';
import { EventEmitter } 	from 'events';
import Proptypes 			from 'prop-types';
/**/
import Header        		from '../ui/Header';
import Footer        		from '../ui/Footer';
import HeaderNav     		from '../ui/navigation/PrimaryNav';
import MobileNav     		from '../ui/navigation/MobileNav';
import FooterNav     		from '../ui/navigation/SecondaryNav';
/**/
import { API } 				from '../helpers/API';


/**
 * __propTypes__
 *
 * dataStorage(obj)			 => cached local storage data
 * children(obj)   			 => all routes from history router
 * updateDataStorage(method) => func to update localStorage
 **/
export default class Zola extends Component {

	/**
	 *
	 * __State__
	 * @isAuth(bool)   => is currentUser signed in
	 * @token(str)     => currentAuth token
	 * @session(obj)   => profile properties: uid, email, displayName
	 **/
	constructor(props) {
		super(props);

		console.log('@class_1: ____INITIAL DATA____', this.props.dataStorage);

		this.state = {
			isAuth   	   : this.props.dataStorage.isLoggedIn,
			token	 	   : this.props.dataStorage.token || "",
			session		   : this.props.dataStorage.profile || null
		};

		this._handleLoginEvent  = this._handleLoginEvent.bind(this);
		/**/
		this.handleLogoutUser   = this.handleLogoutUser.bind(this);
		this.handleLoginUser    = this.handleLoginUser.bind(this);

		// initialize global event emitter
		this.eventEmitter = new EventEmitter();
	}

	componentWillMount() {
		console.log('@class_Zola, @method_componentWillMount()____');

		/**
		 *
		 * @use_cases => Listen for login requests from Login page
		 **/
		this.eventEmitter.addListener('LOGIN', this._handleLoginEvent);

	}

	componentDidMount() {
		console.log('@class_Zola, @method_componentDidMount()____');

		let header = document.getElementById('zola-mast_header');

		// set listener on header for it to change CSS class on scroll
		scrollSpy.addSpyHandler((scrollPosition) => {
			if (scrollPosition > 50 && header.className.indexOf('header-active') < 0) {
				this._handleHeaderActivate();
			} else if (scrollPosition < 50) {
				this._handleHeaderDeactivate();
			}
		}, scrollSpy.scrollSpyContainers[0]);
	}

	componentWillUnmount() {
		console.log('@class_Zola, @method_componentWillUnmount()____');

		/**
		 *
		 * @use_cases => Listen for login requests from Login page
		 **/
		this.eventEmitter.removeListener('LOGIN', this._handleLoginEvent);
	}


	/* Private functions (only in this component) */

	_handleLoginEvent ({type, data}) {
		console.log('@class_Zola, @method__handleLoginEvent()____eventEmitter_NAVIGATE_CALLBACK({type, data})____', {type, data});

		if (type === "login") {
			API.loginUser(data).then( (response) => {

				console.log('@class_Zola, @method_componentWillMount(), API_CALLBACK:', response);

				Materialize.toast('Login Successful.', 3000);

				this.handleLoginUser(response);

				this.eventEmitter.emit('REDIRECT_LOGIN', {request : '/zola-user/account-settings'});

			}).catch( (e) => {
				console.log('@class_Zola, @method_componentWillMount(), API_CALLBACK_ERROR:', e);

				Materialize.toast('Failed Login Attempt.', 3000);

				this.eventEmitter.emit('REDIRECT_LOGIN', {request : '/login', error: e.error});
			});
		}
	}

	/**
	 *
	 * @class_init    => this_componentDidMount()
	 * @params		  => none
	 **/
	_handleHeaderActivate() {
		let header = document.getElementById('zola-mast_header');
		header.className += " header-active";
	}

	/**
	 *
	 * @class_init    => this_componentDidMount()
	 * @params		  => none
	 **/
	_handleHeaderDeactivate() {
		let header = document.getElementById('zola-mast_header');
		header.className = header.className.replace(' header-active', '');
	}

	/* Public functions (for children components) */

	handleLoginUser(dataObj) {

		console.log('@class_Zola, @method_handleLoginUser()____');

		this.props.updateDataStorage({
			isLoggedIn : true,
			token 		: dataObj.token,
			profile 	: {
				uid 		: dataObj.uid,
				displayName : "Zola Admin",
				email 		: dataObj.email
			}
		});

		this.setState(function () {
			return {
				isAuth : true,
				token : dataObj.token,
				session : {
					uid 		: dataObj.uid,
					displayName : "Zola Admin",
					email 		: dataObj.email
				}
			}
		});
	}

	/**
	 *
	 * @class_init	 	=> MobileNav, HeaderNav
	 * @params	 		=> none
	 **/
	handleLogoutUser() {
		console.log('@class_Zola, @method_handleLogoutUser()____');

		this.props.updateDataStorage({
			isLoggedIn : false,
			token 		: "",
			profile 	: {
				uid 		: "",
				displayName : "Zola Anonymous",
				email 		: "guest@gmail.com"
			}
		});

		this.setState(function () {
			return {
				isAuth : false,
				token : "",
				session : {
					uid 		: "",
					displayName : "Zola Anonymous",
					email 		: "guest@gmail.com"
				}
			}
		});
		Materialize.toast('Logout Successful.', 3000);
	}


	/**/


	render () {


		console.log('@class_Zola, @method_render()____');

		return (
			<section id="zola-mast_wrapper" className="zola-mast_wrapper" >
				<div className="zola-mast_container" >
					<MobileNav
						session={this.state.session}
						logoutUser={this.handleLogoutUser}
						eventEmitter={this.eventEmitter}
						isLoggedIn={this.state.isAuth} />
					<Header
						isLoggedIn={this.state.isAuth}
						to={"body"}
					>
						<HeaderNav
							session={this.state.session}
							logoutUser={this.handleLogoutUser}
							eventEmitter={this.eventEmitter}
							isLoggedIn={this.state.isAuth} />
					</Header>
					<Switch>
						{
							React.Children.map(this.props.children,
								(child) => React.cloneElement(child, {
									eventEmitter : this.eventEmitter,
									isLoggedIn   : this.state.isAuth,
									session 	 : this.state.session,
									token        : this.state.token
								})
							)
						}
					</Switch>
					<Footer
						classObj="">
						<FooterNav />
					</Footer>
				</div>
			</section>
		)
	}
}

Zola.propTypes = {
	dataStorage : Proptypes.object.isRequired,
	updateDataStorage : Proptypes.func.isRequired
};