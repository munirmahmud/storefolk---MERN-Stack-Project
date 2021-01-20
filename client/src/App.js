import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Header from './components/Nav/Header';
import { auth } from './config/firebase';
import { currentUser } from './helpers';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import RegisterComplete from './pages/Auth/RegisterComplete';
import Home from './pages/Home';
import History from './pages/user/History';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check firebase auth state
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user) {
        let idTokenResult = await user.getIdTokenResult();

        currentUser(idTokenResult.token)
            .then((res) => {
                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: {
                        _id: res.data._id,
                        name: res.data.name,
                        email: res.data.email,
                        token: idTokenResult.token,
                        role: res.data.role,
                    }
                });
            })
            .catch((error) => console.log(error));       
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header />

      <ToastContainer />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <Route exact path="/user/history" component={History} />
      </Switch>
    </>
  );
}

export default App;
