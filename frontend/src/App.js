import './App.css';
import { auth } from './store/services/index';
import logo from './logo.svg'

function App(props) {
  const url = process.env.REACT_APP_MOVIE_DB_SERVER;
  console.log({ props })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>{url}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default auth(App);
