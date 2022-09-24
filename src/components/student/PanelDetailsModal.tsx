import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../../styling/modalForm.css";
import { axiosStudent } from "../../global/axios";
import { PanelPopulatedModel } from "../models/panelPopulated.model";
import { PanelListModel } from "../models/panelList.model";
import { UserRoles } from "../enums/roles.enum";
import { totalmem } from "os";

type PanelDetailsModalProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  id?: String;
};

const PanelDetailsModal = ({ ...props }: PanelDetailsModalProps) => {
  const { show, setShow, id } = props;
  const [panel, setPanel] = useState<PanelPopulatedModel>();

  const getAssignedPanelDetails = async () => {
    try {
      const res = await axiosStudent({
        method: "GET",
        url: "/panel/" + id,
      });

      if (res.status === 200) {
        setPanel(res.data.panel);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateMarks = (marksArray?: any[]): number => {
    let marks = 0;

    if (!marksArray) {
      return marks;
    }

    for (let marksObj of marksArray) {
      marks += marksObj?.marks;
    }

    return marks / marksArray.length;
  };

  const calculateTotal = (contract: any): number => {
    const total =
      calculateMarks(contract?.marks?.final) +
      calculateMarks(contract?.marks?.mid) +
      contract?.marks?.admin +
      contract?.marks?.advisor;

    return total;
  };

  useEffect(() => {
    getAssignedPanelDetails();
  }, []);

  return (
    <Modal show={show} onHide={() => setShow(false)} size="xl" centered={true}>
      <Modal.Header closeButton>
        <Modal.Title>Panel Details</Modal.Title>
      </Modal.Header>
      <div className="container">
        <div className="d-flex">
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
          </div>
          <div className="col-6 align-self-center text-center">
            <h3 className="text-center my-2">Marks</h3>
            <h5 className="text-center mb-2">
              Admin:{" "}
              {panel?.contracts &&
              panel?.contracts[0]?.marks?.admin != undefined
                ? calculateMarks([{ marks: panel.contracts[0].marks.admin }])
                : "-"}
            </h5>
            <h5 className="text-center mb-2">
              Advisor:{" "}
              {panel?.contracts &&
              panel?.contracts[0]?.marks?.advisor != undefined
                ? calculateMarks([{ marks: panel.contracts[0].marks.advisor }])
                : "-"}
            </h5>
            <h5 className="text-center mb-2">
              Mid:{" "}
              {panel?.contracts && panel?.contracts[0]?.marks?.mid != undefined
                ? calculateMarks(panel?.contracts[0]?.marks?.mid)
                : "-"}
            </h5>
            <h5 className="text-center mb-2">
              Final:{" "}
              {panel?.contracts &&
              panel?.contracts[0]?.marks?.final != undefined
                ? calculateMarks(panel?.contracts[0]?.marks?.final)
                : "-"}
            </h5>
            <h5 className="text-center mb-2">
              Total:{" "}
              {panel?.contracts &&
              panel?.contracts[0]?.marks?.final != undefined
                ? calculateTotal(panel?.contracts[0])
                : "-"}
            </h5>
          </div>
        </div>
      </div>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { PanelDetailsModal };
