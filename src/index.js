import React from 'react';
import { render } from 'react-dom';
import store from './stores/store';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';


import Today from './pages/toDo/ToDo';
import Inbox from './pages/inboxTasks/InboxTasks';
import Postponed from './pages/postponedTasks/PostponedTasks';
import Done from './pages/doneTasks/DoneTasks';
import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/signUp/SignUp';
import Confirm from './pages/confirm/Confirm';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import RecoverPassword from './pages/recoverPassword/RecoverPassword';
import ErrorPage from './pages/errorPage/ErrorPage';
import QuadrantPage from './pages/toDo/QuadrantPage';
import {
  URGENT_AND_IMPORTANT_URL,
  URGENT_AND_NOT_IMPORTANT_URL,
  NOT_URGENT_AND_IMPORTANT_URL,
  NOT_URGENT_AND_NOT_IMPORTANT_URL
} from './utils/urlTypes'

import './index.css';
import './vendor/normalize.css';

const history = createBrowserHistory();

render(
  <Provider store={store}>
  	<Router history={history}>
        <Switch>
          <Route exact path='/' component={Today} />
          <Route exact path='/inbox' component={Inbox} />
          <Route exact path='/postponed' component={Postponed} />
          <Route exact path='/done' component={Done} />

          <Route exact
                 path={URGENT_AND_IMPORTANT_URL}
                 component={(props) => <QuadrantPage {...props} type={{urgent: true, important: true}}/>}/>
          <Route exact
                 path={NOT_URGENT_AND_IMPORTANT_URL}
                 component={(props) => <QuadrantPage {...props} type={{important: true, urgent: false}}/>}/>
          <Route exact
                 path={URGENT_AND_NOT_IMPORTANT_URL}
                 component={(props) => <QuadrantPage {...props} type={{important: false, urgent: true}}/>}/>

          <Route exact
                 path={NOT_URGENT_AND_NOT_IMPORTANT_URL}
                 component={(props) => <QuadrantPage {...props} type={{important: false, urgent: false}}/>}/>

          <Route exact path='/sign-in' component={SignIn} />
          <Route exact path='/sign-up' component={SignUp} />          
          <Route exact path='/confirm' component={Confirm} />         
          <Route exact path='/forgot-password' component={ForgotPassword} />                   
          <Route exact path='/recover' component={RecoverPassword} />

          <Route exact path='/500' component={(props) => <ErrorPage {...props} code={500}/>}/>
          <Route exact path='/502' component={(props) => <ErrorPage {...props} code={502}/>}/>
          <Route exact path='/404' component={(props) => <ErrorPage {...props} code={404}/>}/>

          <Redirect to='/404'/>
        </Switch>
  </Router>

  </Provider>,
  document.getElementById('root')
);
