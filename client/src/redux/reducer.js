const initialState = {
    user: '',
    recode: ''
};
const rootReducer = (state = initialState, action) => {
    console.log(state, action);
    switch (action.type) {
        case 'setUser':
            return {
                ...state,
                user: action.payload,
            };
        case 'setRecode':
            return {
                ...state,
                recode: action.payload,
            };
        case 'logout':
            return {
                ...state,
                user: "",
                recode: ""
            }
        default:
            return state;
    }

};
export default rootReducer;