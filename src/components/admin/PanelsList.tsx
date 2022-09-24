import React, { useEffect, useState } from "react";
import { axiosAdmin } from "../../global/axios";
import { PanelModel } from "../models/panel.model";
import { PanelDetailsModal } from "./PanelDetailsModal";

const PanelsList = () => {
  const [selectedPanel, setSelectedPanel] = useState<PanelModel>();
  const [panels, setPanels] = useState<PanelModel[]>();
  const [showPanelDetailsModal, setShowPanelDetailsModal] = useState(false);

  const handleAdvisorSelection = (panel: PanelModel) => {
    setSelectedPanel(panel);
    setShowPanelDetailsModal(true);
  };

  const getPanelsList = async () => {
    const res = await axiosAdmin({
      method: "GET",
      url: "/panels",
    });

    if (res.status === 200) {
      setPanels(res.data.panels);
    }
  };

  useEffect(() => {
    getPanelsList();
  }, []);

  if (showPanelDetailsModal) {
    return (
      <PanelDetailsModal
        show={showPanelDetailsModal}
        setShow={setShowPanelDetailsModal}
        id={selectedPanel?._id}
      />
    );
  }

  return (
    <div>
      <div className="container">
        <div className="list-group col-6">
          {panels?.map((panel: PanelModel, index: number) => (
            <a
              className={
                panel._id === selectedPanel?._id
                  ? "list-group-item list-group-item-action mb-1 active"
                  : "list-group-item list-group-item-action mb-1"
              }
              onClick={() => handleAdvisorSelection(panel)}
              key={panel._id}
            >
              Name: {panel.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export { PanelsList };
