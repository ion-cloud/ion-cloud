# Ion Demo
Ion is a simple particle engine used in 2d animations. In order to help facilitate multiple instances of ion at once, you can refer to the `IonCloud` library available [here](https://github.com/NathanielInman/ion-cloud).

## Ion Instance Variables
- `active` will toggle `requestAnimationFrame` and stop the loop if it is switched off
- `easel` is passed into the instance to help facilitate drawing onto the canvas.
  - You can view how to setup easel specifically [here](https://github.com/NathanielInman/ion-cloud#easel-setup).
- `collection` although mostly used from inside the instance to adjust particles when tweening, this is an array of all particles in the current instance.
- `quantity` this tells ion how many particles requested to populate
- `size` is either a *Number* or *function* that returns a Number where it's value represents the size of the a particle.
- `startX` is either a *Number* or *function* that returns a Number where it's value represents the start location of a particle.
- `startY` is either a *Number* or *function* that returns a Number where it's value represents the start location of a particle.
- `endX` is either a *Number* or *function* that returns a Number where it's value represents the end location of a particle.
- `endY` is either a *Number* or *function* that returns a Number where it's value represents the end location of a particle.
- `windX` is either a *Number* or *function* that returns a Number where it's value represents a turbulent factor that modulates not only the current X but the potential end X as well.
- `windY` is either a *Number* or *function* that returns a Number where it's value represents a turbulent factor that modulates not only the current Y but the potential end Y as well.
- `clear` is a *Boolean* that represents whether or not to clear the frame between animations. If this is turned off, one can apply their own clear with an opacity to cause something like a blurry animation. It's also possible that one might use this to help multiple Ion instances in conjunction of each other.
- `clearColor` is the color used to clear the viewport between frames when `clear` is set to true.
- `tweenCurrent` is either a *Number* or *function* that returns a number which represents the current tween value which should be between 0 and `tweenDuration`
- `tweenDuration` is either a *Number* or *function* that returns a number which represents the total tween frame movements. This number should be greater than zero.
- `tweenSpeed` is a *Number* that represents how fast the tween should occur. It's usually best to keep this at 1.
- `background` is a `ImageData` value or `null` value. When it is not null the `clearFrame` function will use the background data to clear the screen instead. This allows the Ion to coexist with other animations, images etc.
- `tweenType` is either a *String* or *function* that returns a string of the values listed below, representing the current type of tween for the particle.
  - To see all the easing functions as examples see [this live example](https://codepen.io/NathanielInman/pen/gKLNQE/)
  - Here are a list of the easing functions: `linear`, `ease-in-quad`, `ease-out-quad`, `ease-in-out-quad`, `ease-in-cubic`, `ease-out-cubic`, `ease-in-out-cubic`, `ease-in-quart`, `ease-out-quart`, `ease-in-out-quart`, `ease-in-quint`, `ease-out-quint`, `ease-in-out-quint`, `ease-in-sine`, `ease-out-sine`, `ease-in-out-sine`, `ease-in-exponential`, `ease-out-exponential`, `ease-in-out-exponential`, `ease-in-circular`, `ease-out-circular`, `ease-in-out-circular`, `ease-in-elastic-weak`, `ease-in-elastic`, `ease-in-elastic-strong`, `ease-out-elastic-weak`, `ease-out-elastic`, `ease-out-elastic-strong`, `ease-in-out-elastic-weak`, `ease-in-out-elastic`, `ease-in-out-elastic-strong`, `ease-in-back-weak`, `ease-in-back`, `ease-in-back-strong`, `ease-out-back-weak`, `ease-out-back`, `ease-out-back-strong`, `ease-in-out-back-weak`, `ease-in-out-back`, `ease-in-out-back-strong`, `ease-in-bounce`, `ease-out-bounce`, `ease-in-out-bounce`

## Ion Internal-Usage Functions
  - `tween` is a function that takes a particle and axis and returns the current location for that particle and axis. This is mostly just used by the library itself, unless using Ion as a tweening library. It takes optional variables that it calls upon itself recursively as its third parameter in an object
    - `o` - optional strength value, used for ease-in-elastic
    - `d` - tween duration
    - `t` - tween current
    - `type` - tween requested type
    - `b` - beginning value
    - `c` - current value`
  - `getNew` is a function that takes a particle id as its parameter. this function uses the ion libraries values to establish base defaults for the creation of a new particle for which it returns.
  - `wind` is a static function that takes a particle as a parameter. It applies the wind factors if they exist for a particle.
  - `draw` is a function that takes a particle and isClear as its parameters. It will simply draw that particle.
  - `clear` is a function that clears a particle.
  - `clearFrame` is a function that clears the entire viewport.
  - `getFrame` is a function that operates on the tweening functions for all particles.

## Ion External-Usage Functions
  - `reset` is a static function that takes a particle as a parameter and merely resets the particle to its beginning location. It will have its original start and end positions
  - `reevaluate` is a function that takes a particle as a parameter and reevaluates start and end locations for that particle. It will have different start and end positions.
  - `populate` is a function that takes a wait parameter optionally. When the wait is not there it will populate all of the `quantity` specified of particles into the ion library immediately; otherwise it will wait the specified milliseconds in-between populating particles.
  - `process` this function takes no arguments and once executed will begin animation until the `active` variable is set to false.
  - `onCreate` is an overridable lifecycle hook function that is called right before any properties are added to a particle and before it begins animating. This allows custom properties to be populated into the particle. It will have the particle in its first argument.
  - `afterCreate` is an overridable lifecycle hook function that is called right after all properties are added to a particle and before it begins animating. This allows custom properties to be populated or existing properties to be modulated before animation begins. It will have the particle in its argument.
  - `onMove` is an overridable lifecycle hook function that is called right before a particle is moved. it will have the particle as its first argument.
  - `onParticleEnd` is an overridable lifecycle hook function that is called right after a particle reaches its tweenDuration. It will have the particle in its first argument.
  - `onEscape` is an overridable lifecycle hook function that is called when a particle leaves the viewport. It will have the particle in its first argument.
  - `afterDraw` is an overridable lifecylce hook function that is called after all particles are drawn on the screen during its current frame. It will have the ion instance applied to `this`.

## Example

You can view the following example running on codepen [here](https://codepen.io/NathanielInman/pen/ogYjwE).
An fountain example that shows how `windStatic` may be used is available [here](https://codepen.io/NathanielInman/pen/LEbpye).
An waterfall example may be seen [here](https://codepen.io/NathanielInman/pen/yyVYXe).
A bubble example may be seen [here](https://codepen.io/NathanielInman/pen/pKyNVb).

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
