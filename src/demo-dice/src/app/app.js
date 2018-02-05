import 'babel-polyfill';
import 'buefy/lib/buefy.css'
import './app.styl';
import Vue from 'vue/dist/vue.common';
import VueHighCharts from 'vue-highcharts';
import HighCharts from 'highcharts';
import Buefy from 'buefy';
import template from './app.pug';
import {Dice} from '../../../lib/dice';

// Ensure that we're using the official vue router
Vue.use(VueHighCharts,{HighCharts});
Vue.use(Buefy);

// Prepare the main template
Vue.component('app',{
  template: template(),
  created(){ this.reroll(); },
  data(){
    return {
      playerDamageString: '1d6',
      enemyDamageString: '1d8',
      healthChart: null,
      damageChart: null
    };
  },
  methods:{
    reroll(){
      let healthPlayer = 100,
          healthEnemy = 100,
          playerDice = new Dice(this.playerDamageString),
          enemyDice = new Dice(this.enemyDamageString),
          categories = [],
          dataPlayer = [],
          dataEnemy = [],
          combinedArray = [];

      for(let p=playerDice.min;p<=playerDice.max;p++){
        for(let e=enemyDice.max;e>=enemyDice.min;e--){
          healthPlayer = 100; healthEnemy = 100; //reset health
          categories.push(`${p}vs${e}`);
          do{
            healthPlayer-=e;
            if(healthPlayer>0) healthEnemy-=p;
          }while(healthPlayer>0&&healthEnemy>0);
          dataPlayer.push(healthPlayer);
          dataEnemy.push(healthEnemy);
        } //end for
      } //end for
      dataPlayer.forEach((player,i)=>{
        combinedArray.push({
          enemy: dataEnemy[i],
          player,
          category: categories[i],
          value: player-dataEnemy[i]
        });
      });
      combinedArray = combinedArray.sort((a,b,i)=> a.value>b.value?1:-1);
      dataPlayer = combinedArray.map(o=>o.player);
      dataEnemy = combinedArray.map(o=>o.enemy);
      categories = combinedArray.map(o=>o.category);
      this.healthChart = {
        title: {text: 'Health Results Based on Luck'},
        credits: false,
        xAxis: {categories,title:{text: 'Bad Luck to Good Luck'}},
        yAxis: {title: {text: 'Final Health'}},
        series: [
          {name: 'Player', data: dataPlayer},
          {name: 'Enemy', data: dataEnemy}
        ]
      };

      // damage chart is just random damage numbers using the 
      // input boxes
      let dataPlayerDamage = [],
          dataEnemyDamage = [];

      for(let i=0;i<50;i++){
        dataPlayerDamage.push(playerDice.roll());
        dataEnemyDamage.push(enemyDice.roll());
      } //end for
      this.damageChart = {
        title: {text: 'Damage Results Randomly Calculated'},
        credits: false,
        xAxis: {categories,title:{text: 'Beginning to End of Battle'}},
        yAxis: {title: {text: 'Damage Amount'}},
        series: [
          {name: 'Player', data: dataPlayerDamage},
          {name: 'Enemy', data: dataEnemyDamage}
        ]
      };
    }
  }
});

// initialize the application
export const app = new Vue({el: '#demo-dice'});
