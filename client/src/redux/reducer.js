const initialState = {
    user: '',
};
const rootReducer = (state = initialState, action) => {
    console.log(state, action);
    switch (action.type) {
        case 'setUser':
            return {
                ...state,
                user: action.payload
            };
        case 'logout':
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }

};
export default rootReducer;