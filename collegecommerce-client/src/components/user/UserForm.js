import { useContext, useEffect, useState } from "react";
import { useHistory} from "react-router";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { findByUserName, update } from "../../services/userService";


function UserForm() {

    const [user, setUser] = useState({
        userId: 0,
        username: "",
        password: "",
        email: "",
        imageUrl: ""
    });

    const [errors, setErrors] = useState([]);

    const auth = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        findByUserName(auth.user.username)
        .then((user) => setUser(user))
        .catch(() => history.pushState("/error"))
    }, [])

    const handleChange = function (evt) {
        let nextUser = { ...user };
        nextUser[evt.target.id] = evt.target.value;
        setUser(nextUser);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newUser = {
            userId: user.userId,
            username: auth.user.username,
            password: auth.user.password,
            email: user.email,
            imageUrl: user.imageUrl,
            roles: ["USER"]
        }

        update(newUser)
        .then(() => history.push(`/user/${user.username}`))
        .catch((errors) => {
            if (errors) {
            setErrors(errors);
        } else {
            history.push("/error")
        }})

      };

    return (
        <div className="container py-4 w-50">
            <div className="p-4 mb-6 bg-light rounded-3 border border-primary">
            <h2 className="text-center">Edit My Account</h2>
            <form onSubmit={handleSubmit}>
                {/* <div className="form-group mb-2">
                <label htmlFor="username" className="form-label">Username:</label>
                <input
                    type="text"
                    onChange={handleChange}
                    id="username"
                    className="form-control"
                    value={user.username}
                />
                </div>
                <div className="form-group mb-2">
                <label htmlFor="password" className="form-label">Password:</label>
                <input
                    type="text"
                    onChange={handleChange}
                    id="password"
                    className="form-control"
                />
                </div> */}
                <div className="form-group mb-2">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                    type="email"
                    onChange={handleChange}
                    id="email"
                    className="form-control"
                    value={user.email}
                />
                </div>
                <div className="form-group">
                <label htmlFor="imageUrl" className="form-label">Profile Picture URL:</label>
                <input
                    type="imageUrl"
                    onChange={handleChange}
                    id="imageUrl"
                    className="form-control"
                    value={user.imageUrl}
                />
                </div>
                {errors.length !== 0 && <div className="alert alert-danger mt-3">
                    Invalid Credentials
                    <ul>
                        {errors.map(err => <li key={err}>{err}</li>)}
                    </ul>
                </div>}
                <div className="d-flex flex-column align-items-center my-4">
                    <button type="submit" className="btn btn-primary m-2 btn-block w-25 mb-4">Submit</button>
                    <Link to={`/user/${user.username}`}>Cancel</Link>
                </div>
            </form>
          </div>
        </div>
      );
}

export default UserForm;