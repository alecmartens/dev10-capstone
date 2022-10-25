import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { findAll } from "../services/serviceServices";
import Service from "./Service";

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
        <table>
            <thead>
                <tr>
                    <th>serviceId</th>
                    <th>name</th>
                    <th>description</th>
                    <th>pricePerHour</th>
                    <th>category</th>
                </tr>
            </thead>
            <tbody>
                {services.map(s =><Service key={s.serviceId} service={s} handleEdit={handleEdit} handleDelete={handleDelete} />)}
            </tbody>
        </table>
        </>
    ); 

}
export default ServiceGrid; 