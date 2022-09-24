import React, { useContext, useState } from "react";
import { Toast } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Authentication";
import "../../styling/form.css";
import { UserRoles } from "../enums/roles.enum";
import { UserSignupModel } from "../models/userSignup.model";

type SignupProps = {
  onSubmit(form: UserSignupModel): void;
  signinURL: string;
  role: UserRoles;
};

const Signup = ({ ...props }: SignupProps) => {
  const { onSubmit, signinURL, role } = props;
  const [form, setForm] = useState<UserSignupModel>();
  const [show, setShow ] = useState<boolean>(false);
  const [success, setSuccess ] = useState<boolean>(false);
  const [msg, setMsg ] = useState<String>('');

  const handleSubmit = (e: any): void => {
    e.preventDefault();

    if (form && form.password && form?.password?.length < 8) {
      setSuccess(false);
      setMsg("Password must be eight characters or more in length!");
      setShow(true);
      return;
    }
    onSubmit(form as UserSignupModel);
  };

  return (
    <>
      <div className="container">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="form-container">
            {role === UserRoles.ADMIN && (
              <h3 className="title">Admin Signup</h3>
            )}
            {role === UserRoles.ADVISOR && (
              <h3 className="title">Advisor Signup</h3>
            )}
            {role === UserRoles.PANEL && (
              <h3 className="title">Panel Signup</h3>
            )}
            {role === UserRoles.STUDENT && (
              <h3 className="title">Student Signup</h3>
            )}
            <form className="form-horizontal">
              <div className="form-group">
                <label>
                  Name<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                ></input>
              </div>
              {role === UserRoles.STUDENT && (
                <div className="form-group">
                  <label>
                    Student ID<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Student ID"
                    onChange={(event) =>
                      setForm({ ...form, ID: event.target.value })
                    }
                  ></input>
                </div>
              )}
              {(role === UserRoles.ADVISOR || role === UserRoles.PANEL) && (
                <div className="form-group">
                  <label>
                    Department
                    {role === UserRoles.ADVISOR && (
                      <span className="text-danger">*</span>
                    )}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter department"
                    onChange={(event) =>
                      setForm({ ...form, department: event.target.value })
                    }
                  ></input>
                </div>
              )}
              <div className="form-group">
                <label>
                  Email<span className="text-danger">*</span>
                </label>
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
                <label>
                  Password<span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(event) =>
                    setForm({ ...form, password: event.target.value })
                  }
                ></input>
              </div>
              <div className="form-group"></div>
              <div className="form-group">
                <label>
                  Confirm Password<span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  onChange={(event) =>
                    setForm({ ...form, confirmPassword: event.target.value })
                  }
                ></input>
              </div>
              <span className="signin-link">
                Already have an account? Click here to{" "}
                <Link to={signinURL}>Login</Link>
              </span>
              <button className="btn signup" onClick={(e) => handleSubmit(e)}>
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
      <div
        className="toast-container position-absolute"
        style={{ top: "70px", right: "30px" }}
      >
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          {success && (
            <Toast.Header className="bg-primary text-light">
              <strong className="me-auto">Success!</strong>
            </Toast.Header>
          )}

          {!success && (
            <Toast.Header className="bg-danger text-light">
              <strong className="me-auto">Error!</strong>
            </Toast.Header>
          )}

          <Toast.Body>{msg}</Toast.Body>
        </Toast>
      </div>
    </>
  );
};

export { Signup };
