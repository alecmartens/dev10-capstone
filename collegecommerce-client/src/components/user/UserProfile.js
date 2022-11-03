import { useEffect } from "react";
import { useState, useContext } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { findByUserName } from "../../services/userService";
import "../../styles/userProfile.css";

function UserProfile() {

    const [user, setUser] = useState("");
    const history = useHistory();
    const auth = useContext(AuthContext);

    useEffect(() => {
        findByUserName(auth.user.username)
            .then((user) => setUser(user))
            .catch(() => history.pushState("/error"))
    }, []);

    return (
        <div>
            <div className="container-lg py-4">
                <div className="p-2 mb-6 bg-light rounded-3 border border-primary">
                    <h2 className="text-center my-4">My Profile</h2>
                    <div className="d-flex justify-content-evenly">
                        <div className="col-lg-3 me-2">
                            <div className="card bg-secondary mb-4">
                                <div className="card-body text-center">
                                    {user.imageUrl ? (
                                        <img src={user.imageUrl}
                                            className="img-fluid img-thumbnail" alt="User Profile" />
                                    ) : (
                                        <i className="bi bi-person-circle"></i>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <p className="mb-0">Username:</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{user.username}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <p className="mb-0">Email:</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{user.email}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="d-flex flex-column">
                        <div className=" text-center mb-2">
                            <Link to={`/user/edit/${user.username}`} className="btn btn-primary w-25">Edit Profile</Link>
                        </div>
                        <div className="text-center m-2">
                        <Link to={`/user/delete/${user.username}`} className="btn btn-danger">Delete Profile</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container list-group text-center my-4 py-4">
                {/* <a href="#" className="list-group-item list-group-item-action">Manage Listings</a> */}
                <a href={`/user/${user.username}/items`} className="list-group-item list-group-item-action bg-light">Manage My Items</a>
                <a href={`/user/${user.username}/services`} className="list-group-item list-group-item-action mb-4 bg-light">Manage My Services</a>
            </div>
        </div>
    );
}

export default UserProfile;