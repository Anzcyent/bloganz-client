import { authConstants, appConstants } from "../constants";
import { getRequest, postRequest } from "../../Utils/Fetch/fetchData";

export const authRegister = (data, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: appConstants.IS_LOADING,
            payload: true
        });

        const res = await postRequest('auth/register', data);
        localStorage.setItem('access_token', res.data.access_token);

        dispatch({
            type: authConstants.AUTH,
            payload: res.data
        })

        dispatch({
            type: appConstants.IS_LOADING,
            payload: false
        });

        navigate('/');
    } catch (err) {
        dispatch({
            type: appConstants.ERROR,
            payload: {
                name: "register",
                message: err.response.data.message
            }
        });

        setTimeout(() => {
            dispatch({
                type: appConstants.ERROR,
                payload: null
            });
        }, 2500);

        throw new Error(err.response.data.message);
    }

}

export const authLogin = (data, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: appConstants.IS_LOADING,
            payload: true
        });

        const res = await postRequest('auth/login', data);
        localStorage.setItem('access_token', res.data.access_token);

        dispatch({
            type: authConstants.AUTH,
            payload: res.data
        })

        dispatch({
            type: appConstants.IS_LOADING,
            payload: false
        });

        navigate('/');
    } catch (err) {
        dispatch({
            type: appConstants.ERROR,
            payload: {
                name: "login",
                message: err.response.data.message
            }
        });

        setTimeout(() => {
            dispatch({
                type: appConstants.ERROR,
                payload: null
            });
        }, 2500)

        throw new Error(err.response.data.message);
    }
}

export const generateNewToken = (token) => async (dispatch) => {
    try {
        dispatch({
            type: appConstants.IS_LOADING,
            payload: true
        });

        if (localStorage.getItem('access_token')) {
            const res = await getRequest('auth/generate_new_token', token);
            localStorage.setItem('access_token', res.data.access_token);

            dispatch({
                type: authConstants.AUTH,
                payload: res.data
            });

            dispatch({
                type: appConstants.IS_LOADING,
                payload: false
            });
        }

        return
    } catch (err) {
        throw new Error(err.response.data.message)
    }
}

export const authLogout = () => async (dispatch) => {
    const res = await getRequest('auth/logout');
    localStorage.removeItem('access_token');
    window.location.href('/');
    window.location.reload();
}