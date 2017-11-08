/**
 *
 *
 * @lv     => N/A
 * @props  => empty
 * @notes  => none
 **/

import React, { Component } from 'react';

export default class LoadingResults extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount(){

	}

	componentWillMount(){

	}

	render() {
		return (
			<div className="preloader-wrapper active">
				<div className="spinner-layer spinner-zola-only">
					<div className="circle-clipper left">
						<div className="circle"></div>
					</div><div className="gap-patch">
					<div className="circle"></div>
				</div><div className="circle-clipper right">
					<div className="circle"></div>
				</div>
				</div>
			</div>
		)
	}
}