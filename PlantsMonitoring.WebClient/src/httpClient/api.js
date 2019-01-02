const api = {
    DEVICES: `${process.env.REACT_APP_BASE_URL}/devices`,
    GROUPS: `${process.env.REACT_APP_BASE_URL}/groups`,
    RULES: `${process.env.REACT_APP_BASE_URL}/rules`,
    ALARMS: `${process.env.REACT_APP_BASE_URL}/alarms`,
    USERS: `${process.env.REACT_APP_BASE_URL}/users`
};

export default api;