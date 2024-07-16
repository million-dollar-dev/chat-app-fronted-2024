export const setUser = (data) => {
    return {
        type: 'setUser',
        payload: data
    };
};
export const setRecode = (data) => {
    return {
        type: 'setRecode',
        payload: data
    };
};
export const logout = () => {
    return {
        type: 'logout',
        payload: ""
    }
}