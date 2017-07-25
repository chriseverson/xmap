<template>
	<transition name="fade">
		<div id="loading" v-show="!apiLoaded">
			<img src="~@/assets/img/logo.svg" alt="xmap">
			<spinner></spinner>
			<div class="loading-message">{{ statusMessage }}</div>
			<div id="credit">
				<div>&copy; 2017 <a href="https://chriseverson.net">Chris Everson</a></div>
				<div>Version 0.0.1</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import Spinner      from './Spinner';
	import ExtPlaneJs   from 'extplanejs';
	import GoogleMaps from 'google-maps';
	import {mapGetters} from 'vuex';
	import fs from 'fs';


	export default {
		name: 'loading',

		components: {
			Spinner
		},

		data() {
			return {

				/**
				 * Status message to display
				 *
				 * @type {String}
				 */
				statusMessage: null,

				/**
				 * Connection retry interval
				 *
				 * @type {SetInterval}
				 */
				tryConnection: null,

				/**
				 * Delay between connection attempts
				 *
				 * @type {Number}
				 */
				tryConnectionDelay: 3000,

				/**
				 * ExtPlane configuration
				 *
				 * @todo update to be dynamic, maybe stored in app preferences
				 * @type {Object}
				 */
				connectionConfig: {
					host:      '127.0.0.1',
					port:      51000,
					broadcast: false,
					debug:     true
				}
			}
		},

		computed: {
			...mapGetters({

				/** @type {Boolean} whether or not we're connected to X-Plane */
				connectionStatus: 'getConnectionStatus',

				/** @type {ExtPlaneJs} current ExtPlaneJs instance */
				xp: 'getXpInstance',

				themes: 'getThemes',

				themesLoaded: 'getThemesLoaded',

				apiKey: 'getApiKey',

				apiLoaded: 'getApiLoaded',

			})
		},

		watch: {

			connectionStatus (connection) {
				if(connection) {
					this.loadThemes();
				}
			},

			themesLoaded (value) {
				if( value ) {
					this.loadGoogleMaps();
				}
			}

		},

		/**
		 * Component mounted
		 */
		mounted() {
			// Start with no connection
			this.$store.commit('disconnect');

			// Set the status message
			this.statusMessage = 'Attempting to connect to X-Plane';

			// Attempt the connection
			this.tryConnection = setInterval( this.connect, this.tryConnectionDelay );
		},

		/**
		 * Component methods
		 * @type {Object}
		 */
		methods: {

			/**
			 * Establish a connection with X-Plane
			 */
			connect () {

				// Attempt the connection
				var ExtPlane = new ExtPlaneJs( this.connectionConfig );

				// Bind to loaded event
				ExtPlane.on('loaded', () => { this.connected(ExtPlane) } );
			},

			/**
			 * Connection to X-Plane established
			 */
			connected (ExtPlane) {

				// Stop retrying
				clearInterval(this.tryConnection);

				// Store the ExtPlane instance
				this.$store.commit('xp', ExtPlane);
				this.$store.commit('connect');
			},

			/**
			 * Load the map themes and store them
			 *
			 * @todo better error handling
			 */
			loadThemes () {

				// Set the status message
				this.statusMessage = 'Loading map themes';

				for (let key in this.themes) {
					var theme = this.themes[key];

					fs.readFile(theme.path, 'utf8', (err, data) => {
						if( err ) {
							console.error( err );
						} else {
							var themeData = {
								key: key,
								data: JSON.parse(data)
							};

							this.$store.commit('setTheme', themeData );
						}
					});
				}
			},

			/**
			 * Load the google api
			 */
			loadGoogleMaps () {

				console.log( 'loadGoogleMaps' );

				this.statusMessage = 'Loading Google Maps API';

				GoogleMaps.KEY = this.apiKey;

				GoogleMaps.load(google => {
					this.$store.commit('apiLoaded');
					this.$store.commit('google', google);
				});
			},
		}

	}
</script>

<style lang="scss">

#loading {
	z-index: 999;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 9999;

	img {
		max-width: 420px;
		width: 80%;
	}

	.spinner {
		margin-top: 10%;
		margin-bottom: 20px;
	}

	.loading-message {
		color: darken( $color-light-grey, 5 );
	}
}

#credit {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	padding: 12px;
	display: flex;
	justify-content: space-between;
	font-size: 12px;
	color: #999;
	@include bs;

	a {
		color: $color-grey;
	}
}

</style>
