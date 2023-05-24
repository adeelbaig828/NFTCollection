import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
// import PropTypes from "prop-types";
const AuthRouter = ({ component: Component, ...restofProps }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Route
      {...restofProps}
      render={(props) =>
        !isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
// AuthRouter.propTypes = {
//   component: PropTypes.any.isRequired,
// };
export default AuthRouter;
