import { Link } from 'react-router-dom';

import { auth } from '../../store/services'
import classes from './MainNavigation.module.css';

const MainNavigation = (props) => {

  const { isAuthenticated } = props;

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
          {!isAuthenticated && (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}
          {isAuthenticated && (
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
          )}
          {isAuthenticated && (
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
