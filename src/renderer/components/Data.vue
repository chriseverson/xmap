<template></template>

<script>
	import Xplane from '../store/modules/Xplane';
	import {mapGetters} from 'vuex';

	export default {

		name: 'map-data',

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

			subscribe () {

				var client = this.xp.client;

				client.subscribe( 'sim/flightmodel/position/latitude' );
				client.subscribe( 'sim/flightmodel/position/longitude' );
				client.subscribe( 'sim/flightmodel/position/hpath' );
				client.subscribe( 'sim/flightmodel/position/elevation' );
				client.subscribe( 'extplane/navdata/100km' );

				this.bind();
			},

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

			}


		}


	}
</script>