import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Basic from "../components/index";
import { HomeRoutes } from "./common/common";
import { StudentRoutes } from "./student/student";
import { AdminRoutes } from "./admin/admin";
import { AdvisorRoutes } from "./advisor/advisor";
import { PanelRoutes } from "./panel/panel";
import { AuthContext } from "../context/Authentication";
import { UserRoles } from "../components/enums/roles.enum";

const Main = () => {
  return (
    <Router>
      <Basic.Navbar />
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/advisor/*" element={<AdvisorRoutes />} />
        <Route path="/panel/*" element={<PanelRoutes />} />
        <Route path="/student/*" element={<StudentRoutes />} />
        <Route path="/*" element={<HomeRoutes />} />
      </Routes>
    </Router>
  );
};

export default Main;
