/**
 *
 *
 * @lv     => N/A
 * @props  => see below
 * @notes  => none
 **/

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Proptypes 	  from 'prop-types';
/**/


/**
 * __propTypes__
 *
 * session(obj)		  	=>
 * logoutUser(method) 	=>
 * eventEmitter(method) =>
 * isLoggedIn(bool)   	=>
 **/
export default class MasterNavigation extends Component {

	constructor(props) {
		super(props);

		this.state = {
			currentPage: null
		};

		this.updateCurrentPage = this.updateCurrentPage.bind(this);
	}

	updateCurrentPage(page) {

		this.setState(function() {
			return {
				currentPage: page
			}
		});
	}

	componentDidMount(){
		jQuery('#zola-mobile_nav_button').sideNav({
			closeOnClick: true,
			onOpen: function(el) {

				let app = document.getElementById('zola');
				app.className += " mobile_open";
			},
			onClose: function(el) {

				let app = document.getElementById('zola');
				app.className = app.className.replace(" mobile_open", "");
			}
		});

	}

	render () {

		return (
			<nav id="zola-nav" className="zola-nav_list">
				<ul className="zola-nav_list_wrapper">
					<li>
						<NavLink
							key={"about"}
							activeClassName='active'
							onClick={this.updateCurrentPage.bind(null, "about")}
							className='zola-mast_nav_link'
							to={"/about"}
						>
							about us
						</NavLink>
					</li>
					{
						this.props.isLoggedIn && <li>
							<NavLink
								key={"zola-user/account-settings"}
								exact
								activeClassName='active'
								onClick={this.updateCurrentPage.bind(null, "zola-user/account-settings")}
								className='zola-mast_nav_link dashboard-link'
								to={"/zola-user/account-settings"}
							>
								dashboard
							</NavLink>
						</li>
					}
					{
						this.props.isLoggedIn ? <li className="last_item">
							<NavLink className="zola-mast_nav_link zola-logout_link"
									 to={"/login"}
									 key={"logout"}
									 onClick={this.props.logoutUser}>logout</NavLink>
						</li> : <li className="last_item">
							<NavLink
								to={"/login"}
								key={"login"}
								activeClassName='active'
								onClick={this.updateCurrentPage.bind(null, 'login')}
								className='zola-mast_nav_link'
							>
								login
							</NavLink>
						</li>
					}
				</ul>
			</nav>
		)
	}
}

MasterNavigation.propTypes = {
	session		  	: Proptypes.object.isRequired,
	logoutUser 		: Proptypes.func.isRequired,
	eventEmitter 	: Proptypes.object.isRequired,
	isLoggedIn 		: Proptypes.bool.isRequired
};