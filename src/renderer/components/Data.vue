<template></template>

<script>
	import Xplane from '../store/modules/Xplane';
	import {mapGetters} from 'vuex';

	export default {

		name: 'map-data',

		data () {
			return {

				/**
				 * Map navaid type bits to type names
				 * @type {Object}
				 */
				navaidTypeMap: {
					'0':    'unknown',
					'1':    'airport',
					'2':    'ndb',
					'4':    'vor',
					'8':    'ils',
					'16':   'localizer',
					'32':   'glideslope',
					'64':   'outermarker',
					'128':  'middlemarker',
					'256':  'innermarker',
					'512':  'waypoint',
					'1024': 'dme',
					'2048': 'latlng',
				},

				/**
				 * Types of navaids we actually care about storing
				 * @type {Array}
				 */
				navaidUsedTypes: [
					'airport',
					'ndb',
					'vor',
					'waypoint',
					'dme'
				],


			}
		},

		computed: {
			...mapGetters({

				/** @type {Boolean} whether or not we're connected to X-Plane */
				connectionStatus: 'getConnectionStatus',

				/** @type {ExtPlaneJs} current ExtPlaneJs instance */
				xp: 'getXpInstance',

				/** @type {Number} last reported latitude */
				latitude: 'getLatitude',

				/** @type {Number} last reported longitude */
				longitude: 'getLongitude',

				/** @type {Number} last reported heading */
				heading: 'getHeading',

				/** @type {Number} last reported elevation */
				elevation: 'getElevation',

			})
		},

		watch: {

			connectionStatus (connection) {
				if(connection) {
					this.subscribe();
				}
			},

			latitude (latitude) {
				// console.log( 'latitude updated: ' + latitude );
			},

			longitude (longitude) {
				// console.log( 'longitude updated: ' + longitude );
			},

			heading (heading) {
				// console.log( 'heading updated: ' + heading );
			}

		},

		methods: {

			/**
			 * Subscribe to X-Plane data-refs
			 */
			subscribe () {
				var client = this.xp.client;

				client.subscribe( 'sim/flightmodel/position/latitude' );
				client.subscribe( 'sim/flightmodel/position/longitude' );
				client.subscribe( 'sim/flightmodel/position/hpath' );
				client.subscribe( 'sim/flightmodel/position/elevation' );
				client.subscribe( 'extplane/navdata/100km' );

				this.bind();
			},

			/**
			 * Bind to listen for data-ref updates and handle them accordingly
			 */
			bind () {

				// update latitude
				this.xp.on('sim/flightmodel/position/latitude', (dref, value) => {
					this.$store.commit('latitude', value);
				});

				// update longitude
				this.xp.on('sim/flightmodel/position/longitude', (dref, value) => {
					this.$store.commit('longitude', value);
				});

				// update heading
				this.xp.on('sim/flightmodel/position/hpath', (dref, value) => {
					this.$store.commit('heading', value);
				});

				// update altitude
				this.xp.on('sim/flightmodel/position/elevation', (dref, value) => {
					this.$store.commit('elevation', value);
				});

				this.xp.on('extplane/navdata/100km', (dref, value) => {
					this.processNavaids(value);
				});
			},

			/**
			 * Parse the navaids string
			 *
			 * Navaids are returned in a string with one navaid per line
			 * Each line contains navaid information separated by a colon in the format:
			 *
			 * ID:TYPE:LAT:LNG:LOCALX:LOCALZ:HEIGHT:FREQ:HDG:NAME
			 * 0 : 1  : 2 : 3 : 4    : 5    : 6    : 7  : 8 : 9
			 *
			 * @param  {String} navaids line-separated list of navaids within 100km
			 */
			processNavaids (navaids) {

				var navaids = navaids.split(/\r?\n/);

				for( let navaid of navaids ) {
					if( navaid ) {
						navaid = navaid.split(':');
						this.maybeUpdateNavaid( navaid[0], navaid[1], navaid[2], navaid[3], navaid[7], navaid[8], navaid[9] );
					}
				}
			},

			maybeUpdateNavaid (id, type, lat, lng, freq, hdg, name) {

				var type = this.navaidTypeMap[type];

				if( this.navaidUsedTypes.includes(type) ) {

					var navaid = {
						id: id,
						type: type,
						latitude: lat,
						longitude: lng,
						frequency: freq,
						heading: hdg,
						name: name
					};

					this.$store.commit('navaid', navaid);
				}
			}



		}


	}
</script>