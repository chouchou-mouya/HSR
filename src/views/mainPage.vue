<template>
    <div class="wrap">
        <div class="bg"></div>
        <div class="popup">
            <div class="left">
                <div class="high_light"></div>
                <div class="text">
                    <h1>Ticket!</h1>
                    <p>Search for ticket of Taiwan HSR</p>
                </div>
                <div class="hsr_img">
                    <img src="../assets/images/HSR.png">
                </div>
            </div>
            <div class="right">
                <router-view/>
            </div>
            
        </div><!--/popup-->
    </div>
</template>

<script>
import search from "./search.vue"

export default {
    name:"mainPage",
    components:{
        search
    }
}
</script>

