/**
 * X-Plane Connection Datastore
 *
 * @since 0.0.1
 */

/**
 * Current state
 *
 * @type {Object}
 */
const state = {

	/** @type {Object} main instance of ExtPlaneJs */
	xp: null,

	/** @type {Boolean} connection status */
	connected: false,

}

/**
 * State mutation methods
 *
 * @type {Object}
 */
const mutations = {

	/**
	 * Store the ExtPlaneJs instance
	 *
	 * @param  {Object}     state
	 * @param  {ExtPlaneJs} instance
	 */
	xp (state, instance) {
		state.xp = instance;
	},

	/**
	 * Connection established
	 *
	 * @param  {Object} state
	 */
	connect (state) {
		state.connected = true;
	},

	/**
	 * Connection closed
	 *
	 * @param  {Object} state
	 */
	disconnect (state) {
		state.connected = false;
	},
}

/**
 * Getter methods
 *
 * @type {Object}
 */
const getters = {

	/**
	 * Connection status getter
	 *
	 * @param  {Object} state
	 * @return {Boolean}
	 */
	getConnectionStatus: state => {
		return state.connected;
	},

	/**
	 * ExtPlaneJs instance getter
	 *
	 * @param  {Object}     state
	 * @return {ExtPlaneJs}
	 */
	getXpInstance: state => {
		return state.xp;
	}

}

export default {
	state,
	mutations,
	getters
}