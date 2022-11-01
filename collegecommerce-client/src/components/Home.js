import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { getUniversitiesByName } from "../services/universitiesService";
import LocationContext from "../contexts/LocationContext";

function Home() {

    const [location, setLocation] = useState();
    const [locations, setLocations] = useState();

    const myLocation = useContext(LocationContext);

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

    function handleLocationSelect(evt) {
        myLocation.setMyLocation(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        getUniversitiesByName(location)
        .then((loc) => setLocations(loc))
        .catch(console.log("Error"));
    }

    return (
        <div className="bg-secondary">
            <div className="container pb-4" style={{backgroundImage: `url("https://images.unsplash.com/photo-1523473125050-1c9405e8b208?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvbGxlZ2UlMjBzdHVkZW50cyUyMHNhbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60")`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        minHeight: "800px"}}>
            <h1 className="text-white py-4 text-center">College Commerce</h1>
            <div className="container py-4 w-50">
                <div className="p-4 mb-6 bg-light rounded-3 border border-primary">
                <h2 className="text-center">Search by University</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-2">
                    <label htmlFor="username" className="form-label">University name:</label>
                    <input
                        type="text"
                        onChange={handleChange}
                        id="location"
                        className="form-control"
                        autoComplete="on"
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
            </div>
            </div>
            </div>
            <div className="w-100 p-4 bg-light">
                <div className="d-flex justify-content-evenly mt-4">
                    <div className="card bg-primary m-2 p-4">
                        <div className="card-body">
                            <Link to="/allitemlistings" className="stretched-link text-reset">Buy Items</Link>
                        </div>
                    </div>
                    <div className="card bg-primary m-2 p-4">
                        <div className="card-body">
                            <Link to="/items" className="stretched-link text-reset">Sell Items</Link>
                        </div>
                    </div>
                    <div className="card bg-primary m-2 p-4">
                        <div className="card-body">
                            <Link to="/allservicelistings" className="stretched-link text-reset">Buy Services</Link>
                        </div>
                    </div>
                    <div className="card bg-primary m-2 p-4">
                        <div className="card-body">
                            <Link to="/services" className="stretched-link text-reset">Sell Services</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Home;