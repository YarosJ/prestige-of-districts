import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import history from '../constants/history';
import * as routes from '../constants/routes';
import Loading from './Loading';

const Maps = Loadable({
  loader: () => import('./Map/index'),
  loading: Loading,
});

const Charts = Loadable({
  loader: () => import('./Charts/index'),
  loading: Loading,
});

const Messages = Loadable({
  loader: () => import('./Messages/index'),
  loading: Loading,
});

const Failures = Loadable({
  loader: () => import('./Failures/index'),
  loading: Loading,
});

const SignUpPage = Loadable({
  loader: () => import('./Account/SignUp/index'),
  loading: Loading,
});

const SignInPage = Loadable({
  loader: () => import('./Account/SignIn/index'),
  loading: Loading,
});

const Profile = Loadable({
  loader: () => import('./Account'),
  loading: Loading,
});

const Users = Loadable({
  loader: () => import('./Admin/Users/index'),
  loading: Loading,
});

const Targets = Loadable({
  loader: () => import('./Admin/Targets/index'),
  loading: Loading,
});

const Access = Loadable({
  loader: () => import('./Admin/AccessControl/index'),
  loading: Loading,
});

const Navigation = Loadable({
  loader: () => import('./Navigation/index'),
  loading: Loading,
});

const Terminal = Loadable({
  loader: () => import('./Error/Terminal'),
  loading: Loading,
});

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
