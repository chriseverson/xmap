<template>
	<div id="map-panel">
		<div id="map"></div>
		<a id="toggle-center" v-on:click="fixedMode = ! fixedMode" v-bind:class="{active: fixedMode}"></a>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex';

	export default {
		name: 'map-panel',

		data () {
			return {
				map: null,
				marker: null,
				plane: {
					fillColor: '#cf0',
					fillOpacity: 1,
					scale: 2,
					path: 'M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z'
				},
				fixedMode: true,
			}
		},

		computed: {
			...mapGetters({

				themes: 'getThemes',

				apiLoaded: 'getApiLoaded',

				google: 'getGoogle',

				mapOptions: 'getMapOptions',

				latitude: 'getLatitude',

				longitude: 'getLongitude',

				heading: 'getHeading',

				currentPosition: 'getCurrentPosition',


				// map: 'getMap',

			}),
		},

		watch: {

			apiLoaded (loaded) {
				if(loaded) {
					this.loadMap();
				}
			},

			currentPosition (position) {
				this.panMap();
				this.marker.setPosition(position);
			},

			heading (heading) {
				this.plane.rotation = parseFloat(heading);
				this.marker.setIcon( this.plane );
			},

			fixedMode (value) {
				if( value ) {
					this.panMap();
				}
			}


		},

		methods: {
			loadMap () {
				console.log( 'LOAD MAP' );

				this.map = new this.google.maps.Map(document.getElementById('map'), this.mapOptions);

				this.createMarker();

			},

			createMarker () {
				var latitude  = (this.latitude) ? this.latitude : 0,
					longitude = (this.longitude) ? this.longitude : 0;

				this.marker = new this.google.maps.Marker({
					map: this.map,
					icon: this.plane,
					position: {
						lat: latitude,
						lng: longitude
					}
				})
			},

			panMap () {
				if( this.fixedMode ) {
					this.map.panTo(this.currentPosition);
				}
			}
		}


	}

</script>

<style lang="scss">
	#map {
		z-index: 1;
		position: absolute;
		top: 0;
		left: 0;
		@include size( 100% );
	}

	#toggle-center {
		display: block;
		background: #fff;
		position: absolute;
		z-index: 9;
		top: 10px;
		right: 10px;
		background-image: url(/node_modules/material-design-icons/device/2x_web/ic_gps_not_fixed_black_36dp.png);
		// background-size: cover;
		background-position: 50% 50%;
		background-repeat: no-repeat;
		background-size: 80% auto;
		border-radius: 2px;
		box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
		@include size( 32px );

		&.active {
			background-image: url(/node_modules/material-design-icons/device/2x_web/ic_gps_fixed_black_36dp.png);
		}

	}

	#gmnoprint {
		// transition: all .1s ease;
	}
</style>