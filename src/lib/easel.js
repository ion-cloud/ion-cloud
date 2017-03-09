/*eslint-disable */
export class Easel{
  constructor(is3d){
    if(!!window.CanvasRenderingContext2D){
      this.activated = true; }else{
      this.activated = false;
      return false;
    } //end if
    this.canvas = document.createElement('canvas');
    if(is3d){
      this.ctx = this.canvas.getContext('webgl');
    }else{
      this.ctx = this.canvas.getContext('2d');
    } //end if
    this.viewport = this.acquireViewport();
    this.r = function(f, g, e) {
        f = !g ? 0 * (g = f) : f > g ? g + (d = f) - g : f;
        e = e || 0;
        g = M.random() * (g - f) + f;
        return e ? g | 0 : g;
    };
    window.onresize = ()=>{
        this.viewport = this.acquireViewport();
        this.resizeCanvas();
        this.config();
        this.redraw();
    };
    this.background = '#000';
    this.started = false;
    document.body.appendChild(this.canvas);

    let d = document.createElement('style');
    d.type = 'text/css';
    d.rel = 'stylesheet';
    d.innerHTML = `body{background-color:${this.background};margin:0;}
                   canvas{position:fixed;left:0;top:0;right:0;bottom:0;}`;
    document.querySelector('head').appendChild(d);
    this.resizeCanvas();
  }
  resizeCanvas(){
    this.canvas.width = v.w;
    this.canvas.height = v.h;
  }
  acquireContext(){
    this.ctx = this.canvas.getContext('2d');
  }
  acquireViewport(){
    let d = window, b = 'inner';

    if(!(d.innerWidth)){
      b = 'client';
      d = document.documentElement || document.body;
    } //end if
    return {
      w: d[b + 'Width'],
      h: d[b + 'Height']
    };
  }
  redraw(){
    if(!this.started){
      this.config();
      this.started=true;
    } //end if
    this.onDraw();
  }
  config(){}
  onDraw(){
    ctx.fillStyle = this.background;
    ctx.fillRect(0, 0, v.w, v.h);
  }
}
export class Easel3d extends Easel{
  constructor(){
    super(true);
  }
}
/*eslint-enable */
