import React, { useReducer, useContext } from 'react';
import reducer from './reducer';
import axios from 'axios';
import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
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
    showSidebar: false,
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

    const setupUser = async ({ currentUser, endPoint, alertText }) => {
        dispatch({ type: SETUP_USER_BEGIN });
        try {
            const response = await axios.post(
                `/api/v1/auth/${endPoint}`,
                currentUser
            );

            const { user, token, skill } = response.data;
            dispatch({
                type: SETUP_USER_SUCCESS,
                payload: { user, token, skill, alertText },
            });

            addUserToLocalStorage({ user, token, skill });
        } catch (error) {
            dispatch({
                type: SETUP_USER_ERROR,
                payload: error.response.data.msg,
            });
        }
        clearAlert();
    };

    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR });
    };

    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER });
        removeUserFromLocalStorage();
    };

    const updateUser = async (currentUser) => {
        console.log(currentUser);
    };

    const valuesToShare = {
        ...state,
        displayAlert,
        clearAlert,
        addUserToLocalStorage,
        removeUserFromLocalStorage,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
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
