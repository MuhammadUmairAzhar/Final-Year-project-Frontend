import React, { useEffect, useState } from "react";
import { Modal, Button, Toast } from "react-bootstrap";
import "../../styling/modalForm.css";
import { axiosAdmin } from "../../global/axios";
import { ContractPopulatedModel } from "../models/contractPopulated.model";
import { CONSTANT } from "../../global/common";

type StudentDetailsModalProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string;
};

enum StudentDetailsSection {
  RequestForm = 1,
  AdvisorForm = 2,
}

const StudentDetailsModal = ({ ...props }: StudentDetailsModalProps) => {
  const { show, setShow, id } = props;
  const [marks, setMarks] = useState<Number>();
  const [contract, setContract] = useState<ContractPopulatedModel>();
  const [detailsSection, setDetailsSection] = useState<StudentDetailsSection>();
  const [showRes, setShowRes] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [res, setRes] = useState<String>("");

  const getStudentDetails = async () => {
    try {
      const res = await axiosAdmin({
        method: "GET",
        url: "/student/" + id + "/request",
      });

      if (res.status === 200) {
        // console.log(res.data.contract)
        setContract(res.data.contract);
        setDetailsSection(StudentDetailsSection.RequestForm);
        if(res.data.contract.marks.admin){
          setMarks(res.data.contract.marks.admin)
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMarksSubmit = async () => {
    try {
      if(!marksValid()) return
      
      const res = await axiosAdmin({
        method: "POST",
        url: "/contract/marks",
        data: {
          contract: {
            id: contract?._id,
            marks: {
              admin: marks
            }
          }
        }
      });

      if (res.status === 200) {
        setSuccess(true);
        setContract({...contract, marks: {...contract?.marks, admin: marks}})
      } else {
        setSuccess(false);
      }
      setRes(res.data.message);
      setShowRes(true);
    } catch (error: any) {
      setSuccess(false);
      setRes(error?.response?.data?.message);
      setShowRes(true);
    }
  }

  const handleMarksChange = (e: any) => {
    if(e.target.value == NaN) return;

    setMarks(Number(e.target.value))
  }

  const marksValid = (): Boolean => {
    if(marks){
      if(marks < CONSTANT.MIN_MARKS || marks > CONSTANT.MAX_ADMIN_MARKS){
        setSuccess(false);
        setRes(`Minimum marks can be ${CONSTANT.MIN_MARKS} and maximum can be ${CONSTANT.MAX_ADMIN_MARKS}`);
        setShowRes(true);
        return false;
      }
    }
    return true
  }

  useEffect(() => {
    getStudentDetails();
  }, []);

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)} size="xl" centered={true}>
        <Modal.Header>
          <Modal.Title>Student Details</Modal.Title>
          {contract && (
            <div className="start-0 btn-group">
              <Button
                variant="primary"
                onClick={() =>
                  setDetailsSection(StudentDetailsSection.RequestForm)
                }
              >
                Request Form
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  setDetailsSection(StudentDetailsSection.AdvisorForm)
                }
              >
                Advisor Form
              </Button>
            </div>
          )}
        </Modal.Header>
        
        {!contract && (
          <h4 className="text-center text-danger">No accepted request</h4>
        )}
        {contract && detailsSection === StudentDetailsSection.RequestForm && (
          <div className="form-container">
            <form className="form-horizontal">
              <div className="form-group">
                <label>Marks</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Give marks out of 10"
                  onChange={(e) => handleMarksChange(e)}
                ></input>
              </div>
            </form>
            <a onClick={handleMarksSubmit} className='btn btn-primary mb-2 ms-2'>Update Marks</a>
            <form className="form-horizontal">
              {contract?.marks?.admin && (
                <>
                  <div className="form-group">
                    <label>Marks From Admin</label>
                    <input
                      type="text"
                      className="form-control"
                      value={contract?.marks?.admin + ''}
                      disabled={true}
                    ></input>
                  </div>
                  <div className="form-group"></div>
                </>
              )}
              {contract?.marks?.advisor && (
                <>
                  <div className="form-group">
                    <label>Marks From Advisor</label>
                    <input
                      type="text"
                      className="form-control"
                      value={contract?.marks?.advisor + ''}
                      disabled={true}
                    ></input>
                  </div>
                  <div className="form-group"></div>
                </>
              )}
              <div className="form-group">
                <label>Student Info</label>
                <input
                  type="text"
                  className="form-control"
                  value={contract?.student?.name + " ~" + contract?.student?.ID}
                  disabled={true}
                ></input>
              </div>
              <div className="form-group">
                <label>Advisor Info</label>
                <input
                  type="text"
                  className="form-control"
                  value={
                    contract?.advisor?.name + " ~" + contract?.advisor?.department
                  }
                  disabled={true}
                ></input>
              </div>
              <div className="form-group">
                <label>Project Name</label>
                <input
                  type="text"
                  className="form-control"
                  disabled={true}
                  value={contract?.project?.name}
                ></input>
              </div>
              <div className="form-group">
                <label>Project Description</label>
                <input
                  type="text"
                  className="form-control"
                  disabled={true}
                  value={contract?.project?.description}
                ></input>
              </div>
              <div className="form-group">
                <label>First Student</label>
              </div>
              <div className="form-group"></div>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  disabled={true}
                  value={contract?.studentOne?.name}
                ></input>
              </div>
              <div className="form-group">
                <label>ID</label>
                <input
                  type="text"
                  className="form-control"
                  disabled={true}
                  value={contract?.studentOne?.ID}
                ></input>
              </div>
              <div className="form-group">
                <label>Second Student</label>
              </div>
              <div className="form-group"></div>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  disabled={true}
                  value={contract?.studentTwo?.name}
                ></input>
              </div>
              <div className="form-group">
                <label>ID</label>
                <input
                  type="text"
                  className="form-control"
                  disabled={true}
                  value={contract?.studentTwo?.name}
                ></input>
              </div>
            </form>
          </div>
        )}

        {!contract?.advisorForm &&
          detailsSection === StudentDetailsSection.AdvisorForm && (
            <h4 className="text-center text-danger">Advisor form not filled</h4>
          )}
        {contract?.advisorForm &&
          detailsSection === StudentDetailsSection.AdvisorForm && (
            <div className="form-container">
              <div className="d-flex justify-content-center mb-4">
                <img src="https://i.imgur.com/lepfdsC.png" />
              </div>
              <h4 className="text-center">Final Year Project</h4>
              <form className="form-horizontal">
                <div className="form-group">
                  <label>Advisor Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={contract?.advisorForm?.advisorName}
                    disabled={true}
                  ></input>
                </div>
                <div className="form-group"></div>
                <div className="form-group">
                  <label>Designation</label>
                  <input
                    type="text"
                    className="form-control"
                    value={contract?.advisorForm?.designation}
                    disabled={true}
                  ></input>
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    className="form-control"
                    value={contract?.advisorForm?.department}
                    disabled={true}
                  ></input>
                </div>
                <div className="form-group">
                  <label>Highest Qualification</label>
                  <input
                    type="text"
                    className="form-control"
                    value={contract?.advisorForm?.qualification!}
                    disabled={true}
                  ></input>
                </div>
                <div className="form-group">
                  <label>Area of Specialization</label>
                  <input
                    type="text"
                    className="form-control"
                    value={contract?.advisorForm?.specialization}
                    disabled={true}
                  ></input>
                </div>
                <div className="form-group">
                  <label>Contact</label>
                  <input
                    type="text"
                    className="form-control"
                    value={contract?.advisorForm?.contact}
                    disabled={true}
                  ></input>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    className="form-control"
                    value={contract?.advisorForm?.email}
                    disabled={true}
                  ></input>
                </div>
                <div className="form-group">
                  <label>Semester</label>
                  <input
                    type="text"
                    className="form-control"
                    value={contract?.advisorForm?.semester}
                    disabled={true}
                  ></input>
                </div>
                <div className="form-group">
                  <label>Year</label>
                  <input
                    type="text"
                    className="form-control"
                    value={contract?.advisorForm?.year}
                    disabled={true}
                  ></input>
                </div>
                <div className="form-group">
                  <label>Program</label>
                  <input
                    type="text"
                    className="form-control"
                    value={contract?.advisorForm?.semester}
                    disabled={true}
                  ></input>
                </div>
                <div className="form-group">
                  <label>Credit Hours</label>
                  <input
                    type="text"
                    className="form-control"
                    value={contract?.advisorForm?.year}
                    disabled={true}
                  ></input>
                </div>
                <div className="form-group">
                  <label>Compensation Offered Per Project</label>
                  <input
                    type="text"
                    className="form-control"
                    value={contract?.advisorForm?.compensation}
                    disabled={true}
                  ></input>
                </div>
                <div className="form-group"></div>
                <div className="form-group">
                  <label>Project Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={contract?.advisorForm?.project?.name}
                    disabled={true}
                  ></input>
                </div>
                <div className="form-group"></div>
                <div className="form-group">
                  <label>Project Description</label>
                  <input
                    type="text"
                    className="form-control"
                    value={contract?.advisorForm?.project?.description}
                    disabled={true}
                  ></input>
                </div>
                <div className="form-group"></div>
                <div className="form-group">
                  <label>Hardware Tools Required</label>
                  <input
                    type="text"
                    className="form-control"
                    value={contract?.advisorForm?.tools?.hardware}
                    disabled={true}
                  ></input>
                </div>
                <div className="form-group"></div>
                <div className="form-group">
                  <label>Software Tools Required</label>
                  <input
                    type="text"
                    className="form-control"
                    value={contract?.advisorForm?.tools?.software}
                    disabled={true}
                  ></input>
                </div>
                <div className="form-group"></div>
                <div className="form-group">
                  <label>Approximate Cost of the Project</label>
                  <input
                    type="text"
                    className="form-control"
                    value={contract?.advisorForm?.tools?.software}
                    disabled={true}
                  ></input>
                </div>
                <div className="form-group"></div>
                <div className="form-group">
                  <label>First Student</label>
                </div>
                <div className="form-group"></div>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled={true}
                    value={contract?.advisorForm?.studentOne?.name}
                  ></input>
                </div>
                <div className="form-group">
                  <label>ID</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled={true}
                    value={contract?.advisorForm?.studentOne?.ID}
                  ></input>
                </div>
                <div className="form-group">
                  <label>Second Student</label>
                </div>
                <div className="form-group"></div>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled={true}
                    value={contract?.advisorForm?.studentTwo?.name}
                  ></input>
                </div>
                <div className="form-group">
                  <label>ID</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled={true}
                    value={contract?.advisorForm?.studentTwo?.ID}
                  ></input>
                </div>
                <div className="form-group">
                  <label>Reference No.</label>
                  <input
                    type="text"
                    className="form-control"
                    value={contract?.advisorForm?.referenceNo}
                    disabled={true}
                  ></input>
                </div>
              </form>
            </div>
          )}

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div
        className="toast-container position-absolute"
        style={{ top: "70px", right: "30px", zIndex: 200000 }}
      >
        <Toast
          onClose={() => setShowRes(false)}
          show={showRes}
          delay={3000}
          autohide
        >
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

          <Toast.Body>{res}</Toast.Body>
        </Toast>
      </div>
    </>
  );
};

export { StudentDetailsModal };
