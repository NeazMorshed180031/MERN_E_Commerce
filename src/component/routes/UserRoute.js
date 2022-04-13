import React from "react";

import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? (
    // <Routes>
    //   <Route {...rest} render={() => children} />
    // </Routes>
    children
  ) : (
    // <h1>Neaz Morshed</h1>
    // <h1 className="text-dagner">Loading...</h1>
    <LoadingToRedirect />
  );
};

export default UserRoute;
