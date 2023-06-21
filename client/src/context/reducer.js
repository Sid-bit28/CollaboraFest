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
} from './actions';
import { initialState } from './appContext';

const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return {
            ...state,
            showAlert: true,
            alertType: 'danger',
            alertText: 'please provide all the values!',
        };
    }
    if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: '',
            alertText: '',
        };
    }
    if (action.type === SETUP_USER_BEGIN) {
        return {
            ...state,
            isLoading: true,
        };
    }
    if (action.type === SETUP_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            userSkill: action.payload.skill,
            eventSkill: action.payload.skill,
            showAlert: true,
            alertType: 'success',
            alertText: action.payload.alertText,
        };
    }
    if (action.type === SETUP_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.message,
        };
    }
    if (action.type === TOGGLE_SIDEBAR) {
        return {
            ...state,
            showSidebar: !state.showSidebar,
        };
    }
    if (action.type === LOGOUT_USER) {
        return {
            ...initialState,
            user: null,
            token: null,
            userSkill: '',
            eventSkill: '',
        };
    }
    if (action.type === UPDATE_USER_BEGIN) {
        return {
            ...state,
            isLoading: true,
        };
    }
    if (action.type === UPDATE_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            userSkill: action.payload.skill,
            eventSkill: action.payload.skill,
            showAlert: true,
            alertType: 'success',
            alertText: 'User profile updated',
        };
    }
    if (action.type === UPDATE_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.message,
        };
    }
    if (action.type === HANDLE_CHANGE) {
        return {
            ...state,
            [action.payload.name]: action.payload.value,
        };
    }
    if (action.type === CLEAR_VALUES) {
        const initialState = {
            isEditing: false,
            editEventId: '',
            title: '',
            description: '',
            intake: 0,
            eventSkill: state.userSkill || '',
        };
        return {
            ...state,
            ...initialState,
        };
    }
    if (action.type === CREATE_EVENT_BEGIN) {
        return {
            ...state,
            isLoading: true,
        };
    }
    if (action.type === CREATE_EVENT_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'New Event Created.',
        };
    }
    if (action.type === CREATE_EVENT_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.message,
        };
    }
    if (action.type === GET_EVENTS_BEGIN) {
        return {
            ...state,
            isLoading: true,
        };
    }
    if (action.type === GET_EVENTS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            events: action.payload.events,
            totalEvents: action.payload.totalEvents,
            numOfPages: action.payload.numOfPages,
        };
    }
    throw new Error(`No such action: ${action.type}`);
};

export default reducer;
