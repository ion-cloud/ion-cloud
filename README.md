# ion-cloud
[![Build Status](https://travis-ci.org/NathanielInman/ion-cloud.svg?branch=master)](https://travis-ci.org/NathanielInman/ion-cloud) [![dependency Status](https://david-dm.org/NathanielInman/ion-cloud/status.svg?style=flat)](https://david-dm.org/NathanielInman/ion-cloud) [![devDependency Status](https://david-dm.org/NathanielInman/ion-cloud/dev-status.svg?style=flat)](https://david-dm.org/NathanielInman/ion-cloud#info=devDependencies)

![Example](https://media.giphy.com/media/1mhjCBjncfr37OiNd1/giphy.gif)

# Table of Contents
* [Description](#description)
* [Easel Setup](#easel-setup)
* [Ion Setup](#ion-setup)
* [IonCloud Setup](#ioncloud-setup)
* [Ink Setup](#ink-setup)
* [Phaser Setup](#phaser-setup)
* [Dice Setup](#dice-setup)

## Description
Ion Cloud is a *tiny* 2d animation library for javascript, it comes with 6 choosable parts:
  - **Easel** : *sets up a canvas that can fill a screen and automatically resize*
  - **Ion** : *tweaning and basic animation instance*
    - [here is the documentation](https://github.com/NathanielInman/ion-cloud/tree/master/src/demo-ion)
  - **Ion Cloud** : *animation collections and scene management*
  - **Ink** : *A tiny color manipulation and translation library with robust validation and error handling that shines in places where you can't trust the input color or random generation and games*
    - translate between color spaces: hex, cmyk, rgb, rgba, hsl, hsla, hsva, hsv, hsba or hsb
    - apply weights to r(ed),g(green),b(lue),l(ightness) or s(aturation)
    - apply a minimum or maximum lightness threshold on a color
    - coerce a color to a certain lightness percent
    - apply a minimum or maximum saturation threshold on a color
    - coerce a color to a certain saturation percent
    - apply an alpha value
    - output to javascript object {r,g,b,a}
    - [here is the documentation](https://github.com/NathanielInman/ion-cloud/tree/master/src/demo-ink)
  - **Phaser** : *gradient animation and initialization helper*
  - **Dice**: *take a complex dice string and compute results based on it.*
    - `3d8+23-2d4` would roll 3 8-sided dice, add 23 then subtract the results of 2 rolled 4-sided dice

If you need help setting up a project using `ion-cloud` you can use a scaffolding engine like `slush`. For more information see [this project](https://www.npmjs.com/package/slush-jugs).

## Easel Setup
The actual setup is really just one line of code. Here we set easel up and draw text in the center of the screen.
```
import {Easel} from 'ion-cloud';

const easel = new Easel(); //this initializes the library and creates easel

// now lets draw something on the canvas
easel.ctx.textAlign='center';
easel.ctx.fillStyle='#f00';
easel.ctx.fillText('This text is in the center of the screen.',easel.viewport.w/2,easel.viewport.h/2);
```
If you want to run code every time the window is resized you can attribute it to the `config` function.
```
easel.config = ()=>{

  // inside this function we'll have an updated value for the viewport
  console.log(easel.viewport);
};
```
It's common in games to have a draw loop for things like animations. Easel provides a simple way of accomplishing this.
```
easel.onDraw = function main(){
  // draw stuff in here
  requestAnimationFrame(main); //use browser function to acquire best time to loop
};
easel.redraw(); //initiate a draw causing the main loop.
```

## Ion Setup
Ion can be used individually or with IonCloud. A single Ion instance is a collection of particles. IonCloud helps facilitate the animation of multiple instances into a scene and provide scene management. Setting up with IonCloud is in another section below. Here we will create an animation using Ion and Easel that will look like *gnats* floating around the screen.

You can view the following example running on codepen [here](https://codepen.io/NathanielInman/pen/ogYjwE).
A fountain example that shows how `windStatic` may be used is available [here](https://codepen.io/NathanielInman/pen/LEbpye).
A waterfall example may be seen [here](https://codepen.io/NathanielInman/pen/yyVYXe).
For detailed help information on Ion see [here](https://github.com/NathanielInman/ion-cloud/tree/master/src/demo-ion).
```
import {Ion,Easel} from 'ion-cloud';

const easel = new Easel(),
      gnats = new Ion(easel); //we initialize ion and pass it our easel instance

gnats.quantity = 1000; //this is how many particles(gnats) will appear
gnats.tweenDuration = 1000; //this is how many frames to completion
gnats.startX = ()=> Math.random()*easel.viewport.w; //allow random start x
gnats.startY = ()=> Math.random()*easel.viewport.h; //allow random start y
gnats.endX = ()=> Math.random()*easel.viewport.w; //allow random end x
gnats.endY = ()=> Math.random()*easel.viewport.h; //allow random end y
gnats.windX = ()=> Math.random()-0.5; //allow random x fluctuations to get us off-course
gnats.windY = ()=> Math.random()-0.5; //allow random y fluctuations to get us off-course
gnats.size = ()=> Math.random()*2; //allow the gnat size to be between 0 and 2
gnats.tweenCurrent = ()=> Math.random()*gnats.tweenDuration;
gnats.tweenType = 'ease-in-out-cubic';
gnats.onEscape = atom=> gnats.reevaluate(atom); //if it leaves screen reset entirely
gnats.onParticleEnd = atom=>{

  // on completion(reaching target), acquire a new target to gnat
  // is constantly moving unless it goes off screen
  atom.originX = atom.startX = atom.x
  atom.originY = atom.startY = atom.y
  atom.endX = atom.terminalX = gnats.endX();
  atom.endY = atom.terminalY = gnats.endY();
  atom.tweenCurrent = 0;
}
gnats.populate(); //now we populate them all at once (you can pass a ms defer timer)
gnats.process(); //since we're not using IonCloud we'll allow Ion to handle the animation
```

## IonCloud Setup
Setting up ion cloud is pretty simple:
```
import {Easel,Ion,IonCloud} from 'ion-cloud';

const easel = new Easel(), //create our canvas instance
      scene = new IonCloud(easel,Ion); //pass the ion class and easel instance into instantiation

// we can set the camera if we want, these are the default so the following line isn't
// necessary
scene.camera = {
  x: 0,
  y: 0,
  dx: 0,
  dy: 0
};

// now we add the bubbles cloud to the scene with these settings
scene.animate('bubbles',{
  startX: easel.viewport.w/4,
  startY: easel.viewport.h/4,
  width: easel.viewport.w/2,
  height: easel.viewport.h/2,
  distance: 20, //this is how high each bubbles goes before reevaluating
  quantity: 500, //this is how many bubbles(particles) we want
  duration: 500 //this is the tweenDuration per bubble(particle)
});

scene.draw(); //this starts the animation loop for all clouds instanced
```

## Ink Setup
Ink requires no setup and is a collection of utility libraries. Here are all that can be imported:
  - ink
  - convert2rgba(colorString)
  - convert2rgb(colorString)
  - convert2hsba(colorString)
  - convert2hsva(colorString)
  - convert2hsb(colorString)
  - convert2hsv(colorString)
  - convert2hlsa(colorString)
  - convert2hsl(colorString)
  - convert2hex(colorString)

Merely import them from `ion-cloud` like so:
```
import {ink} from 'ion-cloud';

//outputs 'rgb(255,255,255)'
console.log(ink('#fff',{format: 'rgb'}));
```
You can view the full `ink` help files and functions [here](https://github.com/NathanielInman/ion-cloud/tree/master/src/demo-ink).

## Phaser Setup
Please see code example [here](https://github.com/NathanielInman/ion-cloud/blob/master/src/demo-phaser/src/app/app.js).

## Dice Setup
Merely import the Dice library and pass it a string to create an instance like so:
```
import {Dice} from 'ion-cloud';

let myDice = new Dice('3d12+17-3d4');

console.log(myDice.min); //shows the minimum amount possible
console.log(myDice.max); //shows the maximum amount possible
console.log(myDice.roll()); //generates a random roll based on the string
```
Please see code example [here](https://github.com/NathanielInman/ion-cloud/blob/master/src/demo-dice/src/app/app.js).
