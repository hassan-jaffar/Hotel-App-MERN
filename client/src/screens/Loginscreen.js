import axios from "axios";
import React, {useState} from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";

function Loginscreen() {
    const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  async function login() {
    const user = {
        email,
        password
      };
      try {
        setloading(true);
        const result = (await axios.post('/api/users/login', user)).data;
        setloading(false);

        localStorage.setItem('currentUser' , JSON.stringify(result));
        window.location.href='/';

      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(true);
      }
  }
  return (
    <div>
    {loading && (<Loader/>)}
    {error && (<Error message="Invalid Credentials"/>)}
      <div className="row  justify-content-center mt-5 py-5 px-2">
        <div className="col-md-6">
          <div className="row  bs br mt-5 py-5 px-5">
            <div className="col-md-12">
              <h3>Login</h3>
              <input
                type="email"
                className="form-control my-4"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
              <input
                type="password"
                className="form-control my-4"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
              <button className="btn btn-dark" onClick={login}>Continue</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
