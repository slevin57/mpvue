
const state = {
    _status: false,
    _userInfo:{}
}

const getters = {
    status: state => state._status,
    userInfo: state => state._userInfo,
}

const mutations = {
    changeStatus(state, param) {
        // state._status = state._status ? false : true;
        console.log(`param:`,param);
        state._userInfo = param;
    },
}

const actions = {

}

export default {
    state,
    getters,
    mutations,
    actions,
}