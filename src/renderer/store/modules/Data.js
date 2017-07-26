/**
 * Flight position and route data
 *
 * @since 0.0.1
 */

import Vue from 'vue';

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

	/** @type {Object} navaids within a 100km radius */
	// navaids: {
		airport:  {},
		ndb:      {},
		vor:      {},
		waypoint: {},
		dme:      {},
	// },

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

	navaid (state, navaid) {

		var type = navaid.type;

		// check if navaid already exists
		if( state[navaid.type][navaid.id] ) {

			// check if navaid is different than already saved version
			if( state[navaid.type][navaid.id].heading !== navaid.heading ) {
				Vue.set( state[navaid.type], navaid.id, navaid );
			}

		// create new navaid
		} else {
			Vue.set( state[navaid.type], navaid.id, navaid );
		}
	},

	// waypoints (state, waypoints) {
	// 	state.waypoints = waypoints;
	// }
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

	getAirports: state => {
		console.log( state.airport );
		return state.airport;
	},

	getWaypoints: state => {
		return state.waypoint;
	}



}

export default {
	state,
	mutations,
	getters
}