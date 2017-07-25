<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'xmap'
  }
</script>

<style lang="scss">
	#app {
		min-height: 100%;
		@include size( 100% );
	}
</style>
