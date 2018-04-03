# Ink Demo

## Main functions
The structure of the call is as follows:
```
ink(colorString,optionsObject);
```

colorString may be 6 character hex
```
ink('#ffffff') // outputs 'rgba(255,255,255,1)'
```

colorString may be 3 character hex
```
ink('#fff') // outputs 'rgba(255,255,255,1)'
```

colorString may be rgba
```
ink('rgba(255,255,255,1)') // outputs 'rgba(255,255,255,1)'
```

colorString may be rgb
```
ink('rgb(255,255,255)') // outputs 'rgba(255,255,255,1)'
```

colorString may be hsla
```
ink('hsla(0,100%,100%,0.5)') // outputs 'rgba(255,255,255,0.5)'
```

colorString may be hsl
```
ink('hsl(0,100%,100%)') // outputs 'rgba(255,255,255,1)'
```

optionsObject may contain a format attribute with one of the following
values: 'hex', 'rgb', 'rgba', 'hsl', 'hsla', 'hsva', 'hsv', 'hsba', 'hsb', 'object'
If opacity manipulation occurs and an output is chosen that doesn't
support opacity, any opacity inputs will be ignored.
```
ink('hsla(0,100%,100%,0.3)',{format: 'hex'}) // outputs '#ffffff'
ink('#fff',{format: 'object'}) // outputs {r:255,g:255,b:255,a:1}
```

optionsObject may contain color weights of values between 0 and 1
```
ink('#fff',{r: 0.5, g:1, b:0.5}) // outputs 'rgba(127,255,127,1)'
```

optionsObject may contain an alpha value between 0 and 1
```
ink('#fff',{a: 0.5}) // outputs 'rgba(255,255,255,0.5)'
```

optionsObject may contain minLightness value between 0 and 1
it will ensure the result is at least as bright as this percent
```
ink('#333',{minLightness: 0.3}) // outputs 'rgba(91,91,91,1)'
```

optionsObject may contain maxLightness value between 0 and 1
it will ensure the result is no brighter than this percent
```
ink('#fff',{maxLightness: 0.8}) // outputs 'rgba(202,202,202,1)'
```

optionsObject may contain lightness value between 0 and 1
this will override any min or max lightness values sent in if they exists
```
ink('#fff',{lightness: 0.8}) // outputs 'rgba(202,202,202,1)'
```

optionsObject may contain minSaturation value between 0 and 1
it will ensure the result is at least as saturated as this percent
if the color type input wasn't a hsl(a) value and there wasn't a hue
property passed in and the color is a shade of gray then the hue will
be 0 by default (red).
hue is a value between 0 and 360 and represents degrees
```
ink('#878787',{minSaturation: 0.32}) // outputs 'rgba(174,97,97,1)'
ink('#878787',{minSaturation: 0.32, hue: 105}) // outputs 'rgba(116,174,97,1)'
ink('#50AF50',{minSaturation: 0.61}) // outputs 'rgba(50,205,50,1)'
```

optionsObject may contain maxSaturation value between 0 and 1
it will ensure the result is no more saturated than this percent
if the color type input wasn't a hsl(a) value and there wasn't a hue
property passed in and the color is a shade of gray then the hue will
be 0 by default (red).
hue is a value between 0 and 360 and represents degrees
```
ink('#0f0',{maxSaturation: 0.5}) // outputs 'rgba(191,64,64,1)'
```

optionsObject may contain saturation value between 0 and 1
this will override any min or max saturation values sent in if they exist
```
ink('#64CE5A',{saturation: 0.17,format: 'hex'}) // outputs '#85A682';
```

## Helper functions
You can use any color string as a source and then specify the output. Merely import the helper function specifically.
```
import {convert2rgba} from 'ion-cloud';
```

- convert2rgba(colorString)
- convert2rgb(colorString)
- convert2hsba(colorString)
- convert2hsva(colorString)
- convert2hsb(colorString)
- convert2hsv(colorString)
- convert2hlsa(colorString)
- convert2hsl(colorString)
- convert2hex(colorString)
