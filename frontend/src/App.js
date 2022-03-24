import { useAuth } from './store/hooks-store'
import Layout from './containers/Layout/Layout';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  const { authState }  = useAuth();
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!authState.isAuthenticated && (
          <Route path='/auth'>
            <AuthPage />
          </Route>
        )}
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
