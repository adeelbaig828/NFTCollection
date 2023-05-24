import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AppFooter from "../components/Layout/Footer/Footer";
import AppHeader from "../components/Layout/Header/Header";
import Login from "../pages/AuthPages/Login";
import SignUp from "../pages/AuthPages/SignUp";
import ForgotPassword from "../pages/AuthPages/ForgotPassword";
import { Layout } from "antd";
import "../components/Layout/Layout.scss";
import ResetPassword from "../pages/AuthPages/ResetPassword";
import VerificationEmail from "../pages/AuthPages/VerificationEmail";
import VerifiedEmail from "../pages/AuthPages/VerifiedEmail";
import ResendEmail from "../pages/AuthPages/ResendEmail";
import SecurityQuestion from "../pages/AuthPages/SecurityQuestionPage";
const { Header, Footer, Content } = Layout;

const AuthRoutes = () => {
  return (
    <>
      <Layout>
        <Header>
          <AppHeader />
        </Header>
        <Content>
          <Switch>
            <Route path="/auth/login" exact component={Login} />
            <Route path="/auth/signup" exact component={SignUp} />
            <Route path="/auth/reset-password" exact component={ResetPassword} />
            <Route path="/auth/security-question" exact component={SecurityQuestion} />

            <Route
              path="/auth/forgotPassword"
              exact
              component={ForgotPassword}
            />
             <Route
              path="/auth/emailVerification"
              exact
              component={VerificationEmail}
            />
            <Route
              path="/auth/verify-email"
              exact
              component={VerifiedEmail}
            />
            <Route
              path="/auth/resendEmail"
              exact
              component={ResendEmail}
            />
            <Redirect from="/auth" to="/auth/login" />
          </Switch>
        </Content>
        <Footer>
          <AppFooter />
        </Footer>
      </Layout>
    </>
  );
};
export default AuthRoutes;
