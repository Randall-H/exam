/**
 *
 *
 * @lv     => N/A
 * @props  => reference below
 * @notes  => utilized for all forms' select field dropdowns
 **/

import React, { Component } from 'react';
import Proptypes from 'prop-types';


/**
 * __propTypes__
 *
 * selectName   => name of input for form
 * defaultVal   => placeholder text
 * defaultOption => first option placeholder text
 * optionsArr   => json object of key:value (name : value) pairs
 * dropdownSize => full_width, half_width, quarter_width, third_width, etc
 * */
export default class DropdownSelect extends Component {


	constructor(props) {
		super(props);


		this._generateListeners = this._generateListeners.bind(this);
		this._removeListeners   = this._removeListeners.bind(this);
	}

	componentDidMount() {

		let dropdown = jQuery("#select-" + this.props.selectName);

		dropdown.material_select();

		this._generateListeners();
	}


	componentWillUnmount() {

		this._removeListeners();
		jQuery("#select-" + this.props.selectName).material_select('destroy');
	}

	_removeListeners(){

		var selectInput = document.getElementById("select-" + this.props.selectName);
		let select = selectInput.previousSibling;

		console.log('_removeListeners()___', select);

		[...select.childNodes].map((liOption) => {
			liOption.removeEventListener("click", function() {

				let selectedOption = selectInput.options[selectInput.options.selectedIndex];
				let value = selectedOption.value;

				if (!!value && value.length > 0) {
					this.props.updateDropdown({
						target : {
							name  : this.props.selectName,
							value : value
						}
					});
				}


			}.bind(this));
		});
	}

	_generateListeners() {

		var selectInput = document.getElementById("select-" + this.props.selectName);
		let select = selectInput.previousSibling;

		console.log('_generateListeners()___', select);

		[...select.childNodes].map((liOption) => {
			liOption.addEventListener("click", function() {

				let selectedOption = selectInput.options[selectInput.options.selectedIndex];
				let value = selectedOption.value;


				if (!!value && value.length > 0) {
					this.props.updateDropdown({
						target : {
							name  : this.props.selectName,
							value : value
						}
					});
				}

			}.bind(this));
		});
	}

	/**/

	render() {

		return (
			<div className={"field_wrapper input-field " + this.props.dropdownSize} >
				<select id={"select-" + this.props.selectName} name={this.props.selectName} className={"zola-form_select " + this.props.selectClass} defaultValue={this.props.defaultVal} >
					{
						this.props.optionsArr.map((option, index) => (
							<option key={"opt-" + index + "-" + option.value} value={option.value} className="left">{option.name}</option>
						))
					}
				</select>
				<label className="zola-form_label active" htmlFor={this.props.selectName} >{this.props.selectLabel}</label>
			</div>
		)


	}
}

DropdownSelect.propTypes = {
	selectName    : Proptypes.string.isRequired,
	selectLabel   : Proptypes.string.isRequired,
	defaultOption : Proptypes.string.isRequired,
	defaultVal    : Proptypes.string.isRequired,
	optionsArr    : Proptypes.array.isRequired,
	dropdownSize  : Proptypes.string.isRequired,
	updateDropdown : Proptypes.func.isRequired
};