<template>
	<div id="wrapper">
		<loader></loader>
		<map-panel></map-panel>
		<map-controls></map-controls>
    <map-data></map-data>
	</div>
</template>

<script>
	import Loader from './Loader';
	import MapPanel from './Map';
	import MapControls from './MapControls';
  import MapData from './Data';

	export default {
		name: 'main',

		components: {
			Loader,
			MapPanel,
			MapControls,
      MapData
		},

		data() {
			return {
			}
		},

		created() {
			// this.$on('loading:update', function(value) {
			// 	console.log('loading:update', value );
			// })
		}
	}
</script>

<style lang="scss">
	#wrapper {
		position: relative;
		min-height: 100%;
		@include size( 100% );
	}
</style>

<!--
<template>
  <div id="wrapper">
    <div id="map">
    </div>
  </div>
</template>

<script>
    import SystemInformation from './LandingPage/SystemInformation'
    import GoogleMaps from 'google-maps';
    import fs from 'fs';
    import {remote} from 'electron';

    export default {
        name: 'landing-page',
        components: { SystemInformation },

        mounted () {






      console.log( 'mounted' );

      GoogleMaps.KEY = 'AIzaSyCBnjERUr21_XDnH6P2cR4Iplk4nsR2KDU';

      GoogleMaps.load( function(google) {
        console.log( 'MAPS API LOADED');



        // var styles = remote.require('/static/map-styles-dark.json');


        fs.readFile( 'static/map-styles-dark.json', 'utf8', function(err, data) {
            if( ! err ) {

                let options = {
                  center: {lat: -34.397, lng: 150.644},
                  scrollwheel: false,
                  zoom: 8,
                  streetViewControl: false,
                  mapTypeControl: false,
                  styles: JSON.parse( data ),
                }

                console.log( options );

                new google.maps.Map( document.getElementById('map'), options );


            }


        })

      })

    },

    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #map {
    background: #cf0;
    width: 100%;
    height: 100%;
  }
</style>
 -->