import axios from "axios";
import React, { useState } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function Registerscreen() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const [success, setsuccess] = useState();
  

  async function register() {
    if (password === cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };
      
      try {
        setloading(true);
        const result = (await axios.post('/api/users/register', user)).data;
        setloading(false);
        setsuccess(true);

        setname('');
        setemail('');
        setpassword('');
        setcpassword('');

      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(true);
      }
    }
    else{
        alert('Passwords do not match')
    }
  }
  return (
    <div>
    {loading && (<Loader/>)}
    {error && (<Error message='Something went wrong. Try again'/>)}
    {success && (<Success message='Registration Successful. Login with your credentials to continue'/>)}
      <div className="row  justify-content-center mt-5 py-4 px-2">
        <div className="col-md-8">
          <div className="row  bs br mt-5 py-5 px-5">
            <div className="col-md-12">
              <h3>Register</h3>
              <input
                type="text"
                className="form-control my-3"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />
              <input
                type="email"
                className="form-control my-3"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
              <input
                type="password"
                className="form-control my-3"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
              <input
                type="password"
                className="form-control my-3"
                placeholder="Confirm Password"
                value={cpassword}
                onChange={(e) => {
                  setcpassword(e.target.value);
                }}
              />
              <button className="btn btn-dark" onClick={register}>
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
