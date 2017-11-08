/**
 *
 *
 * @lv     => 0_init
 * @props  => N/A, App is Master
 * @notes  => entry point for the server
 **/

import '../css/core.scss';

import React    		from 'react';
import ReactDom 		from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
/**/
import App      		from './core/App';
import APP_SESSION 		from './core/AppData';
/**/
import Home          	from './component/Home';
import Login        	from './component/Login';
import About        	from './component/About';
import NoRoute 	 		from './component/misc/404';
import MyAccount    	from './component/dashboard/Account';
/**/

console.log('@class_0: ____INIT_MASTER____', APP_SESSION);

const renderMergedProps = (component, ...rest) => {
	const finalProps = Object.assign({}, ...rest);
	return (
		React.createElement(component, finalProps)
	);
};

const PropsRoute = ({ component, ...rest }) => {
	return (
		<Route {...rest} render={routeProps => {
			return renderMergedProps(component, routeProps, rest);
		}}/>
	);
};

ReactDom.render(
	<BrowserRouter>
		<App dataStorage={APP_SESSION.data} updateDataStorage={APP_SESSION.updateData} >
			<PropsRoute exact path={"/"} component={Home} />
			<PropsRoute path={"/about"} component={About} />

			<PropsRoute path={"/login"} component={Login} />

			<PropsRoute isPrivate={true} path={"/zola-user/account-settings"} component={MyAccount} />

			<PropsRoute
				path=""
				component={NoRoute} />
		</App>
	</BrowserRouter>,
	document.getElementById('zola-master')
);