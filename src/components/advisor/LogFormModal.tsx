import React from "react";
import axios from "axios";
import { Button, Modal, Table } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { axiosAdvisor } from "../../global/axios";

const LogFormModal = (props: any) => {
  const { show, setShow, id } = props;
  const [taskAssigned, setTaskAssigned] = React.useState("");
  const [logformEntries, setLogformEntries] = React.useState<any>();
  const [triggerFetch, setTriggerFetch] = React.useState(false);

  const getRequestDetails = async () => {
    try {
      const res = await axiosAdvisor({
        method: "GET",
        url: `/contract/get-tasks/${id}`,
      });

      if (res.status === 200) {
        console.log(res.data.logform);
        setLogformEntries(res.data.logform);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signTask = async (logformId: string) => {
    try {
      const res = await axiosAdvisor({
        method: "GET",
        url: `/contract/sign-task/${logformId}`,
      });

      if (res.status === 201) {
        setTriggerFetch((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (logformId: string) => {
    try {
      const res = await axiosAdvisor({
        method: "GET",
        url: `/contract/delete-task/${logformId}`,
      });

      if (res.status === 201) {
        setTriggerFetch((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    axiosAdvisor({
      method: "POST",
      url: "/contract/assign-task",
      data: {
        logformEntry: { taskAssigned: taskAssigned },
        contract: {
          id: id,
        },
      },
    })
      .then((res) => {
        setTaskAssigned("");
        setTriggerFetch((prev) => !prev);
      })
      .catch((err) => alert("Something went wrong."));
  };

  const formatDate = (date: any) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  React.useEffect(() => {
    getRequestDetails();
  }, [triggerFetch]);

  return (
    <Modal show={show} onHide={() => setShow(false)} size="xl" centered={true}>
      <Modal.Header closeButton>
        <Modal.Title>Log form</Modal.Title>
      </Modal.Header>

      <form
        style={{ marginLeft: 100, marginRight: 100, marginBottom: 50 }}
        onSubmit={handleSubmit}
      >
        <label>Assign a task</label>
        <span> : </span>
        <input
          type="text"
          value={taskAssigned}
          onChange={(e) => setTaskAssigned(e.target.value)}
        />
        <button>Submit</button>
      </form>

      {!logformEntries && (
        <Spinner
          animation="border"
          role="status"
          variant="primary"
          className=".align-items-center"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      <Table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Date</th>
            <th>Signed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {logformEntries &&
            logformEntries.length > 0 &&
            logformEntries.map((entry: any, index: number) => (
              <tr key={index}>
                <td>{entry?.taskAssigned}</td>
                <td>{formatDate(entry?.date)}</td>
                <td>{entry?.advisorSigned ? "Yes" : "No"}</td>
                <td>
                  <Button
                    onClick={() => {
                      signTask(entry._id);
                    }}
                    variant={entry.advisorSigned ? "warning" : "primary"}
                  >
                    {entry.advisorSigned ? "Unsign Task" : "Sign Task"}
                  </Button>
                  <span> </span>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteTask(entry._id);
                    }}
                  >
                    Delete Task
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Modal>
  );
};

export default LogFormModal;
