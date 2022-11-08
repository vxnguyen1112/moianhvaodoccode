/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FacebookLoginButton, InstagramLoginButton } from 'react-social-login-buttons';

const SignInForm = () => {
  const history = useHistory();
  const [state,setState]=useState({ email:"", password:"" });
  const handleChange= (event) =>  {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;
    setState(previousState => {
      return { ...previousState, [name]: value }
    });
  }
  const handleSubmit= (event) => {
    event.preventDefault();
 
    console.log("The form was submitted with the following data:");
    console.log(state);
    history.push("/project");
  }
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="formCenter">
      <form className="formFields" onSubmit={handleSubmit}>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="email">
            E-Mail Address
          </label>
          <input
            type="email"
            id="email"
            className="formFieldInput"
            placeholder="Enter your email"
            name="email"
            value={state.email}
            onChange={handleChange}
          />
        </div>

        <div className="formField">
          <label className="formFieldLabel" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="formFieldInput"
            placeholder="Enter your password"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
        </div>

        <div className="formField">
          <button className="formFieldButton">Sign In</button>{' '}
          <Link to="/login/sign-in" className="formFieldLink">
            Create an account
          </Link>
        </div>

        <div className="socialMediaButtons">
          <div className="facebookButton">
            <FacebookLoginButton onClick={() => alert('Hello')} />
          </div>

          <div className="instagramButton">
            <InstagramLoginButton onClick={() => alert('Hello')} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
