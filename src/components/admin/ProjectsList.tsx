import React, { useEffect, useState } from "react";
import { axiosAdmin } from "../../global/axios";
import { AllContractsModel } from "../models/allContractsList.model";
import { StudentDetailsModal } from "./StudentDetailsModal";

const ProjectsList = () => {
  const [contracts, setContracts] = useState<AllContractsModel[]>([]);
  const [selectedContract, setSelectedContract] = useState<AllContractsModel>();
  const [showStudentDetailsModal, setShowStudentDetailsModal] = useState(false);

  const handleContractSelection = (contract: AllContractsModel) => {
    setSelectedContract(contract);
    setShowStudentDetailsModal(true);
  };

  const getAllContracts = async () => {
    const res = await axiosAdmin({
      method: "GET",
      url: "/contracts",
    });

    if (res.status === 200) {
      setContracts(res.data.contracts);
    }
  };

  useEffect(() => {
    getAllContracts();
  }, []);

  if (showStudentDetailsModal) {
    return (
      <StudentDetailsModal
        show={showStudentDetailsModal}
        setShow={setShowStudentDetailsModal}
        id={selectedContract?.student?._id}
      />
    );
  }

  return (
    <div>
      <div className="container">
        <div className="list-group col-6">
          {contracts?.map((contract: AllContractsModel, index: number) => (
            <a
              className={
                contract._id === selectedContract?._id
                  ? "list-group-item list-group-item-action mb-1 active"
                  : "list-group-item list-group-item-action mb-1"
              }
              onClick={() => handleContractSelection(contract)}
              key={index}
            >
              Student: {contract?.student?.name} ~{contract.student?.ID} <br/>
              Advisor: {contract?.advisor?.name} ~{contract.advisor?.department} <br/>
              Project: {contract?.project?.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export { ProjectsList };
