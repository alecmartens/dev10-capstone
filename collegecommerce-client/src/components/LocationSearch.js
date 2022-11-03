import { useContext, useState } from "react";
import LocationContext from "../contexts/LocationContext";
import { getUniversitiesByName } from "../services/universitiesService";

function LocationSearch() {

    const [location, setLocation] = useState();
    const [locations, setLocations] = useState();

    const myLocation = useContext(LocationContext);

    function handleLocationSelect(evt) {
        myLocation.setMyLocation(evt.target.value);
    }

    const handleChange = function (evt) {
        let newLocation = { ...location }
        newLocation = evt.target.value;
        setLocation(newLocation);

        if (location && location.length > 0) {
            getUniversitiesByName(location)
                .then((loc) => setLocations(loc))
                .catch((error) => console.log(error));
        } 
    };

    function handleSubmit(evt) {
        evt.preventDefault();

        getUniversitiesByName(location)
        .then((loc) => setLocations(loc))
        .catch(console.log("Error"));
    }

    return (
        <form onSubmit={handleSubmit}>
                <div className="form-group my-4">
                    <input
                        type="text"
                        onChange={handleChange}
                        id="location"
                        className="form-control"
                        autoComplete="on"
                        placeholder="Enter your university name"
                    />
                    </div>
                    {locations && <div className="alert alert-secondary mt-3">
                    <div className="list-group list-group-flush">
                        {locations.filter((loc, index) => index < 10).map(loc => <button type="button" className="list-group-item list-group-item-action" 
                                                                                key={loc.name} value={loc.name} onClick={handleLocationSelect}>{loc.name}</button>)}
                    </div>
                </div>}
                {myLocation.location && location && <div className="alert alert-primary mt-3">
                    {myLocation.location} added as my location.
            </div>}
        </form>
    )
}

export default LocationSearch;