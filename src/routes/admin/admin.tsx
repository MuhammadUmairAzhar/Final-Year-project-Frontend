import React, { useContext, useEffect } from "react";
import { Routes, Route, useRoutes, useNavigate } from "react-router-dom";
import Admin from "../../components/admin";
import { UnauthorizedAccessDenied } from "../../components/common/Unauthorized";
import { UserRoles } from "../../components/enums/roles.enum";
import { AuthContext } from "../../context/Authentication";

const AdminLoginRoutes = () =>
  useRoutes([
    { path: "/", element: <Admin.Login /> },
    { path: "/login", element: <Admin.Login /> },
  ]);

export const AdminRoutes = () => {
  const { getRole, getAuthState } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      getRole() != UserRoles.ADMIN &&
      getAuthState() != "" &&
      getAuthState() != undefined
    ) {
      navigate(-1);
    }
  }, []);

  return (
    <>
      <AdminLoginRoutes />
      <Routes>
        <Route path="/signup" element={<Admin.Signup />} />

        <Route path="/dashboard" element={<Admin.Dashboard />} />
        <Route path="/students" element={<Admin.StudentsList />} />
        <Route path="/advisors" element={<Admin.AdvisorsList />} />
        <Route path="/listforpanel" element={<Admin.ListForPanel />} />
        <Route path="/panels" element={<Admin.PanelsList />} />
        <Route path="/fypgroups" element={<Admin.ProjectsList />} />
        
        {(getRole() != UserRoles.ADMIN ||
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
