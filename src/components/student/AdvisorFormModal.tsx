import React, { useEffect, useState, useRef } from "react";
import { Modal, Button, Toast } from "react-bootstrap";
import "../../styling/modalForm.css";
import { axiosStudent } from "../../global/axios";
import { ContractModel } from "../models/contract.model";
import { AllContractsModel } from "../models/allContractsList.model";
import ReactToPrint from "react-to-print";
import { PrintAdvisorFormModal } from "../common/PrintAdvisorForm";
import { ContractDetailsModel } from "../models/contractDetails.model";

type AdvisorFormModalProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string;
  disabled: boolean;
};

const AdvisorFormModal = ({ ...props }: AdvisorFormModalProps) => {
  let componentRef = useRef<HTMLDivElement>(null);
  const { show, setShow, id, disabled } = props;
  const [contract, setContract] = useState<ContractDetailsModel>();
  const [form, setForm] = useState<ContractModel>();
  const [showRes, setShowRes] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [res, setRes] = useState<String>("");

  const postAdvisorForm = async () => {
    try {
      const res = await axiosStudent({
        method: "POST",
        url: "/form/advisor",
        data: {
          contract: {
            id: id,
            ...form,
          },
        },
      });

      if (res.status === 200) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
      setRes(res.data.message);
      setShowRes(true);
      setTimeout(() => setShow(false), 4000);
    } catch (error: any) {
      setSuccess(false);
      setRes(error?.response?.data?.message);
      setShowRes(true);
      console.log(error);
    }
  };

  const getAdvisorForm = async () => {
    try {
      const res = await axiosStudent({
        method: "GET",
        url: "/form/" + id,
      });

      if (res.status === 200) {
        // console.log(res.data.contract);
        setForm(res.data.contract);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRequestDetails = async () => {
    try {
      const res = await axiosStudent({
        method: "GET",
        url: "/request/" + id,
      });

      if (res.status === 200) {
        // console.log(res.data.contract)
        setContract(res.data.contract);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (disabled) {
      getAdvisorForm();
    }
    getRequestDetails();
  }, []);

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="xl"
        centered={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Advisor Form</Modal.Title>
        </Modal.Header>
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
                value={contract?.advisor?.name}
                disabled={true}
              ></input>
            </div>
            <div className="form-group"></div>
            <div className="form-group">
              <label>Designation</label>
              <input
                type="text"
                className="form-control"
                value={form?.advisorForm?.designation}
                onChange={(event) =>
                  setForm({
                    ...form,
                    advisorForm: {
                      ...form?.advisorForm,
                      designation: event.target.value,
                    },
                  })
                }
                disabled={disabled}
              ></input>
            </div>
            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                className="form-control"
                value={form?.advisorForm?.department}
                onChange={(event) =>
                  setForm({
                    ...form,
                    advisorForm: {
                      ...form?.advisorForm,
                      department: event.target.value,
                    },
                  })
                }
                disabled={disabled}
              ></input>
            </div>
            <div className="form-group">
              <label>Highest Qualification</label>
              <input
                type="text"
                className="form-control"
                value={form?.advisorForm?.qualification!}
                onChange={(event) =>
                  setForm({
                    ...form,
                    advisorForm: {
                      ...form?.advisorForm,
                      qualification: event.target.value,
                    },
                  })
                }
                disabled={disabled}
              ></input>
            </div>
            <div className="form-group">
              <label>Area of Specialization</label>
              <input
                type="text"
                className="form-control"
                value={form?.advisorForm?.specialization}
                onChange={(event) =>
                  setForm({
                    ...form,
                    advisorForm: {
                      ...form?.advisorForm,
                      specialization: event.target.value,
                    },
                  })
                }
                disabled={disabled}
              ></input>
            </div>
            <div className="form-group">
              <label>Contact</label>
              <input
                type="text"
                className="form-control"
                value={form?.advisorForm?.contact}
                onChange={(event) =>
                  setForm({
                    ...form,
                    advisorForm: {
                      ...form?.advisorForm,
                      contact: event.target.value,
                    },
                  })
                }
                disabled={disabled}
              ></input>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                value={form?.advisorForm?.email}
                onChange={(event) =>
                  setForm({
                    ...form,
                    advisorForm: {
                      ...form?.advisorForm,
                      email: event.target.value,
                    },
                  })
                }
                disabled={disabled}
              ></input>
            </div>
            <div className="form-group">
              <label>Semester</label>
              <input
                type="numeric"
                className="form-control"
                value={form?.advisorForm?.semester}
                onChange={(event) =>
                  setForm({
                    ...form,
                    advisorForm: {
                      ...form?.advisorForm,
                      semester: +event.target.value,
                    },
                  })
                }
                disabled={disabled}
              ></input>
            </div>
            <div className="form-group">
              <label>Year</label>
              <input
                type="numeric"
                className="form-control"
                value={form?.advisorForm?.year}
                onChange={(event) =>
                  setForm({
                    ...form,
                    advisorForm: {
                      ...form?.advisorForm,
                      year: +event.target.value,
                    },
                  })
                }
                disabled={disabled}
              ></input>
            </div>
            <div className="form-group">
              <label>Program</label>
              <input
                type="text"
                className="form-control"
                value={form?.advisorForm?.program}
                onChange={(event) =>
                  setForm({
                    ...form,
                    advisorForm: {
                      ...form?.advisorForm,
                      program: event.target.value,
                    },
                  })
                }
                disabled={disabled}
              ></input>
            </div>
            <div className="form-group">
              <label>Credit Hours</label>
              <input
                type="numeric"
                className="form-control"
                value={form?.advisorForm?.creditHours}
                onChange={(event) =>
                  setForm({
                    ...form,
                    advisorForm: {
                      ...form?.advisorForm,
                      creditHours: +event.target.value,
                    },
                  })
                }
                disabled={disabled}
              ></input>
            </div>
            <div className="form-group">
              <label>Compensation Offered Per Project</label>
              <input
                type="numeric"
                className="form-control"
                value={form?.advisorForm?.compensation}
                onChange={(event) =>
                  setForm({
                    ...form,
                    advisorForm: {
                      ...form?.advisorForm,
                      compensation: +event.target.value,
                    },
                  })
                }
                disabled={disabled}
              ></input>
            </div>
            <div className="form-group"></div>
            <div className="form-group">
              <label>Project Title</label>
              <input
                type="text"
                className="form-control"
                value={form?.advisorForm?.project?.name}
                onChange={(event) =>
                  setForm({
                    ...form,
                    advisorForm: {
                      ...form?.advisorForm,
                      project: {
                        ...form?.advisorForm?.project,
                        name: event.target.value,
                      },
                    },
                  })
                }
                disabled={disabled}
              ></input>
            </div>
            <div className="form-group"></div>
            <div className="form-group">
              <label>Project Description</label>
              <input
                type="text"
                className="form-control"
                value={form?.advisorForm?.project?.description}
                onChange={(event) =>
                  setForm({
                    ...form,
                    advisorForm: {
                      ...form?.advisorForm,
                      project: {
                        ...form?.advisorForm?.project,
                        description: event.target.value,
                      },
                    },
                  })
                }
                disabled={disabled}
              ></input>
            </div>
            <div className="form-group"></div>
            <div className="form-group">
              <label>Hardware Tools Required</label>
              <input
                type="text"
                className="form-control"
                value={form?.advisorForm?.tools?.hardware}
                onChange={(event) =>
                  setForm({
                    ...form,
                    advisorForm: {
                      ...form?.advisorForm,
                      tools: {
                        ...form?.advisorForm?.tools,
                        hardware: event.target.value,
                      },
                    },
                  })
                }
                disabled={disabled}
              ></input>
            </div>
            <div className="form-group"></div>
            <div className="form-group">
              <label>Software Tools Required</label>
              <input
                type="text"
                className="form-control"
                value={form?.advisorForm?.tools?.software}
                onChange={(event) =>
                  setForm({
                    ...form,
                    advisorForm: {
                      ...form?.advisorForm,
                      tools: {
                        ...form?.advisorForm?.tools,
                        software: event.target.value,
                      },
                    },
                  })
                }
                disabled={disabled}
              ></input>
            </div>
            <div className="form-group"></div>
            <div className="form-group">
              <label>Approximate Cost of the Project</label>
              <input
                type="numeric"
                className="form-control"
                value={form?.advisorForm?.cost}
                onChange={(event) =>
                  setForm({
                    ...form,
                    advisorForm: {
                      ...form?.advisorForm,
                      cost: +event.target.value,
                    },
                  })
                }
                disabled={disabled}
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
                value={contract?.studentOne?.name}
                disabled={true}
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
                value={contract?.studentTwo?.name}
                disabled={true}
              ></input>
            </div>
            <div className="form-group">
              <label>ID</label>
              <input
                type="text"
                className="form-control"
                value={contract?.studentTwo?.ID}
                disabled={true}
              ></input>
            </div>
            <div className="form-group">
              <label>Reference No.</label>
              <input
                type="text"
                className="form-control"
                value={form?.advisorForm?.referenceNo}
                onChange={(event) =>
                  setForm({
                    ...form,
                    advisorForm: {
                      ...form?.advisorForm,
                      referenceNo: event.target.value,
                    },
                  })
                }
                disabled={disabled}
              ></input>
            </div>
          </form>
        </div>
        <Modal.Footer>
          {disabled && (
            <>
              <ReactToPrint
                trigger={() => <Button variant="warning">Print</Button>}
                content={() => componentRef.current}
              />
              <div style={{ display: "none" }}>
                <PrintAdvisorFormModal ref={componentRef} contract={form} />
              </div>
            </>
          )}
          {!disabled && (
            <Button variant="primary" onClick={() => postAdvisorForm()}>
              Save
            </Button>
          )}
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

export { AdvisorFormModal };
