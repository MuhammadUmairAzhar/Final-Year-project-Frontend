import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            <div className="container">
                <div className="list-group col-6">
                    <Link className="list-group-item list-group-item-action bg-dark text-light" to="/panel/panel">
                        Assigned Panel
                    </Link>
                </div>
            </div>
        </div>
    );
}

export { Dashboard };