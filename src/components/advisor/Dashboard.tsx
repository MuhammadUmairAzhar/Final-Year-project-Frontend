import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            <div className="container">
                <div className="list-group col-6">
                    <Link className="list-group-item list-group-item-action bg-dark text-light" to="/advisor/requests/0">
                        Request Pending
                    </Link>
                    <Link className="list-group-item list-group-item-action bg-dark text-light" to="/advisor/requests/1">
                        Request Accepted
                    </Link>
                    <Link className="list-group-item list-group-item-action bg-dark text-light" to="/advisor/requests/-1">
                        Request Reject
                    </Link>
                    <Link className="list-group-item list-group-item-action bg-dark text-light" to="/advisor/panel">
                        Assigned Panel
                    </Link>
                </div>
            </div>
        </div>
    );
}

export { Dashboard };