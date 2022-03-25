import { Link } from 'react-router-dom';

import { useAuth } from '../../store/hooks-store'
import classes from './MainNavigation.module.css';

const MainNavigation = () => {

  const { authState, setAuthStateDispatches } = useAuth();
  const onLogout = () => {
    setAuthStateDispatches.onLogout()
    setAuthStateDispatches.onSetAuthRedirectPath('/')
  }

  const navigationItems = (
    <nav>
    <ul>
      {!authState?.isAuthenticated && (
        <li onClick={() => setAuthStateDispatches.onSetAuthRedirectPath('/auth')}>
          Login
        </li>
      )}
      {authState?.isAuthenticated && (
        <>
          <li onClick={() => setAuthStateDispatches.onSetAuthRedirectPath('/favorites')}>
            Favorites
          </li>
          <li onClick={() => setAuthStateDispatches.onSetAuthRedirectPath('/movies')}>
            Movies
          </li>
          <li>
            <button onClick={onLogout}>Logout</button>
          </li>
        </>
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
