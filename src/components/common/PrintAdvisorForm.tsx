import React, { useEffect, useState, useRef, RefObject } from "react";
import "../../styling/form.css";
import { ContractModel } from "../models/contract.model";

type PrintAdvisorFormModalProps = {
  contract?: ContractModel,
};

const PrintAdvisorFormModal = React.forwardRef((props: PrintAdvisorFormModalProps, ref: React.Ref<HTMLDivElement>) => {
  const { contract } = props;

  return (
      <div className="form-container" ref={ref}>
        <div className="d-flex justify-content-center mb-4">
          <img src="https://i.imgur.com/lepfdsC.png" />
        </div>
        <h4 className="text-center">Final Year Project</h4>
        <div className="form-horizontal">
          <div className="form-group">
            <label>Advisor Name</label>
            <div className="form-control" >{contract?.advisorForm?.advisorName}</div>
          </div>
          <div className="form-group"></div>

          <div className="form-group">
            <label>Designation</label>
            <div className="form-control">{contract?.advisorForm?.designation}</div>
          </div>
          <div className="form-group">
            <label>Department</label>
            <div className="form-control">{contract?.advisorForm?.department}</div>
          </div>

          <div className="form-group">
            <label>Highest Qualification</label>
            <div className="form-control">{contract?.advisorForm?.qualification}</div>
          </div>
          <div className="form-group">
            <label>Area of Specialization</label>
            <div className="form-control">{contract?.advisorForm?.specialization}</div>
          </div>

          <div className="form-group">
            <label>Contact</label>
            <div className="form-control">{contract?.advisorForm?.contact}</div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <div className="form-control">{contract?.advisorForm?.email}</div>
          </div>
          <div className="form-group">
            <label>Semester</label>
            <div className="form-control">{contract?.advisorForm?.semester}</div>
          </div>
          <div className="form-group">
            <label>Year</label>
            <div className="form-control">{contract?.advisorForm?.year}</div>
          </div>
          <div className="form-group">
            <label>Program</label>
            <div className="form-control">{contract?.advisorForm?.semester}</div>
          </div>
          <div className="form-group">
            <label>Credit Hours</label>
            <div className="form-control">{contract?.advisorForm?.year}</div>
          </div>
          <div className="form-group">
            <label>Compensation Offered Per Project</label>
            <div className="form-control">{contract?.advisorForm?.compensation}</div>
          </div>
          <div className="form-group"></div>
          <div className="form-group">
            <label>Project Title</label>
            <div className="form-control">{contract?.advisorForm?.project?.name}</div>
          </div>
          <div className="form-group"></div>
          <div className="form-group">
            <label>Project Description</label>
            <div className="form-control">{contract?.advisorForm?.project?.description}</div>
          </div>
          <div className="form-group"></div>
          <div className="form-group">
            <label>Hardware Tools Required</label>
            <div className="form-control">{contract?.advisorForm?.tools?.hardware}</div>
          </div>
          <div className="form-group"></div>
          <div className="form-group">
            <label>Software Tools Required</label>
            <div className="form-control">{contract?.advisorForm?.tools?.software}</div>
          </div>
          <div className="form-group"></div>
          <div className="form-group">
            <label>Approximate Cost of the Project</label>
            <div className="form-control">{contract?.advisorForm?.tools?.software}</div>
          </div>
          <div className="form-group"></div>
          <div className="form-group">
            <label>First Student</label>
          </div>
          <div className="form-group"></div>
          <div className="form-group">
            <label>Name</label>
            <div className="form-control">{contract?.advisorForm?.studentOne?.name}</div>
          </div>
          <div className="form-group">
            <label>ID</label>
            <div className="form-control">{contract?.advisorForm?.studentOne?.ID}</div>
          </div>
          <div className="form-group">
            <label>Second Student</label>
          </div>
          <div className="form-group"></div>
          <div className="form-group">
            <label>Name</label>
            <div className="form-control">{contract?.advisorForm?.studentTwo?.name}</div>
          </div>
          <div className="form-group">
            <label>ID</label>
            <div className="form-control">{contract?.advisorForm?.studentTwo?.ID}</div>
          </div>
          <div className="form-group">
            <label>Reference No.</label>
            <div className="form-control">{contract?.advisorForm?.referenceNo}</div>
          </div>
        </div>
      </div>
  );
});

export { PrintAdvisorFormModal };
