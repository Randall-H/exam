/**
 *
 *
 * @lv     => N/A
 * @props  => empty
 * @notes  => none
 **/


import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class SecondaryNavigation extends Component {

	constructor(props) {
		super(props);

		this.state = {
			currentPage: null
		};

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

	render () {

		return (
			<nav id="zola-footer_nav" className="zola-nav_list">
				<ul className="zola-nav_list_wrapper">
					<li>
						<NavLink
							key={"terms-of-use"}
							activeClassName='active'
							onClick={this.updateCurrentPage.bind(null, "terms-of-use")}
							className='zola-mast_nav_link'
							to={"/terms-of-use"}
						>
							terms of use (404 example)
						</NavLink>
					</li>
				</ul>
				<div className="clearfix" />
			</nav>
		)
	}
}