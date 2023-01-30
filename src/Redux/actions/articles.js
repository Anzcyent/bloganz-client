import { articlesConstants, appConstants } from "../constants";
import { getRequest, postRequest, putRequest, deleteRequest } from "../../Utils/Fetch/fetchData";


export const getArticles = () => async (dispatch) => {
    try {
        dispatch({
            type: appConstants.IS_LOADING,
            payload: true
        })

        const res = await getRequest('article');


        dispatch({
            type: articlesConstants.GET_ARTICLES,
            payload: res.data.data
        })

        if (!localStorage.getItem('article')) {
            dispatch({
                type: articlesConstants.GET_CURRENT_ARTICLE,
                payload: res.data.data[0]
            });
        } else {
            dispatch(getArticleById(localStorage.getItem('article')))
        }

        dispatch({
            type: appConstants.IS_LOADING,
            payload: false
        })
    } catch (err) {
        throw new Error(err.response.data.message);
    }

}

export const getArticleById = (id) => async (dispatch) => {
    try {
        dispatch({
            type: appConstants.IS_LOADING,
            payload: true
        });

        const res = await getRequest(`article/article/${id}`);

        dispatch({
            type: articlesConstants.GET_CURRENT_ARTICLE,
            payload: res.data.data
        });

        dispatch({
            type: appConstants.IS_LOADING,
            payload: false
        });

    } catch (err) {
        throw new Error(err.response.data.message);
    }
}

export const createArticle = (data, token, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: appConstants.IS_LOADING,
            payload: true
        })

        const res = await postRequest("article/create", data, token);

        dispatch(getArticles())

        dispatch(getArticleById(res.data.data._id))

        dispatch({
            type: appConstants.IS_LOADING,
            payload: false
        })

        navigate(`/article/${res.data.data._id}`);
    } catch (err) {
        alert(err.response.data.message)
        throw new Error(err.response.data.message)
    }
}

export const getArticlesOfOwner = (token) => async (dispatch) => {
    try {
        dispatch({
            type: appConstants.IS_LOADING,
            payload: true
        });

        const res = await getRequest('article/articles-of-owner', token);

        dispatch({
            type: articlesConstants.GET_ARTICLES_OF_OWNER,
            payload: res.data.data
        });

        if (!localStorage.getItem('article')) {
            dispatch({
                type: articlesConstants.GET_CURRENT_ARTICLE,
                payload: res.data.data[Math.floor(Math.random() * res.data.data.length)]
            });
        } else {
            dispatch(getArticleById(localStorage.getItem('article')))
        }

        dispatch({
            type: appConstants.IS_LOADING,
            payload: false
        });
    } catch (err) {
        alert(err.response.data.message);
    }

}

export const editArticle = (id, data, token, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: appConstants.IS_LOADING,
            payload: true
        })

        const res = await putRequest(`article/edit-article/${id}`, data, token);

        dispatch(getArticles())

        dispatch(getArticleById(res.data.data._id))

        dispatch({
            type: appConstants.IS_LOADING,
            payload: false
        })

        navigate(`/article/${res.data.data._id}`);
    } catch (err) {
        alert(err.response.data.message)
        throw new Error(err.response.data.message)
    }
}

export const deleteArticle = (id, token, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: appConstants.IS_LOADING,
            payload: true
        });

        const res = await deleteRequest(`article/delete-article/${id}`, token);

        dispatch(getArticles());

        navigate("/articles");

        dispatch({
            type: appConstants.IS_LOADING,
            payload: false
        })
    } catch (err) {
        throw new Error(err.response.data.message);
    }
} 

export const voteArticle = (id, token) => async (dispatch) => {
    try {
        dispatch({
            type: appConstants.IS_LOADING,
            payload: true
        });

        const res = await getRequest(`article/vote/${id}`, token);

        dispatch(getArticleById(res.data.data._id));

        dispatch({
            type: appConstants.IS_LOADING,
            payload: false
        });
        
    } catch (err) {
        throw new Error(err.response.data.message);
    }
}
