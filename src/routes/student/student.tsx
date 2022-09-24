import React, { useContext, useEffect } from "react";
import { Routes, Route, useRoutes, useNavigate } from "react-router-dom";
import { UnauthorizedAccessDenied } from "../../components/common/Unauthorized";
import { UserRoles } from "../../components/enums/roles.enum";
import Student from "../../components/student";
import { AuthContext } from "../../context/Authentication";

const StudentLoginRoutes = () =>
  useRoutes([
    { path: "/", element: <Student.Login /> },
    { path: "/login", element: <Student.Login /> },
  ]);

export const StudentRoutes = () => {
  const { getRole, getAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      getRole() != UserRoles.STUDENT &&
      getAuthState() != "" &&
      getAuthState() != undefined
    ) {
      navigate(-1);
    }
  }, []);

  return (
    <>
      <StudentLoginRoutes />
      <Routes>
        <Route path="/signup" element={<Student.Signup />} />

        <Route path="/dashboard" element={<Student.Dashboard />} />
        <Route path="/advisors" element={<Student.AdvisorsList />} />
        <Route path="/requests/:status" element={<Student.RequestsList />} />

        {(getRole() != UserRoles.STUDENT ||
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
