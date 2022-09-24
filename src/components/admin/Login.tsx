import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Authentication";
import { axiosAdmin, refreshToken } from "../../global/axios";
import Common from "../common/index";
import { UserRoles } from "../enums/roles.enum";
import { UserSigninModel } from "../models/userSignin.model";
import { Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { setRole, setAuthState } = useContext(AuthContext);
  const [show, setShow] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [msg, setMsg] = useState<String>("");

  const onSubmit = async (form: UserSigninModel) => {
    try {
      const res = await axiosAdmin({
        method: "POST",
        url: "/signin",
        data: {
          user: form,
        },
      });

      if (res.status === 200) {
        // console.log(res.data);
        setSuccess(true);
        setAuthState(res.data.token, UserRoles.ADMIN);
        refreshToken();
      } else {
        setSuccess(false);
      }
      setMsg(res.data.message);
      setShow(true);
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1000);
    } catch (error: any) {
      setSuccess(false);
      setMsg(error?.response?.data?.message);
      setShow(true);
      console.log(error);
    }
  };

  useEffect(() => {
    setRole(UserRoles.ADMIN);
  }, []);

  return (
    <>
      <Common.Login
        onSubmit={onSubmit}
        signupURL={"/admin/signup"}
        role={UserRoles.ADMIN}
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
