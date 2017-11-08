/**
 *
 *
 * @lv     => page_private
 * @props  => see below
 * @notes  => none
 **/


import React, { Component } 	from 'react';
import { CSSTransitionGroup } 	from 'react-transition-group';
import { Helpers } 				from 'react-scroll';
import { NavLink } 				from 'react-router-dom';
import Proptypes 				from 'prop-types';
/**/
import Loading         	   		from '../../ui/misc/Loading';
import Dropdown 				from '../../forms/util/DropdownSelect';
/**/
import { API } 					from '../../helpers/API';

/**
 * __propTypes__
 *
 * eventEmitter(obj)	=>
 * isLoggedIn(bool) 	=>
 * session(obj)  		=>
 * token(str)	 		=>
 **/
class AccountComp extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isLoading	 	 : true,
			categories 		 : [],
			activeCategories : [],
			currentFilter    : "featured",
			origData 		 : [],
			users	 	 	 : []
		};

		this._privacy = this._privacy.bind(this);
		this._sortBy  = this._sortBy.bind(this);

		this.handleFilterChange = this.handleFilterChange.bind(this);
		this.handleSortChange   = this.handleSortChange.bind(this);
	}

	componentDidMount() {

		//console.log('@class_AccountComp, @method_componentDidMount()____');

		if (!!this.props.token) {
			API.getUsers(this.props.token).then( (usersResponse) => {

				var USERS = usersResponse;
				console.log(':____API_getUsers_SUCCESS____:', USERS);

				this.setState(function () {

					var categories = [];

					USERS.data.map((user) => {
						categories.push(user.category);
					});

					// get rid of duplicate categories
					var tempData = new Set(categories);
					var userCategories = Array.from(tempData);
					// cache original data of users
					var ORIG = [].concat(USERS.data);

					return {
						isLoading : false,
						categories : userCategories,
						users     : USERS.data,
						origData  : ORIG
					}
				});
			}).catch( (e) => {
				console.log(':____API_getUsers_ERROR____:', e);

				Materialize.toast('Could not retrieve Users. Try refreshing page.', 2000);
			});
		} else {
			console.log('@class_AccountComp, @method_componentDidMount()____: NO_AUTH');
		}

	}


	componentWillMount() {
		console.log('@class_AccountComp, @method_componentWillMount()____');

		// redirect privacy, account page
		// check privacy when the component is about to mount
		this._privacy();

	}

	componentWillReceiveProps(nextProps){

		console.log('@class_AccountComp, @method_componentWillReceiveProps()____', this.props.session);

		if (nextProps.session.token !== this.props.session.token) {
			this._privacy();
		}
	}


	/**/

	_privacy() {

		if (this.props.isPrivate && !this.props.isLoggedIn) {
			console.log('::____AUTH_ACCOUNT_CHECK____::');

			this.props.history.push('/login');
		}
	}

	_sortBy(sortMethod) {

		var newData = [].concat(this.state.origData);

		switch(sortMethod) {

			case "featured":

				return this.state.origData;

				break;

			case "asc_by_name" :

				newData.sort( (firstUser, nextUser) => {
					if (firstUser.name < nextUser.name){
						return -1
					} else if (firstUser.name > nextUser.name) {
						return 1;
					} else {
						return 0;
					}
				});

				return newData;

				break;

			case "desc_by_name" :

				newData.sort( (firstUser, nextUser) => {
					if (firstUser.name < nextUser.name){
						return 1;
					} else if (firstUser.name > nextUser.name) {
						return -1;
					} else {
						return 0;
					}
				});

				return newData;

				break;

			case "priority" :

				newData.sort( (firstUser, nextUser) => {
					if (firstUser.priority < nextUser.priority){
						return -1;
					} else if (firstUser.priority > nextUser.priority) {
						return 1;
					} else {
						return 0;
					}
				});

				return newData;

				break;
		}

	}

	/**/

	handleFilterChange(event) {
		var value   = event.target.type === 'checkbox' ? event.target.checked : event.target.value,
			name    = event.target.name;

		console.log(':____handleFilterChange____:', {name, value});


		this.setState(function (prevState) {

			var catIndex = prevState.activeCategories.indexOf(name);


			if (catIndex >= 0) {
				prevState.activeCategories.splice(catIndex, 1);

				return {
					activeCategories : prevState.activeCategories
				};
			} else {
				prevState.activeCategories.push(name);

				return {
					activeCategories : prevState.activeCategories
				};
			}

		});

	}


	handleSortChange(event) {
		let value   = event.target.type === 'checkbox' ? event.target.checked : event.target.value,
			name    = event.target.name;

		console.log(':____handleSortChange____:', {name, value});

		var newUserArray = this._sortBy(value);

		this.setState(function() {

			return {
				currentFilter : value,
				users 		  : newUserArray
			}
		});

	}


	/**/

	render() {

		var activeFilters = this.state.activeCategories.length > 0;

		return (

			<CSSTransitionGroup
				transitionName="fade"
				transitionEnter={false}
				transitionLeave={false}
				transitionAppear={true}
				transitionAppearTimeout={300}
			>
				<div className="zola-page_content spotlight ui-account">
					<section className="zola-dashboard_container zola-spotlight_container zola-first_container"
					>
						<div className="zola-container_wrapper" >
							<article className="zola-article">
								<header className="zola-header">
									<h1 className="zola-header_text zola-initanimate fadeInDown">account details</h1>
								</header>
							</article>
						</div>
					</section>

					<section className="zola-dashboard_wrapper">
						<aside className="zola-dashboard_account_section filters_container">
							<h3>Filter by category</h3>
							<ul className="filters_listing">
								{
									this.state.categories.map( (cat, index)  => {

										return (
											<li key={index + "-checkbox_filter"} className="filter_container">
												{
													<input type="checkbox" id={cat + "-checkbox_input"} className="filled-in" checked={(this.state.activeCategories.indexOf(cat) >= 0)} name={cat} onChange={this.handleFilterChange} />
												}
												<label htmlFor={cat + "-checkbox_input"}>{cat}</label>
											</li>
										)

									})
								}
							</ul>
						</aside>
						<div className="zola-dashboard_account_section results_container">
							<div className="zola-dashboard_content">
								<header>
									<h2>My Users</h2>
								</header>
								<div className="zola-tool_bar">
									<ul className="zola-filter_box_wrapper">
										<li className="input_wrapper">
											<Dropdown
												selectName={"sortBy"}
												selectLabel={"sort users by:"}
												selectClass={""}
												defaultOption={"Featured"}
												defaultVal={this.state.currentFilter}
												updateDropdown={this.handleSortChange}
												optionsArr={[
													{value: "featured", name: "Featured"},
													{value: "asc_by_name", name: "A-Z sorted"},
													{value: "desc_by_name", name: "Z-A sorted"},
													{value: "priority", name: "Priority"}
												]}
												dropdownSize={"quarter_width"}
											/>
										</li>
									</ul>
								</div>
								{
									!this.state.isLoading ? <div className="zola-dashboard_data_table_container">
										<ul >
											{
												this.state.users.map( (user, index) => {

													var priorityClass = "purple_tile";
													switch (user.priority) {
														case 1:
															priorityClass = "orange_tile";
															break;
														case 2:
															priorityClass = "green_tile";
															break;
														case 3:
															priorityClass = "blue_tile";
															break;

													}
													// if there are filters that are active
													if (activeFilters) {
														// check and make sure that the tile showing are among those
														// active categories
														if (this.state.activeCategories.indexOf(user.category) >= 0) {
															return (
																<li key={index + "-" + user.name} className="zola-user_wrapper">
																	<article className={"zola-user_tile " + priorityClass}>
																		<header>
																			<h2>{user.name}</h2>
																			<span>{user.age}</span>
																		</header>
																		<footer>
																			<p>{user.category}</p>
																		</footer>
																	</article>
																</li>
															);
														}
														// otherwise, business as usual and display the tiles
													} else {
														return (
															<li key={index + "-" + user.name} className="zola-user_wrapper">
																<article className={"zola-user_tile " + priorityClass}>
																	<header>
																		<h2>{user.name}</h2>
																		<span>{user.age}</span>
																	</header>
																	<footer>
																		<p>{user.category}</p>
																	</footer>
																</article>
															</li>
														);
													}

												})
											}
											<li className="clearfix"/>
										</ul>
									</div> : <Loading />
								}
							</div>
						</div>
					</section>
				</div>
			</CSSTransitionGroup>
		)
	}
}

AccountComp.propTypes = {
	eventEmitter   : Proptypes.object.isRequired,
	isLoggedIn     : Proptypes.bool.isRequired,
	session   	   : Proptypes.object.isRequired,
	token 		   : Proptypes.string.isRequired,
};

export default Helpers.Element(AccountComp);
