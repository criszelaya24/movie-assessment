import { Link } from 'react-router-dom';

import { useAuth } from '../../store/hooks-store'
import classes from './MainNavigation.module.css';

const MainNavigation = () => {

  const [ authState, setAuthStateDispatches ] = useAuth();

  const navigationItems = (
    <nav>
    <ul>
      {!authState?.isAuthenticated && (
        <li>
          <Link to='/auth'>Login</Link>
        </li>
      )}
      {authState?.isAuthenticated && (
        <li>
          <Link to='/profile'>Profile</Link>
        </li>
      )}
      {authState?.isAuthenticated && (
        <li>
          <button onClick={setAuthStateDispatches.onLogout}>Logout</button>
        </li>
      )}
    </ul>
  </nav>
  )

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>Movies now</div>
      </Link>
      { navigationItems }
    </header>
  );
};

export default MainNavigation;
