import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import createStore, { history } from './redux'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import Loadable from 'react-loadable';
import { ToastContainer } from 'react-toastify'
import './App.scss';
import 'react-toastify/dist/ReactToastify.css'
import 'react-datepicker/dist/react-datepicker.css'
import LoadingBar from 'react-redux-loading-bar'
import loading from './views/Loading'

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import('./views/Pages/Login'),
  loading
});

const Register = Loadable({
  loader: () => import('./views/Pages/Register'),
  loading
});

const Page404 = Loadable({
  loader: () => import('./views/Pages/Page404'),
  loading
});

const Page500 = Loadable({
  loader: () => import('./views/Pages/Page500'),
  loading
});

class App extends Component {

  render () {
    return (
      <Provider store={createStore()}>
        <LoadingBar style={{ zIndex: 9999, backgroundColor: '#f86c6b', top: 0 }} />
        <ToastContainer />
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/login" name="Login Page" component={Login} />
            <Route exact path="/register" name="Register Page" component={Register} />
            <Route exact path="/404" name="Page 404" component={Page404} />
            <Route exact path="/500" name="Page 500" component={Page500} />
            <Route path="/" name="Home" component={DefaultLayout} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
