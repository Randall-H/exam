/**
 *
 *
 * @lv     => page
 * @props  => see below (standard @lv_page)
 * @notes  => none
 **/


import React, { Component } 	from 'react';
import { CSSTransitionGroup } 	from 'react-transition-group';
import { Helpers } 				from 'react-scroll';
import Proptypes 				from 'prop-types';
/**/


/**
 * __propTypes__
 *
 * eventEmitter =>
 * isLoggedIn 	=>
 * session  	=>
 * token 		=>
 **/
class AboutComp extends Component {

	constructor(props){
		super(props);
	}

	componentDidMount() {
		//console.log('@class_AboutComp, @method_componentDidMount()____');
	}

	componentWillMount() {
		//console.log('@class_AboutComp, @method_componentWillMount()____');
	}

	/**/

	render() {

		console.log('@class_AboutComp, @method_render()____');
		var pageHeight = window.innerHeight;

		return (
			<CSSTransitionGroup
				transitionName="fade"
				transitionEnter={false}
				transitionLeave={false}
				transitionAppear={true}
				transitionAppearTimeout={300}
			>
				<div className="zola-page_content ui-about" style={{'minHeight':pageHeight + 'px'}}>
					<section className="zola-about_container first_container"
					>
						<div className="zola-content_wrapper" >
							<article className="zola-article">
								<header className="zola-header">
									<h1 className="zola-header_text zola-initanimate fadeInDown">who we are.</h1>
								</header>
								<footer>
									<p>Lorem ispum example of cms page or something ipsum.</p>
								</footer>
							</article>
						</div>
					</section>
				</div>
			</CSSTransitionGroup>
		)
	}
}

AboutComp.propTypes = {
	eventEmitter   : Proptypes.object.isRequired,
	isLoggedIn     : Proptypes.bool.isRequired,
	session   	   : Proptypes.object.isRequired,
	token 		   : Proptypes.string.isRequired,
};

export default Helpers.Element(AboutComp);