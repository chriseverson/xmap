const state = {
	templateLoaded: false
}

const mutations = {
	templateNotLoaded (state) {
		state.templateLoaded = false;
	},

	templateLoaded (state) {
		state.templateLoaded = true;
	}
}

const getters = {
	getTemplateLoaded: state => state.templateLoaded
}

const actions = {}

export default {
	state,
	mutations,
	actions,
	getters
}