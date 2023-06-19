import { useState } from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from '../context/appContext';

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
};

function Register() {
    const [values, setValues] = useState(initialState);
    const [toggle, setToggle] = useState(false);

    // global state and useNavigate
    const { isLoading } = useAppContext();

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(event.target);
    };

    const handleToggle = () => {
        setToggle(!toggle);
    };

    let content;

    if (toggle) {
        content = (
            <div class="container" id="container">
                <div class="form-container  sign-in-container">
                    <form onSubmit={handleSubmit}>
                        <div class="header">Log In</div>
                        <div class="social__media__container">
                            <a
                                href="https://github.com/Sid-bit28"
                                class="social google"
                            >
                                <i class="fa-brands fa-instagram"></i>
                            </a>
                            <a
                                href="https://github.com/Sid-bit28"
                                target="_blank"
                                class="social instagram"
                            >
                                <i class="fa-brands fa-instagram"></i>
                            </a>
                        </div>
                        <div class="button-input-group">
                            <div class="group input-group">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={values.email}
                                    name="email"
                                    onChange={handleChange}
                                />
                            </div>
                            <div class="group input-group">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={values.password}
                                    name="password"
                                    onChange={handleChange}
                                />
                            </div>
                            <div class="alert-text signup__alert">
                                <span class="help__text">
                                    At least 6 character.
                                </span>
                            </div>
                            <div class="group button-group">
                                <button
                                    class="signin-btn"
                                    onclick="return false;"
                                >
                                    Sign in
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-right">
                            <h1>Welcome Back!</h1>
                            <p>Please login your personal info.</p>

                            <div class="group button-group">
                                <button
                                    class="ghost"
                                    id="signUp"
                                    onClick={handleToggle}
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
            <div class="container" id="container">
                <div class="form-container  sign-up-container">
                    <form onSubmit={handleSubmit}>
                        <div class="header">Sign Up</div>
                        <div class="social__media__container">
                            <a
                                href="https://github.com/Sid-bit28"
                                class="social google"
                            >
                                <i class="fa-brands fa-google"></i>
                            </a>
                            <a
                                href="https://github.com/Sid-bit28"
                                target="_blank"
                                class="social instagram"
                            >
                                <i class="fa-brands fa-instagram"></i>
                            </a>
                        </div>
                        <div class="button-input-group">
                            <div class="group input-group">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    value={values.name}
                                    name="name"
                                    onChange={handleChange}
                                />
                            </div>
                            <div class="group input-group">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={values.email}
                                    name="email"
                                    onChange={handleChange}
                                />
                            </div>
                            <div class="group input-group">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={values.password}
                                    name="password"
                                    onChange={handleChange}
                                />
                            </div>
                            <div class="alert-text signup__alert">
                                <span class="help__text">
                                    At least 6 character.
                                </span>
                            </div>
                            <div class="group button-group">
                                <button
                                    class="signup-btn"
                                    onclick="return false;"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>
                                Enter your personal details and start your
                                journey with us
                            </p>
                            <div class="group button-group">
                                <button
                                    class="ghost"
                                    id="signIn"
                                    onClick={handleToggle}
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
