import { useContext, useState } from "react";
import { useHistory} from "react-router";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { authenticate } from "../services/authService";
import { createAccount } from "../services/userService";

function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [hasErrors, setHasErrors] = useState(false);
    const [errors, setErrors] = useState([]);

    const {login} = useContext(AuthContext);
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = {
            username,
            password,
            email,
            roles: ["USER"]
        }

        createAccount(user)
            .then((u) => {
                const authUser = {
                    username: u.username,
                    password
                }
                authenticate(authUser)
                .then(token => {
                login(token);
                history.push("/");
            })
            .catch(() => setHasErrors(true))
        })
        .catch((errs) => {
            if (errs) {
                setHasErrors(true);
                setErrors(errs);
            } else {
                history.push("/error")
            }
        });
      };

    return (
        <div className="container py-4 w-50">
            <div className="p-4 mb-6 bg-light rounded-3 border border-primary">
            <h2 className="text-center">Create an Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                <label htmlFor="username" className="form-label">Username:</label>
                <input
                    type="text"
                    onChange={(event) => setUsername(event.target.value)}
                    id="username"
                    className="form-control"
                />
                </div>
                <div className="form-group mb-2">
                <label htmlFor="password" className="form-label">Password:</label>
                <input
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                    id="password"
                    className="form-control"
                />
                </div>
                <div className="form-group">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                    type="email"
                    onChange={(event) => setEmail(event.target.value)}
                    id="email"
                    className="form-control"
                />
                </div>
                {hasErrors && <div className="alert alert-danger mt-3">
                    Invalid Credentials
                    <ul>
                        {errors.map(err => <li key={err}>{err}</li>)}
                    </ul>
                </div>}
                <div className="d-flex flex-column align-items-center my-4">
                    <button type="submit" className="btn btn-primary m-2 btn-block w-25 mb-4">Register</button>
                    <Link to="/login">Cancel</Link>
                </div>
            </form>
          </div>
        </div>
      );
}

export default Register;