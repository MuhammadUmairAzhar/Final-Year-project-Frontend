import React, { useEffect, useState } from "react";
import { axiosAdvisor } from "../../global/axios";
import { CONSTANT } from "../../global/common";
import { PanelPopulatedModel } from "../models/panelPopulated.model";
import { PanelListModel } from "../models/panelList.model";
import { UserRoles } from "../enums/roles.enum";
import { OverlayTrigger, Toast, Tooltip } from "react-bootstrap";
import { ContractPopulatedModel } from "../models/contractPopulated.model";

const AssignedPanel = () => {
  const [panel, setPanel] = useState<PanelPopulatedModel>();
  const [midMarks, setMidMarks] = useState<Number>();
  const [finalMarks, setFinalMarks] = useState<Number>();
  const [showRes, setShowRes] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [res, setRes] = useState<String>("");

  const getAssignedPanel = async () => {
    try {
      const res = await axiosAdvisor({
        method: "GET",
        url: "/panel",
      });

      if (res.status === 200) {
        // console.log(res.data.contract);
        setPanel(res.data.panel);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMidMarksSubmit = async (id?: string) => {
    try {
      if (!midMarksValid()) return;

      const res = await axiosAdvisor({
        method: "POST",
        url: "/contract/midmarks",
        data: {
          contract: {
            id: id,
            panel: panel?._id,
            marks: {
              mid: {
                marks: midMarks,
              },
            },
          },
        },
      });

      if (res.status === 200) {
        setSuccess(true);
        getAssignedPanel()
        // setContract({ ...contract, marks: { ...marks, advisor: marks } });
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
  };

  const handleFinalMarksSubmit = async (id?: string) => {
    try {
      if (!finalMarksValid()) return;

      const res = await axiosAdvisor({
        method: "POST",
        url: "/contract/finalmarks",
        data: {
          contract: {
            id: id,
            panel: panel?._id,
            marks: {
              final: {
                marks: finalMarks,
              },
            },
          },
        },
      });

      if (res.status === 200) {
        setSuccess(true);
        getAssignedPanel()
        // setContract({ ...contract, marks: { ...marks, advisor: marks } });
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
  };

  const handleMidMarksChange = (e: any) => {
    if (e.target.value == NaN) return;

    setMidMarks(Number(e.target.value));
  };

  const handleFinalMarksChange = (e: any) => {
    if (e.target.value == NaN) return;

    setFinalMarks(Number(e.target.value));
  };

  const midMarksValid = (): Boolean => {
    if (midMarks) {
      if (midMarks < CONSTANT.MIN_MARKS || midMarks > CONSTANT.MAX_MID_MARKS) {
        setSuccess(false);
        setRes(
          `Minimum marks can be ${CONSTANT.MIN_MARKS} and maximum can be ${CONSTANT.MAX_MID_MARKS}`
        );
        setShowRes(true);
        return false;
      }
    }
    return true;
  };

  const finalMarksValid = (): Boolean => {
    if (finalMarks) {
      if (
        finalMarks < CONSTANT.MIN_MARKS ||
        finalMarks > CONSTANT.MAX_FINAL_MARKS
      ) {
        setSuccess(false);
        setRes(
          `Minimum marks can be ${CONSTANT.MIN_MARKS} and maximum can be ${CONSTANT.MAX_FINAL_MARKS}`
        );
        setShowRes(true);
        return false;
      }
    }
    return true;
  };

  const calculateMarks = (marksArray?: any[]): number => {
    let marks = 0;

    if (!marksArray || marksArray == undefined || marksArray == null) {
      return marks;
    }

    for (let marksObj of marksArray) {
      marks += marksObj?.marks;
    }

    return marks / marksArray.length;
  };

  useEffect(() => {
    getAssignedPanel();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {panel == undefined && <h3 className="text-center">No Panel Assigned</h3>}
        {panel != undefined &&
        (
          <div className="col-12">
            <div className="offset-3 col-6">
              <h3 className="text-center">{panel?.name}</h3>
              {panel?.members?.map(
                (panelPerson: PanelListModel, index: number) => (
                  <div key={panelPerson._id}>
                    {panelPerson.role === UserRoles.ADVISOR && (
                      <div className="list-group-item list-group-item-action">
                        {"Advisor: " +
                          panelPerson.name +
                          " ~" +
                          panelPerson.department}
                      </div>
                    )}
                    {panelPerson.role === UserRoles.PANEL && (
                      <div className="list-group-item list-group-item-action">
                        {"Staff: " +
                          panelPerson.name +
                          " ~" +
                          (panelPerson.department
                            ? panelPerson.department
                            : "Unknown")}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
            <h3 className="text-center mt-3">FYP Groups</h3>
            <div className="offset-3 col-6">
              {panel?.contracts?.length == 0 && (
                <p className="text-center">No FYP Groups Assigned!</p>
              )}
              {panel?.contracts?.map(
                (contract: ContractPopulatedModel, index: number) => (
                  <div className="card rounded-3 shadow" key={contract._id}>
                    <div className="p-3">
                      <h5 className="card-title">{contract?.project?.name}</h5>
                      <div className="card-body">
                        {contract.studentOne && (
                          <p>
                            {contract?.studentOne?.name} ~{" "}
                            {contract?.studentOne?.ID}
                          </p>
                        )}
                        {contract.studentTwo && (
                          <p>
                            {contract?.studentTwo?.name} ~{" "}
                            {contract?.studentTwo?.ID}
                          </p>
                        )}
                      </div>
                      <form className="form-horizontal">
                        <div className="form-group">
                          <OverlayTrigger
                            placement="top"
                            delay={{ show: 100, hide: 400 }}
                            overlay={
                              <Tooltip>
                                Average of marks given by the panel members
                              </Tooltip>
                            }
                          >
                            <span>
                              <strong>
                                Mid Term Marks{" "}
                                {calculateMarks(contract?.marks?.mid)}
                              </strong>
                              {contract?.user?.mid && <strong className="float-end">
                                Given {contract?.user?.mid}
                              </strong>}
                            </span>
                          </OverlayTrigger>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Give marks out of 20"
                              onChange={(e) => handleMidMarksChange(e)}
                            ></input>
                            <a
                              className="btn btn-primary input-group-text"
                              onClick={() =>
                                handleMidMarksSubmit(contract?._id)
                              }
                            >
                              Submit
                            </a>
                          </div>
                        </div>
                        <div className="form-group mt-2">
                          <OverlayTrigger
                            placement="top"
                            delay={{ show: 100, hide: 400 }}
                            overlay={
                              <Tooltip>
                                Average of marks given by the panel members
                              </Tooltip>
                            }
                          >
                            <span>
                              <strong>
                                Final Term Marks{" "}
                                {calculateMarks(contract?.marks?.final)}
                              </strong>
                              {contract?.user?.final && <strong className="float-end">
                                Given {contract?.user?.final}
                              </strong>}
                            </span>
                          </OverlayTrigger>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Give marks out of 40"
                              onChange={(e) => handleFinalMarksChange(e)}
                            ></input>
                            <a
                              className="btn btn-primary input-group-text"
                              onClick={() =>
                                handleFinalMarksSubmit(contract?._id)
                              }
                            >
                              Submit
                            </a>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>

      <div
        className="toast-container position-absolute"
        style={{ top: "70px", right: "30px" }}
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
    </div>
  );
};

export { AssignedPanel };
