import React, { useEffect, useState } from "react";
import { Form, Toast } from "react-bootstrap";
import { axiosAdmin } from "../../global/axios";
import { CONSTANT } from "../../global/common";
import { UserRoles } from "../enums/roles.enum";
import { PanelListModel } from "../models/panelList.model";

const ListForPanel = () => {
  const [panelList, setPanelList] = useState<PanelListModel[]>([]);
  const [panelMembers, setPanelMembers] = useState<PanelListModel[]>([]);
  const [panelName, setPanelName] = useState<string>('');
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);
  const [showMsg, setShowMsg] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [msg, setMsg] = useState<String>("");

  const handlePanelMemberSelection = (panelMember: PanelListModel) => {
    const index = panelMembers.findIndex(
      (panelMem) => panelMem._id == panelMember._id
    );
    if (index !== -1) {
      const newList: PanelListModel[] = [...panelMembers];
      newList.splice(index, 1);

      setPanelMembers(newList);
      return;
    }

    if (panelMembers.length < CONSTANT.PANEL_MEMBER_LIMIT) {
      const newList: PanelListModel[] = [...panelMembers];
      newList.push(panelMember);

      setPanelMembers(newList);
    } else {
      setSuccess(false);
      setMsg(`Panel cannot contain more than ${CONSTANT.PANEL_MEMBER_LIMIT} people`);
      setShowMsg(true);
    }
  };

  const handleSubmit = async () => {
    try{
      setSubmitDisabled(true);
      // if() //apply least panel members limit 
      const ids = panelMembers.map(panelMember => panelMember._id)
      const res = await axiosAdmin({
        method: "POST",
        url: "/panel",
        data: {
          panel: {
            name: panelName,
            members: ids,
          }
        }
      });

      if(res.status === 200){
        setSuccess(true);
        getListForPanel();
        setPanelMembers([]);
        setPanelName('');
      }else{
        setSuccess(false);
      }
      setMsg(res.data.message);
      setShowMsg(true);
      setSubmitDisabled(false);
    }catch(error: any){
      setSuccess(false);
      setMsg(error?.response?.data?.message);
      setShowMsg(true);
      setSubmitDisabled(false);
      console.log(error)
    }
  }

  const isSelected = (panelMember: PanelListModel): boolean => {
    const index = panelMembers.findIndex(
      (panelMem) => panelMem._id == panelMember._id
    );

    if (index === -1) {
      return false;
    }

    return true;
  };

  const getListForPanel = async () => {
    const res = await axiosAdmin({
      method: "GET",
      url: "/listforpanel",
    });

    if (res.status === 200) {
      setPanelList(res.data.users);
    }
  };

  useEffect(() => {
    getListForPanel();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form className="form-horizontal">
              <div className="form-group col-3 mb-3">
                <label>Panel Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={panelName}
                  onChange={(event) => setPanelName(event.target.value)}
                  placeholder="Panel name..."
                ></input>
              </div>
              {panelList?.map((panelPerson: PanelListModel, index: number) => (
                <div className="col-6" key={panelPerson._id}>
                  {panelPerson.role === UserRoles.ADVISOR && (
                    <Form.Check
                      inline
                      label={
                        "Advisor: " +
                        panelPerson.name +
                        " ~" +
                        panelPerson.department
                      }
                      name="group1"
                      type="checkbox"
                      id={panelPerson._id}
                      onChange={() => handlePanelMemberSelection(panelPerson)}
                      checked={isSelected(panelPerson)}
                    />
                  )}
                  {panelPerson.role === UserRoles.PANEL && (
                    <Form.Check
                      inline
                      label={
                        "Staff: " +
                        panelPerson.name +
                        " ~" +
                        (panelPerson.department ? panelPerson.department : "Unknown")
                      }
                      name="group1"
                      type="checkbox"
                      id={index.toString()}
                      onChange={() => handlePanelMemberSelection(panelPerson)}
                      checked={isSelected(panelPerson)}
                    />
                  )}
                  <br />
                  <br />
                </div>
              ))}
              {!submitDisabled && <a onClick={handleSubmit} className='btn btn-primary'>Submit</a>}
            </form>
          </div>
        </div>
      </div>

      <div
        className="toast-container position-absolute"
        style={{ top: "70px", right: "30px" }}
      >
        <Toast
          onClose={() => setShowMsg(false)}
          show={showMsg}
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

          <Toast.Body>{msg}</Toast.Body>
        </Toast>
      </div>
    </div>
  );
};

export { ListForPanel };
