import React, { useEffect, useState } from "react";
import { Modal, Button, Toast, Form } from "react-bootstrap";
import "../../styling/modalForm.css";
import { axiosAdmin } from "../../global/axios";
import { PanelPopulatedModel } from "../models/panelPopulated.model";
import { PanelListModel } from "../models/panelList.model";
import { UserRoles } from "../enums/roles.enum";
import { StudentModel } from "../models/student.model";
import { ContractPopulatedModel } from "../models/contractPopulated.model";

type PanelDetailsModalProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string;
};

const PanelDetailsModal = ({ ...props }: PanelDetailsModalProps) => {
  const { show, setShow, id } = props;
  const [panel, setPanel] = useState<PanelPopulatedModel>();
  const [contracts, setContracts] = useState<ContractPopulatedModel[]>([]);
  const [selectedContracts, setSelectedContracts] = useState<
    ContractPopulatedModel[]
  >([]);
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);
  const [showRes, setShowRes] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [res, setRes] = useState<String>("");

  const getPanelDetails = async () => {
    try {
      const res = await axiosAdmin({
        method: "GET",
        url: "/panel/" + id,
      });

      if (res.status === 200) {
        setPanel(res.data.panel);
      }

      const newList: ContractPopulatedModel[] = [];
      for (const contract of res.data.panel.contracts) {
        newList.push(contract);
      }
      setSelectedContracts(newList);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllContracts = async () => {
    const res = await axiosAdmin({
      method: "GET",
      url: "/contractsnotinpanel",
    });

    if (res.status === 200) {
      setContracts(res.data.contracts);
    }
  };

  const handleStudentSelection = (contract: ContractPopulatedModel) => {
    const index = selectedContracts.findIndex(
      (cont) => cont._id == contract._id
    );
    if (index !== -1) {
      const newList: ContractPopulatedModel[] = [...selectedContracts];
      newList.splice(index, 1);

      setSelectedContracts(newList);
      return;
    }

    const newList: StudentModel[] = [...selectedContracts];
    newList.push(contract);

    setSelectedContracts(newList);
  };

  const isSelected = (contract: ContractPopulatedModel): boolean => {
    const index = selectedContracts.findIndex(
      (cont) => cont._id == contract._id
    );

    if (index === -1) {
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    try {
      setSubmitDisabled(true);
      const ids = selectedContracts.map((contract) => contract._id);
      const res = await axiosAdmin({
        method: "POST",
        url: "/panel/addcontracts",
        data: {
          panel: {
            id: id,
            contracts: ids,
          },
        },
      });

      if (res.status === 200) {
        setSuccess(true);
        getAllContracts();
      } else {
        setSuccess(false);
      }
      setRes(res.data.message);
      setShowRes(true);
      setSubmitDisabled(false);
    } catch (error: any) {
      setSuccess(false);
      setRes(error?.response?.data?.message);
      setShowRes(true);
      setSubmitDisabled(false);
    }
  };

  const closeRequest = async () => {
    try {
      const members = panel?.members?.map((panelMember) => panelMember._id);
      const res = await axiosAdmin({
        method: "POST",
        url: "/close/panel",
        data: {
          panel: {
            id: id,
            members: members,
          },
        },
      });

      if (res.status === 200) {
        // console.log(res.data);
        setSuccess(true);
      } else {
        setSuccess(false);
      }
      setRes(res.data.message);
      setShowRes(true);
    } catch (error: any) {
      setSuccess(false);
      setRes(error?.response?.data?.message);
      setShowRes(true);
      console.log(error);
    }
  };

  useEffect(() => {
    getPanelDetails();
    getAllContracts();
  }, []);

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="xl"
        centered={true}
      >
        <Modal.Header>
          <Modal.Title>Panel Details</Modal.Title>
          <div className="start-0 btn-group">
            <Button variant="primary" onClick={() => closeRequest()}>
              Close Panel
            </Button>
          </div>
        </Modal.Header>

        <div className="container">
          <div className="row overflow-auto">
            <div className="col-6 align-self-center">
              <h3 className="text-center my-2">{panel?.name}</h3>
              {panel?.members?.map((panel: PanelListModel, index: number) => (
                <div className="text-center mb-2" key={panel._id}>
                  <h5>Member {index + 1}</h5>
                  {panel?.role === UserRoles.ADVISOR && (
                    <h6>{`Advisor: ${panel?.name} ~${panel?.department}`}</h6>
                  )}
                  {panel?.role === UserRoles.PANEL && (
                    <h6>{`Staff: ${panel?.name} ${
                      panel?.department != undefined
                        ? " ~" + panel?.department
                        : ""
                    }`}</h6>
                  )}
                </div>
              ))}
              <h3 className="text-center mt-5">FYP Projects Assgined:</h3>
              {panel?.contracts?.length == 0 && 
              <div className="text-center mb-4">
                <h6>No FYP assigned!</h6>
              </div>}
              {panel?.contracts?.map(
                (contract: ContractPopulatedModel, index: number) => (
                  <div className="text-center mb-4" key={contract._id}>
                    <h6>Project: {contract.project?.name}</h6>
                  </div>
                )
              )}
            </div>
            <div className="col-6 text-center">
              <h3 className="text-center my-2">FYP Groups</h3>
              {contracts?.map(
                (contract: ContractPopulatedModel, index: number) => (
                  <div className="text-center mb-2" key={contract._id}>
                    <Form.Check
                      inline
                      label={
                        "Student: " +
                        contract?.student?.name +
                        " ~" +
                        contract?.student?.ID +
                        "| Advisor: " +
                        contract?.advisor?.name +
                        " ~" +
                        contract?.advisor?.department +
                        "| Project: " +
                        contract?.project?.name
                      }
                      name="group1"
                      type="checkbox"
                      id={contract?._id}
                      onChange={() => handleStudentSelection(contract)}
                      checked={isSelected(contract)}
                    />
                    <br />
                    <br />
                  </div>
                )
              )}
              {!submitDisabled && (
                <a onClick={handleSubmit} className="btn btn-primary mb-2">
                  Submit
                </a>
              )}
            </div>
          </div>
        </div>

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

export { PanelDetailsModal };
