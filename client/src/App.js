import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Header from './components/Nav/Header';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import RegisterComplete from './pages/Auth/RegisterComplete';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Header />

      <ToastContainer />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
      </Switch>
    </>
  );
}

export default App;
