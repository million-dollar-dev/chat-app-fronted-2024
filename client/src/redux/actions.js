export const setUser = (data) => {
    return {
        type: 'setUser',
        payload: data
    };
};

export const getUser = (data) => {
    return {
        type: 'getUser',
        payload: data
    };
};

export const logout = () => {
    return {
        type: 'logout',
        payload: ""
    }
}