<template>
  <div id="app">
    <mainPage/>
  </div>
</template>

<style>
@import url(assets/css/reset.css);
@import url(assets/css/layout.css);
</style>
<script>
import mainPage from "./views/mainPage.vue"
export default{
  name:"App",
  components:{
    mainPage
  }
}
</script>

