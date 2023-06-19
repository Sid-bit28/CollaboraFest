import React, { useReducer, useContext } from 'react';
import reducer from './reducer';
import axios from 'axios';
import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
} from './actions';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userSkill = localStorage.getItem('skill');

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token,
    userSkill: userSkill || '',
    eventSkill: userSkill || '',
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT });
    };

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT });
        }, 3000);
    };

    const addUserToLocalStorage = ({ user, token, skill }) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        localStorage.setItem('skill', skill);
    };

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('skill');
    };

    const registerUser = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN });
        try {
            const response = await axios.post(
                '/api/v1/auth/register',
                currentUser
            );
            // console.log(response);
            const { user, token, skill } = response.data;
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: { user, token, skill },
            });
            addUserToLocalStorage({ user, token, skill });
        } catch (error) {
            // console.log(error.response);
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: error.response.data.msg,
            });
        }
        clearAlert();
    };

    const valuesToShare = {
        ...state,
        displayAlert,
        clearAlert,
        registerUser,
        addUserToLocalStorage,
        removeUserFromLocalStorage,
    };

    return (
        <AppContext.Provider value={valuesToShare}>
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => {
    return useContext(AppContext);
};

export { initialState, AppProvider, useAppContext };
