const GET_RECIPE_REVIEWS = "review/GET_RECIPE_REVIEWS";
const GET_USER_REVIEWS = "review/GET_USER_REVIEWS";
const CREATE_REVIEW = "review/CREATE_REVIEW";
const UPDATE_REVIEW = "review/UPDATE_REVIEW";
const DELETE_REVIEW = "review/DELETE_REVIEW";

const getRecipeReviews = (reviews) => ({
    type: GET_RECIPE_REVIEWS,
    payload: reviews
});

const getUserReviews = (reviews) => ({
    type: GET_USER_REVIEWS,
    payload: reviews
});

const createReview = (review) => ({
    type: CREATE_REVIEW,
    payload: review
});

const updateReview = (review) => ({
    type: UPDATE_REVIEW,
    payload: review
});

const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    payload: reviewId
})

export const getRecipeReviewsThunk = (recipeId) => async dispatch => {
    const res = await fetch(`/api/recipes/${recipeId}/reviews`);
    try {
        const reviews = await res.json()
        dispatch(getRecipeReviews(reviews))
    }
    catch(error) {
        return error
    }
};

// might have to rethink and change params
export const getUserReviewsThunk = (userId) => async dispatch => {
    const res = await fetch(`/api/users/${userId}/reviews`);
    try {
        const reviews = await res.json()
        dispatch(getUserReviews(reviews))
    }
    catch(error) {
        return error
    }
};

export const createReviewThunk = (payload) => async dispatch => {
    const res = await fetch('/api/reviews/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    try {
        const review = await res.json()
        dispatch(createReview(review))
        return review
    }
    catch(error) {
        return error
    }
};

export const updateReviewThunk = (reviewId, payload) => async dispatch => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    try {
        const review = await res.json()
        dispatch(updateReview(review))
        return review
    }
    catch(error) {
        return error
    }
};

export const deleteReviewThunk = (reviewId) => async dispatch => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    try {
        const review = await res.json()
        dispatch(deleteReview(review.id))
    }
    catch(error) {
        return error
    }
};

const initialState = { recipeReviews: [], userReviews: [], createdReview: {}, updatedReview: {} };

export default function reducer(state = initialState, action) {
	switch (action.type) {
        case GET_RECIPE_REVIEWS:
            return {...state, recipeReviews: action.payload}
        case GET_USER_REVIEWS:
            return {...state, userReviews: action.payload}
        case CREATE_REVIEW:
            return {...state, recipeReviews: [...state.recipeReviews, action.payload], createdReview: action.payload}
        case UPDATE_REVIEW:
            const updatedReviews2 = state.recipeReviews.map(review => {
				if (review.id === action.payload.id) {
					return action.payload;
				}
				return review;
			});
            return {...state, recipeReviews: updatedReviews2, updatedReview: action.payload}
        case DELETE_REVIEW:
            const updatedRecipeReviews = state.recipeReviews.filter(review => review.id !== action.payload)
            const updatedReviews = state.userReviews.filter(review => review.id !== action.payload.id)
            return { ...state, recipeReviews: updatedRecipeReviews, userReviews: updatedReviews, deletedReview: action.payload };
		default:
			return state;
	}
};
