import {IonCloud} from './vendor/';

let scene = new IonCloud();

export {scene};

export function demo(){
  scene.animate('flame',{
    startX: 250,
    startY: 200,
    width: 100,
    height: 120,
    color: 'rgba(250,50,0,0.05)',
    quality: 100
  });
  scene.animate('vortex',{
    startX: -250,
    startY: -250,
    size: 400,
    density: 200,
    iterations: 300,
    callback: ()=>{
      scene.animate('laser',{
        startX: -250,
        startY: -250,
        endX: -150,
        endY: 250,
        size: 10
      });
    }
  });
  scene.draw();
  scene.clearScene=()=>{
    // Clear screen
    ctx.fillStyle='#000';
    ctx.fillRect(0,0,v.w,v.h);

    // Draw a ground
    ctx.fillStyle='rgba(10,80,10,0.7)';
    ctx.fillRect(0,v.h/4*3,v.w,v.h/4);
  };
  setInterval(()=>{
    if(scene.camera.dx===0){
      scene.camera.x--;
    }else{
      scene.camera.x++;
    } //end if
    if(scene.camera.x<(v.w/2-100)||scene.camera.x>(v.w/2+100))scene.camera.dx^=1;
  },10);
  scene.draw();
} //end app()
