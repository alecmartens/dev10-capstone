import { Link } from "react-router-dom";
import LocationSearch from "./LocationSearch";
import background from "../images/background.jpg";

function Home() {
    return (
        <div className="bg-light">
            <div className="container pb-4 border border-primary" style={{backgroundImage: `url(${background})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        minHeight: "800px"
                        }}>
                <div className="container bg-light py-2 col-5 opacity-75 rounded my-4">
                    <div className="d-flex justify-content-center my-4">
                        <img src={require("../images/college-commerce-title.png")} className="img-fluid" alt="logo" />
                    </div>
                </div>
                <div className="container py-4 w-50">
                    <div className="p-4 mb-6 bg-light rounded-3 border border-primary">
                    <h2 className="text-center">Search by University</h2>
                    <LocationSearch />
                </div>
            </div>
        </div>
            <div className="w-100 p-4 bg-secondary border-top border-primary">
                <div className="container d-flex justify-content-evenly mt-4">
                    <div className="card bg-primary text-white col-2 p-2">
                        <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c29mYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                            className="card-img-top img-thumbnail" style={{height: "150px"}} alt="sofa"></img>
                        <div className="card-body">
                        <h3 class="card-text text-center mt-2">Buy Items</h3>
                            <Link to="/allitemlistings" className="stretched-link text-reset"></Link>
                        </div>
                    </div>
                    <div className="card bg-primary text-white col-2 p-2">
                    <img src="https://images.unsplash.com/photo-1529590003495-b2646e2718bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3RhY2slMjBvZiUyMGJvb2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                            className="card-img-top img-thumbnail" style={{height: "150px"}} alt="Pile of books"></img>
                        <div className="card-body">
                        <h3 class="card-text text-center mt-2">Sell Items</h3>
                            <Link to="/user/:username/items" className="stretched-link text-reset"></Link>
                        </div>
                    </div>
                    <div className="card bg-primary text-white col-2 p-2">
                    <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                            className="card-img-top img-thumbnail" style={{height: "150px"}} alt="People"></img>
                        <div className="card-body ">
                        <h3 class="card-text text-center mt-2">Buy Services</h3>
                            <Link to="/allservicelistings" className="stretched-link text-reset"></Link>
                        </div>
                    </div>
                    <div className="card bg-primary text-white col-2 p-2">
                    <img src="https://plus.unsplash.com/premium_photo-1658527039557-88231e628899?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHBlb3BsZSUyMHdvcmtpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                            className="card-img-top img-thumbnail" style={{height: "150px"}} alt="Person"></img>
                        <div className="card-body">
                        <h3 class="card-text text-center mt-2">Sell Services</h3>
                            <Link to="/user/:username/services" className="stretched-link text-reset"></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Home;