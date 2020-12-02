<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'CF Wod Gen'
}
</script>

<style>
@font-face {
  font-family: 'PermanentMarker';
  src: local('PermanentMarker'), local('PermanentMarker-Regular'),
    url('assets/PermanentMarker-regular.ttf') format('truetype');
  font-style: normal;
  font-weight: 400;
}

#app {
  font-family: 'PermanentMarker', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
