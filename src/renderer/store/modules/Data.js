/**
 * Flight position and route data
 *
 * @since 0.0.1
 */

/**
 * Current state
 *
 * @type {Object}
 */
const state = {

	/** @type {Number} last reported latitude */
	latitude: 0,

	/** @type {Number} last reported longitude */
	longitude: 0,

	/** @type {Number} last reported heading */
	heading: 0,

	/** @type {Number} last reported elevation above MSL */
	elevation: 0,

	/** @type {Array} waypoints within a 100km radius */
	waypoints: [],

}

/**
 * State mutation methods
 *
 * @type {Object}
 */
const mutations = {

	/**
	 * Store latitude
	 *
	 * @param  {Object} state
	 * @param  {Number}
	 */
	latitude (state, latitude) {
		state.latitude = latitude;
	},

	/**
	 * Store longitude
	 *
	 * @param  {Object} state
	 * @param  {Number}
	 */
	longitude (state, longitude) {
		state.longitude = longitude;
	},

	/**
	 * Store heading
	 *
	 * @param  {Object} state
	 * @param  {Number}
	 */
	heading (state, heading) {
		state.heading = heading;
	},

	/**
	 * Store elevation relative to MSL
	 *
	 * @param  {Object} state
	 * @param  {Number}
	 */
	elevation (state, elevation) {
		state.elevation = elevation;
	},

}

/**
 * Getter methods
 *
 * @type {Object}
 */
const getters = {

	/**
	 * Latitude getter
	 *
	 * @param  {Object} state
	 * @return {Number}
	 */
	getLatitude: state => {
		return state.latitude;
	},

	/**
	 * Longitude getter
	 *
	 * @param  {Object} state
	 * @return {Number}
	 */
	getLongitude: state => {
		return state.longitude;
	},

	/**
	 * Heading getter
	 *
	 * @param  {Object} state
	 * @return {Number}
	 */
	getHeading: state => {
		return state.heading;
	},

	/**
	 * Elevation getter
	 *
	 * @param  {Object} state
	 * @return {Number}
	 */
	getElevation: state => {
		return state.elevation;
	},



}

export default {
	state,
	mutations,
	getters
}