import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../store/hooks-store';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailInputRef = useRef();
  const fullNameInputRef = useRef();
  const passwordInputRef = useRef();
  const ageInputRef = useRef();

  const { authState, setAuthStateDispatches } = useAuth();
  const [ errorMessage, setErrorMessage ] = useState("")

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { error } = authState

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    // TODO: Add validation with yup (https://www.npmjs.com/package/yup)
    let enteredFullName;
    let enteredAge;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    if (!isLogin) {
      enteredFullName = fullNameInputRef.current.value;
      enteredAge = ageInputRef.current.value;
    }

    setIsLoading(true);
    setAuthStateDispatches.onAuth({
      enteredEmail,
      enteredAge,
      enteredFullName,
      enteredPassword
    }, isLogin)
  };

  // Handle req error message
  useEffect(() => {
    if (error) {
      setIsLoading(false)
      setErrorMessage(error)
    }
  }, [error])

  const signUpFields = !isLogin ? (
    <>
      <div className={classes.control}>
            <label htmlFor='email'>Your Full Name</label>
            <input type='text' id='fullName' required ref={fullNameInputRef} />
      </div>
      <div className={classes.control}>
            <label htmlFor='email'>Your Age (optional)</label>
            <input type='number' id='age' ref={ageInputRef} />
      </div>
    </>
  ) : null;

  return (
    <>
      <Modal show={errorMessage} modalClosed={ () => setErrorMessage(null)}>
        <h1>{errorMessage}</h1>
      </Modal>
      <section className={classes.auth}>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={submitHandler}>
          { signUpFields }
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input type='email' id='email' required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Your Password</label>
            <input
              type='password'
              id='password'
              required
              ref={passwordInputRef}
            />
          </div>
          <div className={classes.actions}>
            {!isLoading && (
              <button>{isLogin ? 'Login' : 'Create Account'}</button>
            )}
            {isLoading && <Spinner/>}
            <button
              type='button'
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AuthForm;
