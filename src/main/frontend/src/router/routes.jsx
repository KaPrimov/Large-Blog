import React from 'react';
import {Route, IndexRoute} from 'react-router';
import LargeAppContainer from '../components/large-app.container.jsx';
import WelcomePageContainer from '../components/front/common/welcome/welcome-page.container.jsx';

export default (
	<Route path="/" component={LargeAppContainer}>

		{/* --------------------------------------- Welcome page Route  --------------------------------------- */}
		<IndexRoute component={WelcomePageContainer}/>

	</Route>
);
