import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            <div className="container">
                <div className="list-group col-6">
                    <Link className="list-group-item list-group-item-action bg-dark text-light" to="/student/advisors">
                        Advisors
                    </Link>
                    <Link className="list-group-item list-group-item-action bg-dark text-light" to="/student/requests/0">
                        Request Pending
                    </Link>
                    <Link className="list-group-item list-group-item-action bg-dark text-light" to="/student/requests/1">
                        Request Accepted
                    </Link>
                    <Link className="list-group-item list-group-item-action bg-dark text-light" to="/student/requests/-1">
                        Request Reject
                    </Link>
                </div>
            </div>
        </div>
    );
}

export { Dashboard };