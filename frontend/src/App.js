import { useAuth } from './store/hooks-store'
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './containers/Layout/Layout';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import FavoriteMoviesPages from './pages/FavoriteMoviesPage';

function App() {
  const history = useHistory();
  const { authState = {}, setAuthStateDispatches }  = useAuth();
  const { authRedirectPath, isAuthenticated } = authState;

  useEffect(() => {
    setAuthStateDispatches?.onAutoLogin()
  }, []);

  useEffect(() => {
    if (authRedirectPath) history.replace(authRedirectPath);
  }, [ authRedirectPath ])

  const generalRoutes = (
    <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth'>
          <AuthPage />
        </Route>
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
  );

  const routeForbidden = (
    <Switch>
    <Route path='/' exact>
      <HomePage />
    </Route>
    <Route path='/movies'>
      <MoviesPage/>
    </Route>
    <Route path="/favorites">
      <FavoriteMoviesPages/>
    </Route>
    <Route path='*'>
      <Redirect to='/' />
    </Route>
  </Switch>
  );


  return (
    <Layout>
      { isAuthenticated ? routeForbidden : generalRoutes }
    </Layout>
  );
}

export default App;
