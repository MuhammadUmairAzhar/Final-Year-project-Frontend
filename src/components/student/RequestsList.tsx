import React, { useEffect, useState } from "react";
import { Toast } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { axiosStudent } from "../../global/axios";
import { AllContractsModel } from "../models/allContractsList.model";
import { AdvisorFormModal } from "./AdvisorFormModal";
import LogFormModal from "./LogFormModal";
import { PanelDetailsModal } from "./PanelDetailsModal";
import { RequestDetailsModal } from "./RequestDetailsModal";

const RequestsList = () => {
  const { status } = useParams<"status">();
  const [selectedContract, setSelectedContract] = useState<AllContractsModel>();
  const [contracts, setContracts] = useState<AllContractsModel[]>();
  const [closed, setClosed] = useState(false);
  const [showRequestDetailsModal, setShowRequestDetailsModal] = useState(false);
  const [showAdvisorFormModal, setShowAdvisorFormModal] = useState(false);
  const [showLogFormModal, setShowLogFormModal] = useState(false);
  const [showPanelDetailsModal, setShowPanelDetailsModal] = useState(false);
  const [showFillAdvisorFormModal, setShowFillAdvisorFormModal] = useState(false);
  const [showRes, setShowRes] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [res, setRes] = useState<String>('');

  const showDetails = (contract: AllContractsModel) => {
    setSelectedContract(contract);
    setShowRequestDetailsModal(true);
  };

  const openAdvisorForm = (contract: AllContractsModel) => {
    setSelectedContract(contract);
    setShowAdvisorFormModal(true);
  }

  const openPanelDetails = (contract: AllContractsModel) => {
    setSelectedContract(contract);
    setShowPanelDetailsModal(true);
  }

  const openFillAdvisorForm = (contract: AllContractsModel) => {
    setSelectedContract(contract);
    setShowFillAdvisorFormModal(true);
  }

  const closeRequest = async (contract: AllContractsModel) => {
    try {
      const res = await axiosStudent({
        method: "POST",
        url: "/close/request",
        data: {
            contract: {
                id: contract._id
            }
        }
      });

      if(res.status === 200){
        // console.log(res.data);
        setSuccess(true);
      }else{
        setSuccess(false);
      }
      setRes(res.data.message);
      setShowRes(true);
      getContractsList()
    }catch(error: any){
      setSuccess(false);
      setRes(error?.response?.data?.message);
      setShowRes(true);
      console.log(error)
    }
  };

  const getContractsList = async () => {
    const res = await axiosStudent({
      method: "GET",
      url: "/requests",
      params: {
        acceptance_status: status,
      },
    });

    if (res.status === 200) {
      setContracts(res.data.contracts);
    }
  };

  const openLogForm = (contract: AllContractsModel) => {
    setSelectedContract(contract);
    setShowLogFormModal(true);
  };

  useEffect(() => {
    getContractsList();
  }, []);

  if (showRequestDetailsModal) {
    return (
      <RequestDetailsModal
        show={showRequestDetailsModal}
        setShow={setShowRequestDetailsModal}
        id={selectedContract?._id}
      />
    );
  }

  if (showAdvisorFormModal) {
    return (
      <AdvisorFormModal
        show={showAdvisorFormModal}
        setShow={setShowAdvisorFormModal}
        id={selectedContract?._id}
        disabled={true}
      />
    );
  }

  if (showPanelDetailsModal) {
    return (
      <PanelDetailsModal
        show={showPanelDetailsModal}
        setShow={setShowPanelDetailsModal}
        id={selectedContract?._id}
      />
    );
  }

  if (showFillAdvisorFormModal) {
    return (
      <AdvisorFormModal
        show={showFillAdvisorFormModal}
        setShow={setShowFillAdvisorFormModal}
        id={selectedContract?._id}
        disabled={false}
      />
    );
  }

  if (showLogFormModal) {
    return (
      <LogFormModal
        show={showLogFormModal}
        setShow={setShowLogFormModal}
        id={selectedContract?._id}
      />
    );
  }

  return (
    <div>
      <div className="container">
        {status === "0" && <h3 className="text-center">Pending Requests</h3>}
        {status === "1" && <h3 className="text-center">Accepted Requests</h3>}
        {status === "-1" && <h3 className="text-center">Rejected Requests</h3>}
        <div className="btn-group mb-3">
          <button
            type="button"
            className={
              closed
                ? "btn btn-outline-primary active"
                : "btn btn-outline-primary"
            }
            onClick={() => setClosed(true)}
          >
            Closed
          </button>
          <button
            type="button"
            className={
              !closed
                ? "btn btn-outline-secondary active"
                : "btn btn-outline-secondary"
            }
            onClick={() => setClosed(false)}
          >
            Opened
          </button>
        </div>
        <div className="d-flex">
          {contracts?.map(
            (contract: AllContractsModel, index: number) =>
              contract.isClosed === closed && (
                <div className="col-6" key={index}>
                  <div className="card">
                    <div className="card-body">
                      <h6 className="card-subtitle mb-2 text-muted">
                        {contract?.advisor?.name} ~
                        {contract?.advisor?.department}
                      </h6>
                      <h5 className="card-title">{contract?.project?.name}</h5>
                      <p className="card-text">
                        {contract?.project?.description}
                      </p>
                      
                      <a
                        className="card-link"
                        onClick={() => showDetails(contract)}
                      >
                        Show details
                      </a>

                      <a
                        className="card-link"
                        onClick={() => openLogForm(contract)}
                      >
                        Log form
                      </a>
                      <div className="btn-group ms-5 d-flex float-end">
                      {(status && status === '1' && contract?.inPanel && contract?.panel && !closed) && (
                          <a
                            className="btn btn-dark ms-5"
                            onClick={() => openPanelDetails(contract)}
                          >
                          Panel And Marks
                        </a>)}
                        {(status && status === '1' && contract?.advisorForm?._id && !closed) && (
                          <a
                            className="btn btn-dark ms-5"
                            onClick={() => openAdvisorForm(contract)}
                          >
                          See Advisor Form
                        </a>)}
                        {(status && status === '1' && !contract?.advisorForm?._id && !closed) && ( 
                          <a
                            className="btn btn-dark ms-5"
                            onClick={() => openFillAdvisorForm(contract)}
                          >
                          Fill Advisor Form
                        </a>)}
                        
                        {(status && status === '0' && !closed) && (
                          <a
                              className="btn btn-primary ms-5"
                              onClick={() => closeRequest(contract)}>
                          Close Request
                        </a>)}
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>

      <div className="toast-container position-absolute" style={{top: '70px', right: '30px'}}>
          <Toast onClose={() => setShowRes(false)} show={showRes} delay={3000} autohide >

          {success && <Toast.Header className="bg-primary text-light">
            <strong className="me-auto">Success!</strong>
          </Toast.Header>}

          {!success && <Toast.Header className="bg-danger text-light">
            <strong className="me-auto">Error!</strong>
          </Toast.Header>}

          <Toast.Body>{res}</Toast.Body>
        </Toast>
      </div>
    </div>
  );
};

export { RequestsList };
