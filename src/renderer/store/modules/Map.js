/**
 * Map data
 *
 * @since 0.0.1
 */

/**
 * Current state
 *
 * @type {Object}
 */
const state = {

	/**
	 * Google maps API key
	 *
	 * @todo this should be stored somewhere else methinks
	 *
	 * @type {String}
	 */
	apiKey: 'AIzaSyCBnjERUr21_XDnH6P2cR4Iplk4nsR2KDU',

	/** @type {Object} google api instance */
	google: null,

	/** @type {Boolean} is the google maps api loaded? */
	apiLoaded: false,

	/** @type {Object} theme data */
	themes: {
		dark: {
			path: 'static/map-styles-dark.json',
			data: []
		},
		light: {
			path: 'static/map-styles-dark.json',
			data: []
		}
	},

	map: null,

	mapOptions: {
		center: {
			lat: -34.397,
			lng: 150.644,
		},
		zoom: 8,
		streetViewControl: false,
		mapTypeControl: false,
		styles: null,
	}

}

/**
 * State mutation methods
 *
 * @type {Object}
 */
const mutations = {

	/**
	 * Store theme data
	 *
	 * @param  {Object} state
	 * @param  {Object} theme data {key, data}
	 */
	setTheme (state, themeData) {
		state.themes[themeData.key].data = themeData.data;
	},

	/**
	 * Store google api instance
	 *
	 * @param  {Object} state
	 * @param  {Google} instance
	 */
	google (state, instance) {
		state.google = instance;
	},

	apiLoaded (state) {
		state.apiLoaded = true;
	},

	map (state, map) {
		state.map = map;
	}

}

/**
 * Getter methods
 *
 * @type {Object}
 */
const getters = {


	/**
	 * Themes getter
	 *
	 * @param  {Object} state
	 * @return {Object}
	 */
	getThemes: state => {
		return state.themes;
	},

	/**
	 * Themes loaded status
	 *
	 * @todo   Better iteration of themes instead of explicit declaration
	 *
	 * @param  {Object}  state
	 * @return {Boolean}
	 */
	getThemesLoaded: state => {
		var themes = state.themes;

		if( themes.dark.data.length && themes.light.data.length ) {
			return true;
		}

		return false;
	},

	/**
	 * Get the google api key
	 *
	 * @param  {Object} state
	 */
	getApiKey: state => {
		return state.apiKey;
	},

	/**
	 * Google api instance
	 *
	 * @param  {Object} state
	 */
	getGoogle: state => {
		return state.google;
	},

	getApiLoaded: state => {
		return state.apiLoaded;
	},

	getMapOptions: state => {

		state.mapOptions.styles = state.themes.dark.data;

		return state.mapOptions;
	},

	getMap: state => {
		return state.map;
	},

	getCurrentPosition: (state, getters) => {
		return {
			lat: parseFloat( getters.getLatitude ),
			lng: parseFloat( getters.getLongitude )
		}
	}

}

export default {
	state,
	mutations,
	getters
}