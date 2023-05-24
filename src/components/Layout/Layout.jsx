import { Switch, Route } from "react-router-dom";
import React from "react";
import "./Layout.scss";
import { userRoutes } from "../../Routes/userRoutes";
import AppHeader from "./Header/Header";
import AppFooter from "./Footer/Footer";
import { Layout } from "antd";

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


const { Header, Footer, Content } = Layout;
const MainLayout = () => {
  return (
    <Layout>
      <Header>
        <AppHeader />
      </Header>
      <Content>
        <Switch>
          {userRoutes.map((route, key) => (
            <Route
              path={route?.path}
              component={route?.component}
              exact
              key={key}
            />
          ))}
        </Switch>
      </Content>
      <Footer>
        <AppFooter />
      </Footer>
    </Layout>
    // <div className="Layout">
    //   <Header/>
    //   <div className="main-content">
    //     <Switch>
    //       {userRoutes.map((route, key) => (
    //         <Route
    //           path={route?.path}
    //           component={route?.component}
    //           exact
    //           key={key}
    //         />
    //       ))}
    //     </Switch>
    //   </div>
    //   <Footer/>
    // </div>
  );
};

export default MainLayout;
