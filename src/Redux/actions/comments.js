import { appConstants } from "../constants";
import { postRequest } from "../../Utils/Fetch/fetchData";
import { getArticleById } from "./articles";

export const createComment = (id, data, token) => async (dispatch) => {
    try {
        dispatch({
            type: appConstants.IS_LOADING,
            payload: true
        });

        const res = await postRequest(`comment/create/${id}`, data, token);

        dispatch(getArticleById(id));

        dispatch({
            type: appConstants.IS_LOADING,
            payload: false
        });


    } catch (err) {
        throw new Error(err.response.data.message);
    }
}