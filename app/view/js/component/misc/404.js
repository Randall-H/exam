/**
 *
 *
 * @lv     => N/A
 * @props  => standard composition props
 * @notes  => none
 **/


import React, { Component } 	from 'react';
import { CSSTransitionGroup } 	from 'react-transition-group';
import { Helpers } 				from 'react-scroll';
import { NavLink } 				from 'react-router-dom';
import Proptypes 				from 'prop-types';


class NoRouteComp extends Component {

	constructor(props) {
		super(props);

	}

	componentDidMount() {
		//console.log('@class_NoRouteComp, @method_componentDidMount()____');
	}

	componentWillMount() {
		//console.log('@class_NoRouteComp, @method_componentWillMount()____');
	}

	componentWillUnmount() {
		//console.log('@class_NoRouteComp, @method_componentWillUnmount()____');
	}


	render() {

		var pageHeight = window.innerHeight;

		return (
			<CSSTransitionGroup
				transitionName="fade"
				transitionEnter={false}
				transitionLeave={false}
				transitionAppear={true}
				transitionAppearTimeout={300}
			>
				<div className="zola-page_content spotlight ui-404" >
					<section className="zola-404_container first_container"
							 style={{'minHeight':pageHeight + 'px'}} >
						<header className="zola-cms_header">
							<h1>4<span className="icon-404" />4</h1>
						</header>
						<article>
							<header className="header-404">
								<h2>This page does not not exist...or does it...</h2>
								<p>Probably not though. Here are some links below to get back.</p>
							</header>
							<ul>
								<li><NavLink to={{ pathname: "/" }} >home</NavLink></li>
								<li><NavLink to={{ pathname: "/about" }} >who we are</NavLink></li>
							</ul>
						</article>
					</section>
				</div>
			</CSSTransitionGroup>
		)
	}
}

NoRouteComp.propTypes = {
	eventEmitter   : Proptypes.object.isRequired,
	isLoggedIn     : Proptypes.bool.isRequired,
	session   	   : Proptypes.object.isRequired,
	token 		   : Proptypes.string.isRequired,
};

export default Helpers.Element(NoRouteComp);