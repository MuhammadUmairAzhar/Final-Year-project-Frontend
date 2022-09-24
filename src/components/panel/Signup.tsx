import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/Authentication';
import { axiosPanel } from '../../global/axios';
import Common from '../common/index';
import { UserRoles } from '../enums/roles.enum';
import { UserSignupModel } from '../models/userSignup.model';
import { Toast } from 'react-bootstrap';

const Signup = () => {
  const { setRole } = useContext(AuthContext);
  const [show, setShow ] = useState<boolean>(false);
  const [success, setSuccess ] = useState<boolean>(false);
  const [msg, setMsg ] = useState<String>('');

  const onSubmit = async (form: UserSignupModel) => {
    try{
      const res = await axiosPanel({
        method: 'POST',
        url: '/signup',
        data: {
          user: form
        }
      })
  
      if(res.status === 200){
        setSuccess(true);
      }else{
        setSuccess(false);
      }
      setMsg(res.data.message);
      setShow(true);
    }catch(error: any){
      console.log(error);
      setSuccess(false);
      setMsg(error?.response?.data?.message);
      setShow(true);
    }
  }

  useEffect(() => {
    setRole(UserRoles.PANEL);
  }, []);

  return (
    <>
      <Common.Signup onSubmit={onSubmit} signinURL={"/panel/login"} role={UserRoles.PANEL} />

      <div className="toast-container position-absolute" style={{top: '70px', right: '30px'}}>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide >
          {success && <Toast.Header className="bg-primary text-light">
            <strong className="me-auto">Success!</strong>
          </Toast.Header>}

          {!success && <Toast.Header className="bg-danger text-light">
            <strong className="me-auto">Error!</strong>
          </Toast.Header>}

          <Toast.Body>{msg}</Toast.Body>
        </Toast>
      </div>
    </>
  );
}

export { Signup };
