import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../functions/auth";

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          // console.log("CURRENT ADMIN RES", res);
          setOk(true);
        })
        .catch((err) => {
          setOk(false);
          console.log("ADMIN ROUTE ERR", err);
        });
    }
  }, [user]);

  return ok ? children : <LoadingToRedirect />;
};

export default AdminRoute;
