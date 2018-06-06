import './app.styl';
import {Easel,Ion} from '../../../lib/';

const easel = new Easel(),
      waterfall = new Ion(easel);

// Launch application if easel was able to create a canvas,
// if it wasn't then we know canvas isn't supported
let noscript = document.querySelector('app');

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
  waterfall.quantity = 1000;
  waterfall.tweenDuration = 500;
  waterfall.startX = ()=> Math.random()*easel.viewport.w/4+easel.viewport.w/8*3;
  waterfall.startY = ()=> 1;
  waterfall.endX = ()=> Math.random()*easel.viewport.w/4+easel.viewport.w/8*3;
  waterfall.endY = ()=> easel.viewport.h
  waterfall.windX = ()=> Math.random()*3-1.5;
  waterfall.size = ()=> Math.random()*2+1;
  waterfall.tweenCurrent = ()=> Math.random()*waterfall.tweenDuration;
  waterfall.tweenType = 'ease-out-bounce';
  waterfall.onEscape = waterfall.reevaluate;
  waterfall.onParticleEnd = waterfall.reevaluate;
  waterfall.populate();
  waterfall.process();
} //end if
