import { Link } from "react-router-dom";
import LocationSearch from "./LocationSearch";

function Home() {
    // const auth = useContext(AuthContext);
    // const [user, setUser] = useState("");
    // {auth.user ? 
    // useEffect(() => {
    //     findByUserName(auth.user.username)
    //         .then((user) => setUser(user))
    //         .catch(() => history.pushState("/error"))
    // }, [])
    // : <Login />}

    return (
        <div className="bg-secondary">
            <div className="container pb-4" style={{backgroundImage: `url("https://images.unsplash.com/photo-1523473125050-1c9405e8b208?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvbGxlZ2UlMjBzdHVkZW50cyUyMHNhbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60")`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        minHeight: "800px"}}>
                <div className="text-white py-4 text-center mb-3">
                    <h1 className="mb-3">College Commerce</h1>
                    <h4>The marketplace for students</h4>
                </div>
                <div className="container py-4 w-50">
                    <div className="p-4 mb-6 bg-light rounded-3 border border-primary">
                    <h2 className="text-center">Search by University</h2>
                    <LocationSearch />
                </div>
            </div>
        </div>
            <div className="w-100 p-4 bg-light border-top border-secondary">
                <div className="d-flex justify-content-evenly mt-4">
                    <div className="card bg-secondary text-white fw-bold fs-5  m-2 p-4">
                        <div className="card-body">
                            <Link to="/allitemlistings" className="stretched-link text-reset">Buy Items</Link>
                        </div>
                    </div>
                    <div className="card bg-secondary text-white fw-bold fs-5 m-2 p-4">
                        <div className="card-body">
                            {/* CHANGE THIS TO GO TO USER ITEMS */}
                            <Link to="/user/:username/items" className="stretched-link text-reset">Sell Items</Link>
                        </div>
                    </div>
                    <div className="card bg-secondary text-white fw-bold fs-5 m-2 p-4">
                        <div className="card-body ">
                            <Link to="/allservicelistings" className="stretched-link text-reset">Buy Services</Link>
                        </div>
                    </div>
                    <div className="card bg-secondary text-white fw-bold fs-5 m-2 p-4">
                        <div className="card-body">
                            {/* CHANGE THIS TO GO TO USER SERVICES */}
                            <Link to="/user/:username/services" className="stretched-link text-reset">Sell Services</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Home;