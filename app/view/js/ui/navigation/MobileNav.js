/**
 *
 *
 * @lv     => N/A
 * @props  => see below
 * @notes  => none
 **/

import React, { Component } from 'react';
import { NavLink } 			from 'react-router-dom';
import Proptypes     		from 'prop-types';


/**
 * __propTypes__
 *
 * session(obj)		  	=>
 * logoutUser(method) 	=>
 * eventEmitter(method) =>
 * isLoggedIn(bool)   	=>
 **/
export default class MasterMobileNavigation extends Component {

	constructor(props) {
		super(props);

		this.state = {
			currentPage: null
		};

		this.updateCurrentPage = this.updateCurrentPage.bind(this);
		this.updateCurrentPage = this.updateCurrentPage.bind(this);
	}

	componentDidMount() {

	}

	componentWillMount() {

	}

	updateCurrentPage(page) {
		this.setState(function() {
			return {
				currentPage: page
			}
		});
	}

	/**/

	render () {

		var USER = this.props.session;

		if (!!USER) {
			// get database photos from auth user uid
			var userName  = !!USER.displayName ? USER.displayName : 'Anonymous';
			var userEmail = !!USER.email ? USER.email : 'guest@gmail.com';
		}

		return (
			<nav id="zola-nav_mobile" className="zola-nav_list zola-nav_list_mobile side-nav">
				<ul className="zola-nav_list_wrapper zola-nav_list_wrapper_mobile">
					<li className="mobile-nav-header">
						<header className="userView nav-header_section">
							<footer className="nav-header_footer">
								<a href="#" className="first-child">
									<span className="nav-welcome_name_copy">{userName}</span>
								</a>
								<a href="#" className="last-child">
									<span className="nav-welcome_email_copy">{userEmail}</span>
								</a>
							</footer>
						</header>
					</li>
					<li className="nav-standard_link first-child">
						<NavLink
							key={"/"}
							exact
							activeClassName='active'
							onClick={this.updateCurrentPage.bind(null, "home")}
							className='zola-mast_nav_link'
							to={"/"}
						>
							home
						</NavLink>
					</li>
					<li className="nav-standard_link">
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
						this.props.isLoggedIn && <li className="nav-standard_link">
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

MasterMobileNavigation.propTypes = {
	session		  	: Proptypes.object.isRequired,
	logoutUser 		: Proptypes.func.isRequired,
	eventEmitter 	: Proptypes.object.isRequired,
	isLoggedIn 		: Proptypes.bool.isRequired
};
