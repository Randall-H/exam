/**
 *
 *
 * @lv     => page
 * @props  => see below
 * @notes  => none
 **/


import React, { Component } from 'react';
import { Helpers }  from 'react-scroll';
import { CSSTransitionGroup } from 'react-transition-group';
/**/
import Proptypes 	from 'prop-types';
/**/
import LoginForm from '../forms/UserLogin';
import Loading   from '../ui/misc/Loading';


/**
 * __propTypes__
 *
 * eventEmitter =>
 * isLoggedIn 	=>
 * session  	=>
 * token 		=>
 **/
class LoginComp extends Component {


	constructor(props) {
		super(props);

		this.state = {
			isLoading : false
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		//console.log('@class_LoginComp, @method_componentWillMount()____');

	}

	componentDidMount() {
		console.log('@class_LoginComp, @method_componentDidMount()____');

		this.props.eventEmitter.addListener('REDIRECT_LOGIN', ({request, error}) => {

			this.setState(function () {
				return {
					isLoading: false
				}
			});

			if (!!error) {
				Materialize.toast(error, '2000');
			} else {
				this.props.history.push(request);
			}

		});
	}

	componentWillUnmount() {
		//console.log('@class_LoginComp, @method_componentWillUnmount()____');

		this.props.eventEmitter.removeListener('REDIRECT_Login', ({request, error}) => {

			if (!!error) {
				Materialize.toast(error, '2000');
			}

			this.setState(function () {
				return {
					isLoading: false
				}
			});

			this.props.history.push(request);
		});
	}

	/* Public functions */

	handleSubmit(data) {
		//console.log('@class_LoginComp, @method_handleSubmit(data)____', data);

		let type = data.type;

		this.setState(function() {
			return {
				isLoading : true
			}
		});

		this.props.eventEmitter.emit('LOGIN', {type, data});
	}

	/**/

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
				<div className="zola-page_content spotlight ui-login"
					 style={{'minHeight':pageHeight + 'px'}}>
					<section className="zola-login_container"
					>
						<div className="zola-container_wrapper" >
							<article className="zola-article">
								<header className="zola-header">
									<span className="zola-initanimate fadeInDown icon-logo" />
								</header>
							</article>
						</div>
					</section>
					{
						!this.state.isLoading ? <LoginForm
							formId="user-login"
							classObj="zola-main_login_form"
							eventEmitter={this.props.eventEmitter}
							loginRequest={this.handleSubmit}
						/> : <article className="form_loading">
							<div className="loading_wrapper">
								<Loading />
							</div>
						</article>
					}
				</div>
			</CSSTransitionGroup>
		)
	}
}

LoginComp.propTypes = {
	eventEmitter   : Proptypes.object.isRequired,
	isLoggedIn     : Proptypes.bool.isRequired,
	session   	   : Proptypes.object.isRequired,
	token 		   : Proptypes.string.isRequired,
};

export default Helpers.Element(LoginComp);