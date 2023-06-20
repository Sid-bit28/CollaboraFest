import styled from 'styled-components';

const Wrapper = styled.main`
    body {
        height: 100vh;
        display: flex;
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

    input:focus {
        border-color: #000;
    }

    .group.button-group {
        width: 70%;
    }

    button {
        width: 100%;
        height: 100%;
        color: #fff;
        background-color: #a4508b;
        background-image: linear-gradient(326deg, #a4508b 0%, #5f0a87 74%);
        cursor: pointer;
    }

    .group button:hover {
        background-color: var(--primary-700);
    }

    .btn-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 1rem;
        align-self: flex-end;
        margin-top: 0.5rem;
        button {
            height: 35px;
        }
    }
    .clear-btn {
        background: var(--grey-500);
    }
    .clear-btn:hover {
        background: var(--black);
    }
`;

export default Wrapper;
