/**
 *
 *
 * @lv     => core_app
 * @props  => see below
 * @notes  => none
 **/

import React, { Component } from 'react';
import { Helpers } from 'react-scroll';
import { NavLink } from 'react-router-dom';

import Proptypes from 'prop-types';


/**
 * __propTypes__
 *
 * isLoggedIn(bool) => authentication true or false
 **/
class MasterHeader extends Component {


	constructor(props) {
		super(props);

		this.state = {
			currentPage: 'home'
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


	render() {

		return (
			<header id="zola-mast_header" className="zola-mast_header" >
				<div className="zola-wrapper">
					<div className="zola-logo_wrapper">
						<NavLink
							className='zola-mast_nav_link zola-logo icon-logo'
							key={"/"}
							exact
							activeClassName='active'
							onClick={this.updateCurrentPage.bind(null, "home")}
							to={"/"}
						/>
					</div>
					{this.props.children}
					<button id="zola-mobile_nav_button" className="zola-mobile_nav_button zola-mast_nav_link icon-menu button-collapse" data-activates="zola-nav_mobile" />
					<div className="clearfix"></div>
				</div>
			</header>
		)
	}
}

MasterHeader.propTypes = {
	isLoggedIn : Proptypes.bool.isRequired
};

export default Helpers.Scroll(MasterHeader);