import React from 'react';
import {Route, IndexRoute} from 'react-router';
import LargeAppContainer from '../components/large-app.container.jsx';
import HomePageContainer from '../components/front/common/home/home-page.container.jsx';
import UserRegisterContainer from '../components/front/users/register/users-register.container.jsx';
import UserLoginContainer from '../components/front/users/login/users-login.container.jsx';
export default (
	<Route path="/" component={LargeAppContainer}>

		{/* --------------------------------------- Home page Route  --------------------------------------- */}
		<IndexRoute component={HomePageContainer}/>

		{/* --------------------------------------- Users module Route  --------------------------------------- */}
		<Route path="/users/register" component={UserRegisterContainer}/>
		<Route path="/users/login" component={UserLoginContainer}/>
	</Route>
);
