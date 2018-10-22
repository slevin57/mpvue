
const state = {
    _options: {},
}

const getters = {
    options: state => state._options,
}

const mutations = {
    changeOptions (state,opt) {
        state._options = opt ? opt : {};
    }
}

const actions = {

}

export default {
    state,
    getters,
    mutations,
    actions,
}