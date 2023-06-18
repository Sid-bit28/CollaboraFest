import styled from 'styled-components';

const Wrapper = styled.main`
    body {
        height: 100vh;
        display: flex;
    }

    .container {
        background-color: var(--primary-500);
        position: relative;
        height: 550px;
        border-radius: 1rem;
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
            0 10px 10px rgba(0, 0, 0, 0.22);
        padding: 3rem 0;
        margin-top: 3rem;
    }

    .form-container {
        position: absolute;
        top: 0;
        width: 50%;
        height: 100%;
    }

    form {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        background-color: #fff;
        padding: 0 2.5rem;
        text-align: center;
    }

    .header {
        color: var(--primary-500);
        font-weight: 500;
        text-align: center;
        letter-spacing: 1px;
    }

    .overlay-container {
        position: absolute;
        top: 0;
        left: 50%;
        width: 50%;
        height: 100%;
        overflow: hidden;
        z-index: 100;
    }

    .overlay {
        position: relative;
        top: 0;
        left: -100%;
        width: 200%;
        height: 100%;
        color: #fff;
        background: var(--primary-500);
        background: var(--gradient);
        background-repeat: no-repeat;
        background-size: cover;
    }

    .overlay-panel {
        position: absolute;
        top: 0;
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
        padding: 0 4.4rem;
    }

    .overlay-right {
        right: 0;
        top: 0;
        left: 50%;
    }

    .social__media__container {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 1rem;
        margin-top: 1rem;
    }

    a.social {
        position: relative;
        width: 2.5rem;
        height: 2.5rem;
        background-color: #fff;
        color: #000;
        border-radius: 50%;
        text-align: center;
        border: 1px solid var(--primary-500);
        box-shadow: 1px 0 10px rgba(0, 0, 0, 0.2);
        overflow: hidden;
    }

    a.social::before {
        position: absolute;
        top: 90%;
        left: -110%;
        content: '';
        width: 120%;
        height: 120%;
    }

    a.social:hover::before {
        top: -10%;
        left: -10%;
    }

    a.social.google::before {
        background: #0f9d58;
        background: linear-gradient(
            45deg,
            #1cbf69 0%,
            #15bd8f 25%,
            #12bd9b 50%,
            #0abcc5 75%,
            #04badd 100%
        );
    }

    a.social.instagram::before {
        background: linear-gradient(
            45deg,
            #f09433 0%,
            #e6683c 25%,
            #dc2743 50%,
            #cc2366 75%,
            #bc1888 100%
        );
    }

    /* -----------------The end of Social media Design* ----------------- */

    .button-input-group {
        width: 100%;
        display: grid;
        place-items: center;
        margin-top: 0.5rem;
    }

    .group {
        width: 100%;
        height: 47px;
        margin-bottom: 1.3rem;
    }

    .group input,
    .group button {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        border-radius: 0.4rem;
    }

    .group input {
        border: 2px solid var(--primary-500);
        padding: 0 1.1rem;
    }

    .group input::placeholder {
        opacity: 0.8;
    }

    .alert-text .help__text {
        position: absolute;
        left: 3.2rem;
        font-size: var(--step--2);
        margin-top: -1rem;
        opacity: 0.5;
    }

    .alert-text.signup__alert {
        margin-bottom: 2.2rem;
    }

    input:focus {
        border-color: #000;
    }

    .group.button-group {
        width: 70%;
        background-color: fff;
    }

    button {
        width: 100%;
        height: 100%;
        color: #fff;
        background-color: var(--primary-500);
        cursor: pointer;
    }

    .group button:hover {
        background-color: var(--primary-700);
    }

    .group button.ghost {
        background-color: #fff;
        border: 1px solid #fff;
        margin-top: 1.8rem;
        color: var(--primary-500);
    }
`;

export default Wrapper;
