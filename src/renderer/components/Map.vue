<template>
	<div id="map-panel">
		<div id="map"></div>
		<a id="toggle-center" v-on:click="fixedMode = ! fixedMode" v-bind:class="{active: fixedMode}">
			<img src="/node_modules/material-design-icons/device/2x_web/ic_gps_fixed_black_36dp.png" class="icon-fixed-mode">
			<img src="/node_modules/material-design-icons/device/2x_web/ic_gps_not_fixed_black_36dp.png" class="icon-not-fixed-mode">
		</a>
		<a id="toggle-flightpath" v-on:click="showFlightpath = ! showFlightpath" v-bind:class="{active: showFlightpath}">
			<img src="/node_modules/material-design-icons/maps/2x_web/ic_near_me_black_36dp.png">
		</a>
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
				plane: {},
				fixedMode: true,
				showFlightpath: true,
				flightpath: null,
				mapWaypoints: {},
				mapAirports: {},
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

				elevation: 'getElevation',

				currentPosition: 'getCurrentPosition',

				airports: 'getAirports',

				waypoints: 'getWaypoints',
			}),
		},

		watch: {

			apiLoaded (loaded) {
				if(loaded) {
					this.loadMap();
					// this.setIcon();
				}
			},

			currentPosition (position) {
				this.centerMap();
				this.marker.setPosition(position);
				// this.updateFlightpath();
			},

			heading (heading) {
				this.plane.rotation = parseFloat(heading);
				this.marker.setIcon( this.plane );
			},

			fixedMode (value) {
				if( value ) {
					this.panMap();
				}
			},

			showFlightpath (value) {
				this.toggleFlightpath();
			},

			airports (value) {
				console.log( 'AIRPORTS UPDATED' );
				console.log( this.airports );

				this.updateAirports();
			},

			waypoints (value) {
				console.log( 'WAYPOINTS UPDATED' );
				console.log( this.waypoints );

				// this.updateWaypoints();
			}



		},

		/**
		 * Componentn methods
		 *
		 * @type {Object}
		 */
		methods: {

			/**
			 * Load the map using the google api
			 * This method also calls on the creation methods for the current position marker and
			 * the flight path polyline.
			 */
			loadMap () {

				// initialize the map
				this.map = new this.google.maps.Map(document.getElementById('map'), this.mapOptions);

				// listen for drag event and toggle fixed mode accordingly
				this.google.maps.event.addListener(this.map, 'dragstart', this.disableFixedMode);

				// call upon creation methods for map assets
				this.createMarker();
				this.initFlightpath();
			},

			/**
			 * Create the marker on the map that shows the current location of the aircraft
			 */
			createMarker () {

				// define the plane icon
				this.setPlane();

				// initialize the marker
				this.marker = new this.google.maps.Marker({
					map: this.map,
					icon: this.plane,
					position: this.getCoordinates(),
					zIndex: 9999
				});

				// event listener for updating the flightpath
				this.google.maps.event.addListener(this.marker, 'position_changed', this.updateFlightpath);
			},

			/**
			 * Define the plane icon
			 * This is called immediately after the google api has been loaded into the application
			 * in order to give us access to the necessary methods.
			 *
			 * @todo there is surely a better way to handle this
			 */
			setPlane () {
				this.plane = {
					fillColor: '#f38630',
					fillOpacity: 1,
					scale: 2,
					size: new this.google.maps.Size( 24, 24 ),
					origin: new this.google.maps.Point( 0, 0 ),
					anchor: new this.google.maps.Point( 12, 20 ),
					path: 'M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z'
				}
			},

			/**
			 * Initialize the flightpath
			 */
			initFlightpath () {
				this.flightpath = new this.google.maps.Polyline({
					strokeColor: '#863181',
					stokeOpacity: 1,
					strokeWeight: 3
				});

				this.flightpath.setMap( this.map );
			},

			/**
			 * Update the flight path if the plane is in the air
			 *
			 * Currently this only updates when the plane is airborne due to some unexpected
			 * behavior with determining the position when on the ground.
			 */
			updateFlightpath () {
				var path = this.flightpath.getPath();

				if( this.elevation ) {
					path.push( this.getCoordinates() );
				}

				// console.log( this.waypoints );
			},

			/**
			 * Center the map if in fixed mode
			 */
			centerMap () {
				if( this.fixedMode ) {
					this.map.panTo(this.currentPosition);
				}
			},

			/**
			 * Disable fixed mode
			 */
			disableFixedMode () {
				this.fixedMode = false;
			},

			/**
			 * Get google api LatLng object from current coordinates
			 *
			 * @todo   This whole bit of positioning should be simplified
			 *
			 * @return {LatLng}
			 */
			getCoordinates () {
				return new this.google.maps.LatLng( this.currentPosition.lat, this.currentPosition.lng );
			},

			/**
			 * Toggle flightpath visibility
			 */
			toggleFlightpath () {
				this.flightpath.setVisible( this.showFlightpath );
			},

			updateAirports () {
				for (var [id, airport] of Object.entries(this.airports)) {
					this.createAirport( airport );
				}
			},

			createAirport (waypoint) {

				if( this.mapAirports[waypoint.id] ) {
					return;
				}
				console.log( 'create airport: ', waypoint.id);

				// var label = new this.google.maps.Label({
				// 	color: '#cccccc',
				// 	fontSize: '12px',
				// 	'text': waypoint.id
				// });
				//
				var icon = {
					fillColor: '#fff',
					fillOpacity: 1,
					scale: 1,
					size: new this.google.maps.Size( 24, 24 ),
					origin: new this.google.maps.Point( 0, 0 ),
					anchor: new this.google.maps.Point( 0, 0 ),
					path: 'M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z'
				}
				// M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z

				this.mapAirports[waypoint.id] = new this.google.maps.Marker({
					map: this.map,
					icon: icon,
					label: {
						color: '#cccccc',
						fontSize: '10px',
						'text': waypoint.id
					},
					position: new this.google.maps.LatLng( waypoint.latitude, waypoint.longitude )
				});
			},


			updateWaypoints () {
				for (var [id, waypoint] of Object.entries(this.waypoints)) {
					console.log( waypoint );
					this.createWaypoint( waypoint );
				}
			},

			createWaypoint (waypoint) {

				if( this.mapWaypoints[waypoint.id] ) {
					return;
				}
				console.log( 'create waypoint: ', waypoint.id);

				// var label = new this.google.maps.Label({
				// 	color: '#cccccc',
				// 	fontSize: '12px',
				// 	'text': waypoint.id
				// });
				//
				var icon = {
					fillColor: '#fff',
					fillOpacity: 1,
					scale: 1,
					size: new this.google.maps.Size( 24, 24 ),
					origin: new this.google.maps.Point( 0, 0 ),
					anchor: new this.google.maps.Point( 0, 0 ),
					path: 'M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z'
				}
				// M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z

				this.mapWaypoints[waypoint.id] = new this.google.maps.Marker({
					map: this.map,
					icon: icon,
					label: {
						color: '#cccccc',
						fontSize: '10px',
						'text': waypoint.id
					},
					position: new this.google.maps.LatLng( waypoint.latitude, waypoint.longitude )
				});
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
		border-radius: 2px;
		box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
		@include size( 32px );

		img {
			position: absolute;
			top: 4px;
			left: 4px;
			opacity: 0;
			@include size( 24px );

			&.icon-not-fixed-mode {
				opacity: .7;
			}

			&.icon-fixed-mode {
				opacity: 0;
			}
		}

		&.active {
			.icon-fixed-mode {
				opacity: .7;
			}

			.icon-not-fixed-mode {
				opacity: 0;
			}
		}

	}

	#toggle-flightpath {
		@extend #toggle-center;
		top: 10px + 32px + 10px;

		img {
			opacity: .2;
		}

		&.active {
			img {
				opacity: .7;
			}
		}
	}

	#gmnoprint {
		// transition: all .1s ease;
	}
</style>