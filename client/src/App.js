import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Header from './components/Nav/Header';
import AdminRoute from './components/routes/AdminRoute';
import UserPrivateRoute from './components/routes/UserPrivateRoute';
import { auth } from './config/firebase';
import { currentUser } from './helpers';
import AdminDashboard from './pages/admin/AdminDashboard';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import RegisterComplete from './pages/Auth/RegisterComplete';
import Home from './pages/Home';
import History from './pages/user/History';
import Password from './pages/user/Password';
import Wishlist from './pages/user/Wishlist';


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
  }, [dispatch]);

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
        <UserPrivateRoute exact path="/user/history" component={History} />
        <UserPrivateRoute exact path="/user/password" component={Password} />
        <UserPrivateRoute exact path="/user/wishlist" component={Wishlist} />

        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
      </Switch>
    </>
  );
}

export default App;
