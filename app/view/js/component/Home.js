/**
 *
 *
 * @lv     => page
 * @props  => see below
 * @notes  => none
 **/

import React, { Component } 	from 'react';
import { CSSTransitionGroup } 	from 'react-transition-group';
import { Helpers } 				from 'react-scroll';
import { NavLink } 				from 'react-router-dom';
import Proptypes 				from 'prop-types';


/**
 * __propTypes__
 *
 * eventEmitter =>
 * isLoggedIn 	=>
 * session  	=>
 * token 		=>
 **/
class HomeComp extends Component {

	constructor(props) {
		super(props);

	}

	componentDidMount() {
		//console.log('@class_HomeComp, @method_componentDidMount()____');
	}

	componentWillMount() {
		//console.log('@class_HomeComp, @method_componentWillMount()____');
	}

	componentWillUnmount() {
		//console.log('@class_HomeComp, @method_componentWillUnmount()____');
	}

	/**/

	render() {

		console.log('@class_HomeComp, @method_render()____');
		var pageHeight = window.innerHeight;

		return (
			<CSSTransitionGroup
				transitionName="fade"
				transitionEnter={false}
				transitionLeave={false}
				transitionAppear={true}
				transitionAppearTimeout={300}
			>
				<div className="zola-page_content ui-home" style={{'minHeight':pageHeight + 'px'}}>
					<section className="zola-home_container first_container"
					>
						<div className="zola-container_wrapper center_screen">
							<article className="zola-article center-cell">

								<header className="zola-header">
									<h1 className="zola-header_text zola-initanimate fadeInDown">Zola Listing Demo</h1>
									<p className="zola-footer_text">login today</p>
								</header>

								<footer className="zola-footer">
									<div className="button_container">
										<div className="button_wrap">
											{
												!this.props.isLoggedIn ? <NavLink
													key={"/login"}
													exact
													activeClassName='active'
													className='zola-mast_nav_link zola-standard_button'
													to={"/login"}
												>
													Login
												</NavLink> : <NavLink
													key={"/login"}
													exact
													activeClassName='active'
													className='zola-mast_nav_link zola-standard_button'
													to={"/zola-user/account-settings"}
												>
													Dashboard
												</NavLink>
											}
										</div>
									</div>
								</footer>
							</article>
						</div>
					</section>
				</div>
			</CSSTransitionGroup>
		)
	}
}

HomeComp.propTypes = {
	eventEmitter   : Proptypes.object.isRequired,
	isLoggedIn     : Proptypes.bool.isRequired,
	session   	   : Proptypes.object.isRequired,
	token 		   : Proptypes.string.isRequired
};

export default Helpers.Element(HomeComp);