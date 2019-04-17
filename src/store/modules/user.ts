const user = {
    state: {
        userInfo: localStorage.getItem('user') || {}
    },
    mutations: {
        setUser: (state: any, user: any) => {
            state.userInfo = user;
        },
        removeUser: (state: any) => {
            state.userInfo = {};
        }
    },
}

export default user