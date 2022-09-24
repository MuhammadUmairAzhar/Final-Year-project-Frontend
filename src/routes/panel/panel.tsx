import React, { useContext, useEffect } from "react";
import { Routes, Route, useRoutes, useNavigate } from "react-router-dom";
import { UnauthorizedAccessDenied } from "../../components/common/Unauthorized";
import { UserRoles } from "../../components/enums/roles.enum";
import Panel from "../../components/panel";
import { AuthContext } from "../../context/Authentication";

const PanelLoginRoutes = () =>
  useRoutes([
    { path: "/", element: <Panel.Login /> },
    { path: "/login", element: <Panel.Login /> },
  ]);

export const PanelRoutes = () => {
  const { getRole, getAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      getRole() != UserRoles.PANEL &&
      getAuthState() != "" &&
      getAuthState() != undefined
    ) {
      navigate(-1);
    }
  }, []);

  return (
    <>
      <PanelLoginRoutes />
      <Routes>
        <Route path="/signup" element={<Panel.Signup />} />

        <Route path="/dashboard" element={<Panel.Dashboard />} />
        <Route path="/panel" element={<Panel.AssignedPanel />} />

        {(getRole() != UserRoles.PANEL ||
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
