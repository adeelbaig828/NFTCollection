import React, { useState, useEffect } from "react";
import MainLayout from "./components/Layout/Layout";
import AuthRouter from "./HOC/AuthRouter";
import PrivateRouter from "./HOC/PrivateRouter";
import AuthRoutes from "./Routes/AuthRoutes";
import { Switch,Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { VerifyUser } from "./services/authServices";
import {
  LoginSuccess,
  setProfile,
  LoginFail,
  removeProfile,
} from "./store/auth/authActions";
import 'antd/dist/antd.min.css';
import "./App.scss";
import TermsAndCondition from "./pages/AuthPages/TermsAndCondition";
import HomePage from "./pages/HomePage";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const isRemember = useSelector((state) => state.auth.isRemember);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      let hours = isRemember ? 720 : 24;
      let saved = localStorage.getItem("saved");
      if (
        token &&
        !(saved && new Date().getTime() - saved > hours * 60 * 60 * 1000)
      ) {
        const user = await VerifyUser();
        if (user) {
          dispatch(LoginSuccess());
          dispatch(setProfile(user));
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("saved");
          dispatch(LoginFail());
          dispatch(removeProfile());
        }
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("saved");
        dispatch(LoginFail());
        dispatch(removeProfile());
      }
      setIsLoading(false);
    };
    fetchUserData();
  }, []);

  return (
    <>
      {!isLoading ? (
        <Switch>
          <Route path="/TermsAndCondition" component={TermsAndCondition}/>
          <AuthRouter path="/auth" component={AuthRoutes} />
          <PrivateRouter path="/" component={MainLayout} />
        </Switch>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
