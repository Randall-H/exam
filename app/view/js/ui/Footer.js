/**
 *
 *
 * @lv     => core_app
 * @props  => see below
 * @notes  => none
 **/

import React, { Component } from 'react';
import { Helpers }  from 'react-scroll';

import Proptypes from 'prop-types';

/**
 * __propTypes__
 *
 * classObj(str) 		  => html class
 **/
class MasterFooter extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<footer id="zola-mast_footer" className="zola-mast_footer">
				<div className="zola-film-dark">
					<div className="zola-wrapper">
						<div className="zola-logo_wrapper">
							<div className='zola-logo icon-logo'></div>
						</div>
						<div className="zola-mast_subfooter">
							<div className="wrapper">
								<sub>&copy; 2017</sub>
								{this.props.children}
							</div>
						</div>
						<div className="clearfix"></div>
					</div>
				</div>
			</footer>
		)
	}
}

MasterFooter.propTypes = {
	classObj  	   : Proptypes.string.isRequired,
};

export default Helpers.Element(MasterFooter);