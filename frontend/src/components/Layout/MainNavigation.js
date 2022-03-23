import { Link } from 'react-router-dom';

import { auth } from '../../store/services'
import classes from './MainNavigation.module.css';

const MainNavigation = (props) => {

  const isLoggedIn = props.isAuthenticated;

  const logoutHandler = () => {
    props.onLogout();
    // optional: redirect the user
  };

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default auth(MainNavigation);
