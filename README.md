# ion-cloud

[![Build Status](https://travis-ci.org/NathanielInman/ion-cloud.svg?branch=master)](https://travis-ci.org/NathanielInman/ion-cloud) [![dependency Status](https://david-dm.org/NathanielInman/ion-cloud/status.svg?style=flat)](https://david-dm.org/NathanielInman/ion-cloud) [![devDependency Status](https://david-dm.org/NathanielInman/ion-cloud/dev-status.svg?style=flat)](https://david-dm.org/NathanielInman/ion-cloud#info=devDependencies)

Ion Cloud is a *tiny* 2d animation library for javascript, it comes with 5 choosable parts:
  - **Easel** : *sets up a canvas that can fill a screen and automatically resize*
  - **Ion** : *tweaning and basic animation instance*
  - **Ion Cloud** : *animation collections and scene management*
  - **Ink** : *A tiny color manipulation and translation library with robust validation and error handling that shines in places where you can't trust the input color or random generation and games*
    - translate between color spaces: hex, cmyk, rgb, rgba, hsl, hsla, hsva, hsv, hsba or hsb
    - apply a minimum or maximum lightness threshold on a color
    - coerce a color to a certain lightness percent
    - apply a minimum or maximum saturation threshold on a color
    - coerce a color to a certain saturation percent
    - apply an alpha value
    - output to javascript object {r,g,b,a}
    - [here is the documentation](https://github.com/NathanielInman/ion-cloud/tree/master/src/demo-ink)
  - **Phaser** : *gradient animation and initialization helper*
