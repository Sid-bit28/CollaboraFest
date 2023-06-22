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
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_EVENT_BEGIN,
    CREATE_EVENT_SUCCESS,
    CREATE_EVENT_ERROR,
    GET_EVENTS_BEGIN,
    GET_EVENTS_SUCCESS,
    GET_MY_EVENTS_BEGIN,
    GET_MY_EVENTS_SUCCESS,
    SET_EDIT_EVENT,
    DELETE_EVENT_BEGIN,
    EDIT_EVENT_BEGIN,
    EDIT_EVENT_SUCCESS,
    EDIT_EVENT_ERROR,
    CLEAR_FILTERS,
    CHANGE_PAGE,
    GET_PENDING_MEMBERS_BEGIN,
    GET_PENDING_MEMBERS_SUCCESS,
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
    showSidebar: false,
    isEditing: false,
    editEventId: '',
    title: '',
    description: '',
    intake: 0,
    eventSkill: userSkill || '',
    events: [],
    myEvents: [],
    pendingMembersEvents: [],
    totalEvents: 0,
    totalMyEvents: 0,
    totalPendingMembersEvents: 0,
    numOfPages: 1,
    numOfMyPages: 1,
    numOfPendingMembersPages: 1,
    search: '',
    searchEventSkill: '',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
    page: 1,
    message: '',
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Axios setup 👇
    const authFetch = axios.create({
        baseURL: '/api/v1',
        // headers: { Authorization: `Bearer ${state.token}` },
    });

    // Axios interceptors 👇
    // request
    authFetch.interceptors.request.use(
        (config) => {
            config.headers['Authorization'] = `Bearer ${state.token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // response
    authFetch.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.log(error.response);
            if (error.response.status === 401) {
                console.log('AUTH ERROR');
            }
            return Promise.reject(error);
        }
    );

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
        dispatch({ type: UPDATE_USER_BEGIN });
        try {
            const response = await authFetch.patch(
                '/auth/updateUser',
                currentUser
            );

            console.log(response);

            const { user, skill, token } = response.data;
            addUserToLocalStorage({ user, skill, token });
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: { user, skill, token },
            });
        } catch (error) {
            dispatch({
                type: UPDATE_USER_ERROR,
                payload: { msg: error.response.data.msg },
            });
        }
        clearAlert();
    };

    const handleEventChange = ({ name, value }) => {
        console.log(name, value);
        dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
    };

    const clearValues = () => {
        dispatch({ type: CLEAR_VALUES });
    };

    const createEvent = async () => {
        dispatch({ type: CREATE_EVENT_BEGIN });
        try {
            const { title, description, intake, eventSkill, user } = state;
            await authFetch.post('/events', {
                title,
                description,
                intake,
                eventSkill,
                creator: user.name,
            });
            dispatch({ type: CREATE_EVENT_SUCCESS });
            dispatch({ type: CLEAR_VALUES });
        } catch (error) {
            if (error.response.status === 401) return;
            dispatch({
                type: CREATE_EVENT_ERROR,
                payload: { msg: error.response.data.msg },
            });
        }
    };

    const getEvents = async () => {
        const { page, search, searchEventSkill, sort } = state;
        let url = `/events?page=${page}&sort=${sort}`;
        if (search) {
            url = url + `&search=${search}`;
        }
        if (searchEventSkill) {
            url = url + `&eventSkill=${searchEventSkill}`;
        }
        dispatch({ type: GET_EVENTS_BEGIN });
        try {
            const { data } = await authFetch(url);
            const { events, totalEvents, numOfPages } = data;
            dispatch({
                type: GET_EVENTS_SUCCESS,
                payload: { events, totalEvents, numOfPages },
            });
        } catch (error) {
            logoutUser();
        }
    };

    const getMyEvents = async () => {
        const { page, search, searchEventSkill, sort } = state;
        let url = `/events/my-events?page=${page}&sort=${sort}`;
        if (search) {
            url = url + `&search=${search}`;
        }
        if (searchEventSkill) {
            url = url + `&eventSkill=${searchEventSkill}`;
        }
        dispatch({ type: GET_MY_EVENTS_BEGIN });
        try {
            const { data } = await authFetch(url);
            console.log(data);
            const { events, totalEvents, numOfPages } = data;
            dispatch({
                type: GET_MY_EVENTS_SUCCESS,
                payload: { events, totalEvents, numOfPages },
            });
        } catch (error) {
            logoutUser();
        }
    };

    const setEditEvent = (id) => {
        dispatch({ type: SET_EDIT_EVENT, payload: { id } });
    };

    const editEvent = async () => {
        dispatch({ type: EDIT_EVENT_BEGIN });
        try {
            const { title, description, intake, eventSkill } = state;
            await authFetch.patch(`/events/${state.editEventId}`, {
                title,
                description,
                intake,
                eventSkill,
            });
            dispatch({ type: EDIT_EVENT_SUCCESS });
            dispatch({ type: CLEAR_VALUES });
        } catch (error) {
            if (error.response.status === 401) {
                dispatch({
                    type: EDIT_EVENT_ERROR,
                    payload: { msg: error.response.data.msg },
                });
            }
        }
    };

    const deleteEvent = async (eventId) => {
        dispatch({ type: DELETE_EVENT_BEGIN });
        try {
            await authFetch.delete(`/events/${eventId}`);
            getMyEvents();
        } catch (error) {
            logoutUser();
        }
    };

    const clearFilters = () => {
        dispatch({ type: CLEAR_FILTERS });
    };

    const changePage = (page) => {
        dispatch({ type: CHANGE_PAGE, payload: { page } });
    };

    const sendRequest = async ({ _id, msg }) => {
        const { user } = state;
        try {
            await authFetch.patch('/events/pending-requests', {
                id: _id,
                name: user.name,
                message: msg,
            });
            getEvents();
        } catch (error) {
            logoutUser();
        }
    };

    const getPendingMembers = async () => {
        const { page, search, searchEventSkill, sort } = state;
        let url = `/events/pending-requests?page=${page}&sort=${sort}`;
        if (search) {
            url = url + `&search=${search}`;
        }
        if (searchEventSkill) {
            url = url + `&eventSkill=${searchEventSkill}`;
        }
        dispatch({ type: GET_PENDING_MEMBERS_BEGIN });
        try {
            const { data } = await authFetch(url);
            const { events, totalEvents, numOfPages } = data;
            dispatch({
                type: GET_PENDING_MEMBERS_SUCCESS,
                payload: { events, totalEvents, numOfPages },
            });
        } catch (error) {
            logoutUser();
        }
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
        handleEventChange,
        clearValues,
        createEvent,
        getEvents,
        setEditEvent,
        deleteEvent,
        editEvent,
        clearFilters,
        changePage,
        getMyEvents,
        sendRequest,
        getPendingMembers,
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
