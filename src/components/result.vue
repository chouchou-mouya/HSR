<template>
    <div class="content_result">
        <div class="result_title">今日從{{getSter_ch}}到{{getEnd_ch}}的座位查詢</div>
        <div class="table">
            <div class="table_title">
                <ul>
                    <li>車次</li>
                    <li>出發時間</li>
                    <li>到達時間</li>
                    <li>是否有座位</li>
                </ul>
            </div>
            <div class="table_content" v-for="train in api_setstate" :key="train.TrainNo" v-if="train.DepartureTime > today">
                <ul v-for="set in train.StopStations" :key="set.id" v-if="set.StationID==getEnd">
                    <li>{{train.TrainNo}}</li>
                    <li>{{train.DepartureTime}}</li>
                    <li>{{api_dailytimetable[train.TrainNo].DestinationArrivalTime}}</li>
                    <li class="act" v-bind:class="{ full: set.StandardSeatStatus=='Full','hasSet': set.StandardSeatStatus=='Available' }">{{set.StandardSeatStatus}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name:"result",
    data(){
        return{
            getStar:this.$route.params.star,
            getEnd:this.$route.params.end,
            getdate:this.$route.params.date,
            api_dailytimetable:{},
            api_setstate:null,
            getSter_ch:"",
            getEnd_ch:"",
        }
    },
    methods:{
        getdata:function(){
            const apinet= "https://ptx.transportdata.tw/MOTC"
            axios.all([
                axios.get(apinet+"/v2/Rail/THSR/DailyTimetable/OD/"+this.getStar+"/to/"+this.getEnd+"/"+this.getdate+"?$format=JSON"),
                axios.get(apinet+"/v2/Rail/THSR/AvailableSeatStatusList/"+this.getStar+"?$format=JSON")
            ])
            .then(axios.spread((time, set)=>{
                
                // console.log(time.data,"time.data");
                // console.log(set.data[0].AvailableSeats,"set.data")

                this.getSter_ch =time.data[0].OriginStopTime.StationName.Zh_tw;
                this.getEnd_ch=time.data[0].DestinationStopTime.StationName.Zh_tw;
                
                this.api_setstate=set.data[0].AvailableSeats.sort((a,b)=>{
                    return a["DepartureTime"] > b["DepartureTime"] ? 1 : -1
                })
                
                for(let i=0;i<=time.data.length;i++){
                    const api_time ={};
                    api_time["DestinationArrivalTime"]=time.data[i].DestinationStopTime.ArrivalTime
                    api_time["StarArrivalTime"]=time.data[i].OriginStopTime.ArrivalTime
                    api_time["TrainDate"]=time.data[i].TrainDate
                    this.api_dailytimetable[time.data[i].DailyTrainInfo.TrainNo] = api_time;
                }
                
                
            }));
        }
    },
    computed:{
        today:function(){
            return this.today= new Date().getHours()+":"+new Date().getMinutes();
        }
    },
    mounted(){
        this.getdata()
    }
}
</script>
