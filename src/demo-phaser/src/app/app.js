import 'file-loader?name=[name].html!./index.jade';
import './app.styl';
import {easel} from 'ion-cloud';
import {Phaser} from '../../../lib/phaser';

// Launch application if easel was able to create a canvas,
// if it wasn't then we know canvas isn't supported
let noscript = document.getElementById('noscript'),
    topColor = {
      current: {r:  0,g:  0,b:  0},
      dawn:    {r:119,g:153,b:187},
      daytime: {r:204,g:238,b:255},
      dusk:    {r:135,g: 51,b: 85},
      midnight:{r:  0,g:  0,b: 17}
    },
    bottomColor = {
      current: {r:  0,g:  0,b:  0},
      dawn:    {r:153,g: 85,b: 51},
      daytime: {r:170,g: 85,b: 51},
      dusk:    {r:  0,g: 17,b: 34},
      midnight:{r:153,g: 87,b: 22}
    },
    colors = [topColor,bottomColor],
    drawFn = ()=> [0,0,v.w,v.h],
    gradientFn = ()=> ctx.createLinearGradient(0,0,0,v.h/5*4),
    dayCycle = new Phaser(100,'dawn',colors,ctx,drawFn,gradientFn);

if(!easel.activated){
  noscript.innerHTML = `
  <p class="browsehappy">
    You are using an outdated browser. Please
    <a href="http://browsehappy.com/"> upgrade your browser</a>
    to improve your experience.
    <span style="color:red;"><br/>Canvas isn't supported in your browser.</span>
  </p>`;
}else{
  noscript.style.visibility='hidden';
  easel.onDraw = ()=> dayCycle.drawNext(true);
  (function main(){
    easel.redraw();
    requestAnimationFrame(main);
  })();
} //end if
