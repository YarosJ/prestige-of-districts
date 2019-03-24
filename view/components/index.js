import React from 'react';
import { Router, Route } from 'react-router-dom';
// import Navigation from './Navigation';
import Landing from './Landing';
import Map from './Map';
// import Footer from './Footer';
import SignUpPage from './Account/SignUp/index';
import SignInPage from './Account/SignIn/index';
import AccountPage from './Account/index';
import Users from './Admin/Users';
import Access from './Admin/AccessControl';
import Profile from './Account/Profile';
import * as routes from '../constants/routes';
import history from '../constants/history';

class App extends React.Component {
  navRef = React.createRef();

  refetchCart = () => {
    this.navRef.current.refetchCart();
  };

  render() {
    const { refetch, location } = this.props;
    return (
      <Router history={history}>
        <div style={{ height: '100%' }}>
          {/*<Navigation ref={this.navRef} history={history} />*/}

          {/* App routes: */}

          <Route
            exact
            path={routes.LANDING}
            component={() => (
              <Landing />
            )}
          />
          <Route
            exact
            path={routes.PROFILE}
            component={Profile}
          />
          <Route
            exact
            path={routes.SIGN_UP}
            component={() => <SignUpPage refetch={refetch} />}
          />
          <Route
            exact
            path={routes.SIGN_IN}
            component={() => <SignInPage refetch={refetch} />}
          />
          <Route
            exact
            path={routes.ACCOUNT}
            component={() => <AccountPage />}
          />

          {/* Admin panel routes: */}

          <Route
            exact
            path={routes.USERS}
            component={() => <Users history={history} refetch={refetch} />}
          />
          <Route
            exact
            path={routes.ACCESS_CONTROL}
            component={() => <Access history={history} refetch={refetch} />}
          />
          {/*<Footer />*/}
        </div>
      </Router>
    );
  }
}

export default App;
