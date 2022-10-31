import { useContext, useState } from "react";
import { useHistory} from "react-router";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { authenticate } from "../services/authService";

 

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [hasErrors, setHasErrors] = useState(false);

    const {login} = useContext(AuthContext);
    const history = useHistory();

   
  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
        username,
        password
    }
    authenticate(user)
    .then(token => {
        login(token);
        history.push("/");
    })
    .catch(() => setHasErrors(true))
  };

    return (
        <div className="container py-4 w-50">
            <div className="p-4 mb-6 bg-light rounded-3 border border-primary">
            <h2 className="text-center">Login</h2>
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
                <div className="form-group">
                <label htmlFor="password" className="form-label">Password:</label>
                <input
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                    id="password"
                    className="form-control"
                />
                </div>
                {hasErrors && <div className="alert alert-danger mt-3">
                    Invalid Credentials
                </div>}
                <div className="d-flex flex-column align-items-center my-4">
                <button type="submit" className="btn btn-primary m-2 btn-block w-25 mb-4">Login</button>
                <Link to="/register">Create Account</Link>
                </div>
            </form>
          </div>
        </div>
      );
}

export default Login;