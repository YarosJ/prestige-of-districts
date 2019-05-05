import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Maps from './Map/index';
import Charts from './Charts/index';
import Messages from './Messages/index';
import Failures from './Failures/index';
import SignUpPage from './Account/SignUp/index';
import SignInPage from './Account/SignIn/index';
import Profile from './Account';
import Users from './Admin/Users/index';
import Targets from './Admin/Targets/index';
import Access from './Admin/AccessControl/index';
import history from '../constants/history';
import * as routes from '../constants/routes';
import Navigation from './Navigation/index';
import Terminal from './Error/Terminal';

class App extends React.Component {
  navRef = React.createRef();

  refetchCart = () => {
    this.navRef.current.refetchCart();
  };

  render() {
    const { refetch, apolloClient } = this.props;
    return (
      <Router history={history}>
        <div style={{
          display: 'flex',
          padding: 0,
          height: '104.5%',
        }}
        >
          <Navigation history={history} />
          <div style={{
            padding: 0,
            width: '100%',
            height: '100%',
            overflow: 'auto',
          }}
          >

            {/* App routes: */}

            <Switch>
              <Route
                exact
                path={routes.LANDING}
                component={() => (
                  <Maps history={history} />
                )}
              />
              <Route
                exact
                path={routes.CHARTS}
                component={() => (
                  <Charts history={history} />
                )}
              />
              <Route
                exact
                path={routes.MESSAGES}
                component={() => (
                  <Messages history={history} />
                )}
              />
              <Route
                exact
                path={routes.FAILURES}
                component={() => (
                  <Failures history={history} />
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
              <Route
                exact
                path={routes.TARGETS}
                component={() => (
                  <Targets
                    history={history}
                    apolloClient={apolloClient}
                    refetch={refetch}
                  />
                )}
              />

              {/* Handle 403 */}

              <Route
                exact
                path={routes.FORBIDDEN}
                component={() => (
                  <Terminal
                    code={403}
                    message="Access denied 403!"
                  />
                )}
              />

              {/* Handle 404 */}

              <Route component={() => (
                <Terminal
                  code={404}
                  message="Page not found 404!"
                />
              )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
