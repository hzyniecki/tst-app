import { useState } from "react";
import "./UserLogin.css"

const defaultFormValues = {
    username: '',
    password: '',
    confirmPassword: '',
};

export default function UserLogin() {

    const [formValues, setFormValues] = useState(defaultFormValues);
    const [passwordAttempt, setConfirmAttempt] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newFormValues = {
            ...formValues,
            [name]: value,
        };
        setFormValues(newFormValues);
        validateNewPasswordInput(name, newFormValues);
    };

    const validateNewPasswordInput = (name, newFormValues) => {
        if (name !== 'password' && name !== 'confirmPassword') { return; }
        setConfirmAttempt(newFormValues.confirmPassword !== '');
        setPasswordMatch(newFormValues.password === newFormValues.confirmPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (passwordMatch) {
            // Send formValues to register api
            alert("Form Values Submitted");
            setFormValues(defaultFormValues);
            setConfirmAttempt(false);
            setPasswordMatch(false);
            // Redirect to homepage/profile/elsewhere
        }
    }

    return (
        <div className="form-container">
            <div className="new-account-title">Create New Account</div>
            <form onSubmit={handleSubmit}>

                <div className="input-label-container">
                    <label>Username</label>
                </div>
                <div>
                    <input type="text"
                        name="username"
                        id="username"
                        required
                        autoComplete="username"
                        placeholder="youremail@gmail.com"
                        minLength={5}
                        maxLength={15}
                        value={formValues.username}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-label-container">
                    <label>Password</label>
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        autoComplete="new-password"
                        placeholder="Create a password"
                        minLength={8}
                        maxLength={100}
                        value={formValues.password}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-label-container">
                    <label>Confirm Password</label>
                </div>
                <div>
                    <input type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        required
                        autoComplete="new-password"
                        placeholder="Re-enter password"
                        minLength={8}
                        maxLength={100}
                        value={formValues.confirmPassword}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="submit-btn-container">
                    {
                        passwordAttempt &&
                        (passwordMatch ?
                            <span className="success-message"> <img src="./assets/success.svg" alt="sucessCheckmark" className="success-svg" /> Passwords match </span> :
                            <span className="error-message"> <img src="./assets/error.svg" alt="errorX" className="error-svg" /> Passwords do not match </span>)
                    }
                    <button type="submit" className="submit-btn" disabled={formValues.username === '' || !passwordMatch}> Sign Up </button>
                </div>
            </form>
        </div>
    );
}