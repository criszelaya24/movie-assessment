import './App.css';
import { auth } from './store/services/index';
import Layout from './components/Layout/Layout';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App(props) {
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

export default auth(App);
