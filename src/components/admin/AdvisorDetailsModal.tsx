import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../../styling/modalForm.css";
import { axiosAdmin } from "../../global/axios";
import { ContractDetailsModel } from "../models/contractDetails.model";

type AdvisorDetailsModalProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string;
};

const AdvisorDetailsModal = ({ ...props }: AdvisorDetailsModalProps) => {
  const { show, setShow, id } = props;
  const [contracts, setContracts] = useState<ContractDetailsModel[]>([]);

  const getAdvisorDetails = async () => {
    try {
      const res = await axiosAdmin({
        method: "GET",
        url: "/advisor/" + id,
      });

      if (res.status === 200) {
        // console.log(res.data.contract)
        setContracts(res.data.contracts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdvisorDetails();
  }, []);

  return (
    <Modal show={show} onHide={() => setShow(false)} size="xl" centered={true}>
      <Modal.Header>
        <Modal.Title>Advisor Details</Modal.Title>
      </Modal.Header>

      {contracts.length === 0 && (
        <h4 className="text-center text-danger">No group yet</h4>
      )}
      <div>
        {contracts.map((contract: ContractDetailsModel, index: number) => (
          <div className="form-container" id={index.toString()}>
            <form className="form-horizontal">
              <h5 className="text-center text-dark">Group No. {index+1}</h5>
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
                  value={contract?.studentTwo?.ID}
                ></input>
              </div>
            </form>
          </div>
        ))}
      </div>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { AdvisorDetailsModal };
