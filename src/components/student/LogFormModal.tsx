import React from "react";
import { Modal, Table } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { axiosStudent } from "../../global/axios";

const LogFormModal = (props: any) => {
  const { show, setShow, id } = props;
  const [logformEntries, setLogformEntries] = React.useState<any>();

  const getRequestDetails = async () => {
    try {
      const res = await axiosStudent({
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

  const formatDate = (date: any) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  React.useEffect(() => {
    getRequestDetails();
  }, []);

  return (
    <Modal show={show} onHide={() => setShow(false)} size="xl" centered={true}>
      <Modal.Header closeButton>
        <Modal.Title>Log form</Modal.Title>
      </Modal.Header>

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
              </tr>
            ))}
        </tbody>
      </Table>
    </Modal>
  );
};

export default LogFormModal;
