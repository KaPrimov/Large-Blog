import React from 'react';
import {Route, IndexRoute} from 'react-router';
import requireAuth from '../components/common/security/authenticated-route.factory.jsx';
import LargeAppContainer from '../components/large-app.container.jsx';
import HomePageContainer from '../components/front/common/home/home-page.container.jsx';
import UserRegisterContainer from '../components/front/users/register/users-register.container.jsx';
import UserLoginContainer from '../components/front/users/login/users-login.container.jsx';
import ArticleLayoutComponent from '../components/common/module-layout/articles/article-layout.container.jsx';
import CreateNewsContainer from '../components/front/articles/news-management/management/create-news.container.jsx';
import ViewNewsContainer from '../components/front/articles/news-management/news-view-page/news-view-page.container.jsx';

export default (
	<Route path="/" component={LargeAppContainer}>

		{/* --------------------------------------- Home page Route  --------------------------------------- */}
		<IndexRoute component={HomePageContainer}/>

		{/* --------------------------------------- Users module Route  --------------------------------------- */}
		<Route path="/users/register" component={UserRegisterContainer}/>
		<Route path="/users/login" component={UserLoginContainer}/>

		<Route path="/articles" component={ArticleLayoutComponent}>
			<Route path="news/create" component={requireAuth(CreateNewsContainer, null, 'hasRole[moderator],hasRole[administrator]')}/>
			<Route path="news/:id" component={ViewNewsContainer}/>			
		</Route>
	</Route>
);
