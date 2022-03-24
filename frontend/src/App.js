import { useAuth } from './store/hooks-store/useAuth'
import Layout from './components/Layout/Layout';
import { Switch, Route, Redirect } from 'react-router-dom';
// import UserProfile from './components/Profile/UserProfile';
// import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  const [ authState, setAuthDispatches ]  = useAuth();
  console.log({ authState, setAuthDispatches });
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
