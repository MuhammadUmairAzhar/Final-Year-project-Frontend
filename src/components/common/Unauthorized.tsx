import React from "react";
import Unauthorized from "../../assets/Unauthorized.jpg";

const UnauthorizedAccessDenied = () => {
  return (
    <div className="container">
        <div className="d-flex justify-content-center">
          {/* <div className="col-4">
            <h4 className="text-center text-danger">
              <strong>Unauthorized Access Denied!</strong>
            </h4>
            {Unauthorized && (
              <img
                src={Unauthorized}
                alt="unauthorized"
                className="img-thumbnail rounded-circle"
              />
            )}
          </div> */}
        </div>
        <a
          hidden
          href="https://www.freepik.com/free-vector/general-data-security-personal-information-protection-database-access-control-cyber-privacy-synchronized-gadgets-cross-platform-devices-regulation-vector-isolated-concept-metaphor-illustration_12083584.htm#query=unauthorized&position=1&from_view=keyword"
        >
          Image by vectorjuice on Freepik
        </a>
    </div>
  );
};

export { UnauthorizedAccessDenied };
