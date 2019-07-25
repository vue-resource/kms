<script>
import moment from "moment";
let Atime = new moment()
export default {
    name: 'login',
    props: {

    },
    data () {
        return {
          lists:[
            {id:1,startTime:'选择开始时间',endTime:"选择结束时间"}
         ],
         value1:Atime.format('YYYY/MM/DD'),
         value2:Atime.format('YYYY/MM/DD'),
         form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        options: [{
          value: '选项1',
          label: '张三'
        }, {
          value: '选项2',
          label: '李四'
        }, {
          value: '选项3',
          label: '王五'
        }],
        value: ''
 
        }
      
    },
    computed: {

    },
    watch: {

    },
    // 生命周期
    created () {

    },
    methods: {
      addNewList:function(e){
        console.log(this,this.index)
     
         this.lists.unshift({
             id:this.index++,
             startTime:'选择开始时间',
             endTime:"选择结束时间"
         })
         console.log(this.lists)
        //  this.newAddText=''
     }
    }
}
</script>

<template>

  <div class="proAddBox">
      <div class="creat">
        创建项目
      </div>
       
      <div class="addMain">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="活动名称">
              <el-input v-model.trim="form.name"></el-input>
            </el-form-item>
        </el-form>
          <div class="detips">
           <span>项目名称:</span>
           <input type="text"  placeholder="K11项目" class="userInp">
         </div>
         <div class="detips">
           <span>项目简介:</span>
           <input type="text"  placeholder="K11" class="userInp">
         </div>
         <div class="Addweek">
           <span class="Addlist">项目周期:</span>
           
            <ul class="Astrict">
              <li v-for='(list,index) in lists' v-bind:key='index'>             
                <input type="text"  placeholder="Q1" class="depat">
                <!-- <span>{{list.startTime}}</span> -->
                <!-- {{list.endTime}} -->
                <span class="block">
                  <span class="demonstration">{{list.startTime}}</span>
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    class="startDate"
                   
                    placeholder="start日期">
                  </el-date-picker>
                </span>
                <!-- <span>{{list.endTime}}</span> -->
                <span class="blockTwo">
                  <span class="demonstration">{{list.endTime}}</span>
                  <el-date-picker
                    v-model="value2"
                    type="date"
                    class="endDate"
                    placeholder="end日期">
                  </el-date-picker>
                </span>
              </li>
            </ul>
            <button @click='addNewList'>继续添加周期</button>
         </div>
         <div class="description">
           <span>项目描述:</span>
           <textarea rows="3" cols="20" class="textAre">
             K11项目是我司战略上最重要的一款车型。  
            </textarea>
         </div>
         <div class="people">
            <span>项目负责人:</span>
            <el-select v-model="value" placeholder="李工">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
         </div>
          <div class="description">
           <span>项目成员:</span>
           <textarea rows="3" cols="20" class="textAre">
             K1222项目成员。  
            </textarea>
         </div>
         <el-button type="primary" class="submitTxt">提交</el-button>
      </div>
  </div>
</template>
<style lang="less">
  .proAddBox{
    border: 1px solid #ccc;
    width:980px;
    height: 724px;
    border-radius:5px;
    margin:0 auto; 
    .creat{
      padding-top: 20px;
      padding-left:20px;
      font-weight: bold;
    }
    .addMain{
      padding-top:25px;
      padding-left:30px;
      .Addweek{
        padding-bottom: 15px;
       .Addlist{
        display: inline-block;
       }
       .startDate{
         width:150px;
         display: inline-block;
       }
       .endDate{
         width:150px;
         display: inline-block;
       }
      }
      
      .Astrict{
        display: inline-block;
        margin-left:20px;
        li{
          padding-bottom: 10px;

          .block{
            padding-left:35px;
          }
          .blockTwo{
            padding-left:15px;
          }
        }
      }
      .detips{
        padding-bottom: 15px;
        .userInp{
          width:400px;
          display: inline-block;
          margin-left: 20px;
        }
      }
      .description{
        padding-bottom: 15px;
        .textAre{
          width:830px;
          height: 110px;
          margin-left:20px;
          vertical-align: text-top;
        }   
      }
      .people{
        padding-bottom: 15px;
      }
      .submitTxt{
        marigin-top:20px;
      }
    }
  }
</style>
