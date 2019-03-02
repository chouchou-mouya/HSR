<template>
  <div class="content">
      <h2>高鐵剩餘座位搜尋</h2>
      <div class="choose_time">
          <p>選擇起點</p>
          <form>
              <select name="time" v-model="starStation">
                  <option class="station"  v-for="station in stations" :key="station.id" v-bind:value="station.id" >{{station.stationName}}</option>
              </select>
          </form>
      </div>
      <div class="choose_time">
          <p>選擇終點</p>
          <form>
              <select name="time" v-model="endStation">
                  <option v-for="station in stations" :key="station.id" v-bind:value="station.id" >{{station.stationName}}</option>
              </select>
          </form>
      </div>                    
      <div class="choose_time">
          <p>選擇日期</p>
          <div>
            <date-picker v-model="choosedate" value-type="format" :not-before="new Date()" :not-after="lastDay" v-bind:clearable="false" lang="en"></date-picker>
          </div>
          
      </div>
      
        <button class="enter"  v-on:click="check">
          search
        </button>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import result from "../components/result.vue"


export default {
  name: 'search',
  components: { 
    DatePicker,
    result
  },
  data() {
    return {
      stations:[
          {
              stationName:"南港站",
              id:"0990"
          },
          {
              stationName:"台北站",
              id:"1000"
          },
          {
              stationName:"板橋站",
              id:"1010"
          },
          {
              stationName:"桃園站",
              id:"1020"
          },
          {
              stationName:"新竹站",
              id:"1030"                    
          },
          {
              stationName:"苗栗站",
              id:"1035"                     
          },
          {
              stationName:"台中站",
              id:"1040" 
          },
          {
              stationName:"彰化站",
              id:"1043"                     
          },
          {
              stationName:"雲林站",
              id:"1047"                     
          },
          {
              stationName:"嘉義站",
              id:"1050"                     
          },
          {
              stationName:"台南站",
              id:"1060"                     
          },
          {
              stationName:"左營站",
              id:"1070"                     
          },
      ],
      
      //user's value
      starStation:"",
      endStation:"",
      choosedate:"",
      ymd:"",

      //calendar
      lastDay:"",
      // custom lang
      lang: {
        days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        pickers: ['next 7 days', 'next 30 days', 'previous 7 days', 'previous 30 days'],
        placeholder: {
          date: 'Select Date',
          dateRange: 'Select Date Range'
        }
      },
      // custom range shortcuts
      shortcuts: [
        {
          text: 'Today',
          onClick: () => {
            this.time1 = [ new Date(), new Date() ]
          }
        }
      ],
      timePickerOptions:{
        start: '00:00',
        step: '00:30',
        end: '23:30'
      }
    }
  },
  methods:{
    checkDay:function(){
        const year = new Date().getFullYear();
        const month = (new Date().getMonth()+1)<10 ? '0'+(new Date().getMonth()+1) : '';
        const d =new Date().getDate()<10 ? '0'+new Date().getDate() : ''
        console.log(year+"-"+month+"-"+d)
        return this.ymd=year+"-"+month+"-"+d
    },
    check:function(){
        if(this.starStation.length==0){
            alert("請選擇出發站點")
        }
        else if(this.endStation.length ==0){
            alert("請選擇到達站點")
        }
        else if(this.starStation == this.endStation){
            alert("起點跟終點不能一樣")
        }
        else if(this.choosedate.length == 0){
            alert("請選擇日期")
        }
        else if(this.choosedate!=this.ymd){
            alert("查詢剩餘車票只限於今日")
        }
        else{
        
        this.$router.push({
            name: 'result',
            params: {
              star:this.starStation,
              end:this.endStation,
              date:this.choosedate
            }
          })
          console.log(this.starStation)
        }

    },
    date:function(){
      const today = new Date();
      //算高鐵開放28天前後
      this.lastDay = today.setDate(today.getDate()+28)
    }
  },
  mounted(){
    this.checkDay()
    this.date()
  }

}
</script>
