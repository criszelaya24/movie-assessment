import { Link } from 'react-router-dom';

import { useAuth } from '../../store/hooks-store'
import classes from './MainNavigation.module.css';

const MainNavigation = () => {

  const { authState, setAuthDispatches } = useAuth();

  const logoutHandler = () => {
    setAuthDispatches.onLogout();
    // optional: redirect the user
  };

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
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
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
