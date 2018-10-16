
const state = {
    _status: false,
}

const getters = {
    status: state => state._status,
}

const mutations = {
    changeStatus(state, param) {
        state._status = state._status ? false : true;
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