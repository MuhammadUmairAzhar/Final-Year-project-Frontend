import React, { useContext, useEffect, useState } from "react";
import { Toast } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Authentication";
import { axiosStudent, refreshToken } from "../../global/axios";
import Common from "../common/index";
import { UserRoles } from "../enums/roles.enum";
import { UserSigninModel } from "../models/userSignin.model";

const Login = () => {
  let navigate = useNavigate();
  const { setRole, setAuthState } = useContext(AuthContext);
  const [show, setShow] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [msg, setMsg] = useState<String>("");

  const onSubmit = async (form: UserSigninModel) => {
    try {
      const res = await axiosStudent({
        method: "POST",
        url: "/signin",
        data: {
          user: form,
        },
      });

      if (res.status === 200) {
        setSuccess(true);
        setAuthState(res.data.token, UserRoles.STUDENT);
        refreshToken();
      } else {
        setSuccess(false);
      }
      setMsg(res.data.message);
      setShow(true);
      setTimeout(() => {
        navigate("/student/dashboard");
      }, 1000);
    } catch (error: any) {
      setSuccess(false);
      setMsg(error?.response?.data?.message);
      setShow(true);
      console.log(error);
    }
  };

  useEffect(() => {
    setRole(UserRoles.STUDENT);
  }, []);

  return (
    <>
      <Common.Login
        onSubmit={onSubmit}
        signupURL={"/student/signup"}
        role={UserRoles.STUDENT}
      />
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

export { Login };
