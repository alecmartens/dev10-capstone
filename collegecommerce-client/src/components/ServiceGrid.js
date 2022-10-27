import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { findAll } from "../services/serviceServices";
import Service from "./Service";
import { Table } from "react-bootstrap";
function ServiceGrid({ handleEdit, handleDelete }){
    const [services, setServices] = useState([]);

    const history = useHistory();

    useEffect(() => {
        findAll()
            .then(setServices)
            .catch(() => history.push("/error"));
    }, []);
    
    return (
        <>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>serviceId</th>
                    <th>name</th>
                    <th>description</th>
                    <th>pricePerHour</th>
                    <th>category</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {services.map(s =>
                <Service key={s.serviceId} service={s} handleEdit={handleEdit} handleDelete={handleDelete} />)}
                {services.map(s=>{
                if(!localStorage.getItem("servicehm")){localStorage.setItem("servicehm", JSON.stringify({}));}
                let hm= JSON.parse(localStorage.getItem("servicehm"));  
                hm[s.serviceId] = [s.name, s.description, s.pricePerHour]; 
                localStorage.setItem("servicehm", JSON.stringify(hm)); })}
            </tbody>
        </Table>
        </>
    ); 

}
export default ServiceGrid; 