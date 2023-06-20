import { useState, useEffect } from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: false,
};

function Register() {
    const [values, setValues] = useState(initialState);
    const [toggle, setToggle] = useState(false);

    // global state and useNavigate
    const { user, isLoading, setupUser } = useAppContext();
    const navigate = useNavigate();

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const { name, email, password, isMember } = values;
        const currentUser = { name, email, password };

        if (isMember) {
            setupUser({
                currentUser,
                endPoint: 'login',
                alertText: 'Login Successful',
            });
        } else {
            setupUser({
                currentUser,
                endPoint: 'register',
                alertText: 'Registration Successful',
            });
        }
    };

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    }, [user, navigate]);

    const handleToggle = () => {
        setToggle(!toggle);
        setValues({ ...values, isMember: !values.isMember });
    };

    let content;

    if (toggle) {
        content = (
            <div className="container" id="container">
                <div className="form-container  sign-in-container">
                    <form onSubmit={handleSubmit}>
                        <div className="header">Log In</div>
                        <div className="social__media__container">
                            <a
                                href="https://github.com/Sid-bit28"
                                className="social google"
                            ></a>
                            <a
                                href="https://github.com/Sid-bit28"
                                target="_blank"
                                className="social instagram"
                            ></a>
                        </div>
                        <div className="button-input-group">
                            <div className="group input-group">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={values.email}
                                    name="email"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="group input-group">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={values.password}
                                    name="password"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="alert-text signup__alert">
                                <span className="help__text">
                                    At least 6 character.
                                </span>
                            </div>
                            <div className="group button-group">
                                <button
                                    className="signin-btn"
                                    disabled={isLoading}
                                >
                                    Sign in
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
                            <h1>Welcome Back!</h1>
                            <p>Please login your personal info.</p>

                            <div className="group button-group">
                                <button
                                    className="ghost"
                                    id="signUp"
                                    onClick={handleToggle}
                                    disabled={isLoading}
                                >
                                    Sign up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        content = (
            <div className="container" id="container">
                <div className="form-container  sign-up-container">
                    <form onSubmit={handleSubmit}>
                        <div className="header">Sign Up</div>
                        <div className="social__media__container">
                            <a
                                href="https://github.com/Sid-bit28"
                                className="social google"
                            ></a>
                            <a
                                href="https://github.com/Sid-bit28"
                                target="_blank"
                                className="social instagram"
                            ></a>
                        </div>
                        <div className="button-input-group">
                            <div className="group input-group">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    value={values.name}
                                    name="name"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="group input-group">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={values.email}
                                    name="email"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="group input-group">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={values.password}
                                    name="password"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="alert-text signup__alert">
                                <span className="help__text">
                                    At least 6 character.
                                </span>
                            </div>
                            <div className="group button-group">
                                <button
                                    className="signup-btn"
                                    disabled={isLoading}
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>
                                Enter your personal details and start your
                                journey with us
                            </p>
                            <div className="group button-group">
                                <button
                                    className="ghost"
                                    id="signIn"
                                    onClick={handleToggle}
                                    disabled={isLoading}
                                >
                                    Log in
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <Wrapper>{content}</Wrapper>;
}

export default Register;
