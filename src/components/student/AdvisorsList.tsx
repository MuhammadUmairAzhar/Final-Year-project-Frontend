import React, { useEffect, useState } from "react";
import { axiosStudent } from "../../global/axios";
import { AdvisorModel } from "../models/advisor.model";
import { AdvisorRequestFormModal } from "./AdvisorRequestFormModal";

const AdvisorsList = () => {
    const [selectedAdvisor, setSelectedAdvisor] = useState<AdvisorModel>();
    const [advisors, setAdvisors] = useState<AdvisorModel[]>();
    const [show, setShow] = useState(false);

    const handleAdvisorSelection = (advisor: AdvisorModel) => {
        setSelectedAdvisor(advisor);
        setShow(true);
    }

    const getAdvisorsList = async () => {
        const res = await axiosStudent({
          method: 'GET',
          url: '/advisors'
        })
    
        if(res.status === 200){
          setAdvisors(res.data.advisors);
        }
      }

    useEffect(() => {
        getAdvisorsList()
    }, []);

    return (
        <div>
            <div className="container"> 
                <div className="list-group col-6">
                    {advisors?.map((advisor: AdvisorModel, index: number) => (
                        <a 
                            className={ advisor._id === selectedAdvisor?._id ? "list-group-item list-group-item-action mb-1 active" : "list-group-item list-group-item-action mb-1" } 
                            onClick={() => handleAdvisorSelection(advisor)} key={index}>
                            Name: {advisor.name} ~{advisor.department} 
                        </a>
                    ))}
                </div>
            </div>
            <AdvisorRequestFormModal show={show} setShow={setShow} advisor={selectedAdvisor} />
        </div>
    )
}

export { AdvisorsList };