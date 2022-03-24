import classes from './StartingPageContent.module.css';
import { useAuth } from '../../store/hooks-store';

const StartingPageContent = () => {
  const { authState = {} }  = useAuth();
  const { isAuthenticated } = authState;
  let welcomeMessage = <h2>In order to access movies please go to Login section</h2>;

  if (isAuthenticated) welcomeMessage = ''
  return (
    <section className={classes.starting}>
      <h1>Welcome on Board!</h1>
      {welcomeMessage}
    </section>
  );
};

export default StartingPageContent;
