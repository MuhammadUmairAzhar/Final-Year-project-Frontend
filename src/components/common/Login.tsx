import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Authentication";
import "../../styling/form.css";
import { UserRoles } from "../enums/roles.enum";
import { UserSigninModel } from "../models/userSignin.model";

type LoginProps = {
  onSubmit(form: UserSigninModel): void;
  signupURL: string;
  role: UserRoles;
};

const Login = ({ ...props }: LoginProps) => {
  const { onSubmit, signupURL, role } = props;
  const [form, setForm] = useState<UserSigninModel>();

  const handleSubmit = (e: any): void => {
    e.preventDefault()
    onSubmit(form as UserSigninModel);
  };

  return (
    <div className="container">
      <div className="row d-flex align-items-center justify-content-center">
        <div className="form-container">
          {role === UserRoles.ADMIN && <h3 className="title">Admin Login</h3>}
          {role === UserRoles.ADVISOR && (
            <h3 className="title">Advisor Login</h3>
          )}
          {role === UserRoles.PANEL && <h3 className="title">Panel Login</h3>}
          {role === UserRoles.STUDENT && (
            <h3 className="title">Student Login</h3>
          )}
          <form className="form-horizontal">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
              ></input>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={(event) =>
                  setForm({ ...form, password: event.target.value })
                }
              ></input>
            </div>
            <span className="signin-link">
              Do not have an account? Click here to{" "}
              <Link to={signupURL}>Register</Link>
            </span>
            <button className="btn signup" onClick={(e) => handleSubmit(e)}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { Login };
