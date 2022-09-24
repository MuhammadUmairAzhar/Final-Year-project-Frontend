import React, { useContext, useEffect } from "react";
import { Routes, Route, useRoutes, useNavigate } from "react-router-dom";
import Advisor from "../../components/advisor";
import { UnauthorizedAccessDenied } from "../../components/common/Unauthorized";
import { UserRoles } from "../../components/enums/roles.enum";
import { AuthContext } from "../../context/Authentication";

const AdvisorLoginRoutes = () =>
  useRoutes([
    { path: "/", element: <Advisor.Login /> },
    { path: "/login", element: <Advisor.Login /> },
  ]);

export const AdvisorRoutes = () => {
  const { getRole, getAuthState } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      getRole() != UserRoles.ADVISOR &&
      getAuthState() != "" &&
      getAuthState() != undefined
    ) {
      navigate(-1);
    }
  }, []);

  return (
    <>
      <AdvisorLoginRoutes />
      <Routes>
        <Route path="/signup" element={<Advisor.Signup />} />

        <Route path="/dashboard" element={<Advisor.Dashboard />} />
        <Route path="/requests/:status" element={<Advisor.RequestsList />} />
        <Route path="/panel" element={<Advisor.AssignedPanel />} />
        
        {(getRole() != UserRoles.ADVISOR ||
          getAuthState() == "" ||
          getAuthState() == undefined) && (
          <>
            <Route path="/*" element={<UnauthorizedAccessDenied />} />
          </>
        )}
      </Routes>
    </>
  );
};
