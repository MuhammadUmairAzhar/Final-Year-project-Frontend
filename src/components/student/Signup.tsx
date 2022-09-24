import React, { useContext, useEffect, useState } from 'react';
import { Toast } from 'react-bootstrap';
import { AuthContext } from '../../context/Authentication';
import { axiosStudent } from '../../global/axios';
import Common from '../common/index';
import { UserRoles } from '../enums/roles.enum';
import { UserSignupModel } from '../models/userSignup.model';

const Signup = () => {
  const { setRole } = useContext(AuthContext);
  const [show, setShow ] = useState<boolean>(false);
  const [success, setSuccess ] = useState<boolean>(false);
  const [msg, setMsg ] = useState<String>('');

  const isFormValid = (form: UserSignupModel): boolean => {
    if(form.ID && form.ID.length != 7){
      setSuccess(false);
      setMsg('Student ID length must be equal to seven (7) characters in length');
      setShow(true);
      return false
    }
    return true
  }

  const onSubmit = async (form: UserSignupModel) => {
    try{
      if(!isFormValid(form)) return;

      const res = await axiosStudent({
        method: 'POST',
        url: '/signup',
        data: {
          user: form
        }
      })
  
      if(res.status === 200){
        // console.log(res.data);
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
    setRole(UserRoles.STUDENT);
  }, []);

  return (
    <>
      <Common.Signup onSubmit={onSubmit} signinURL={"/student/login"} role={UserRoles.STUDENT} />

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
