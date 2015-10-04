'use strict';

import domready from 'domready';
import Webgl from './Webgl';
import Audio from './Audio';
import raf from 'raf';
import dat from 'dat-gui';
import Stats from 'stats-js';
import 'gsap';

let webgl;
let audio;
let gui;
let stats;

domready(() => {
  // webgl settings
  audio = new Audio(435);
  webgl = new Webgl(window.innerWidth, window.innerHeight,
    audio);

  document.body.appendChild(webgl.renderer.domElement);

  // GUI settings
  gui = new dat.GUI();
  gui.add(webgl, 'usePostprocessing');
  gui.addColor(webgl.plane.mat, 'color').onChange( function( colorValue  )
    {
      //create a Color
      //let newColor = rgbToHex(colorValue);
      let newColor = 0xCDDC39;
      let colorObject = new THREE.Color( newColor ) ;


      //set the color in the object
      webgl.plane.mat.color = colorObject;
      console.log('colorValue', colorValue)
      console.log('colorObject', colorObject)
    });


  //Stats js
  stats = new Stats();
  stats.setMode(0); // 0: fps, 1: ms

  // Align top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '50%';
  stats.domElement.style.top = '0px';
  stats.domElement.style.transform = 'translate(-50%)';

  document.body.appendChild(stats.domElement);

  // handle resize
  window.onresize = resizeHandler;


  // let's play !
  animate();
});

function resizeHandler() {
  webgl.resize(window.innerWidth, window.innerHeight);
}

function animate() {
  stats.begin();
  raf(animate);
  webgl.render();
  stats.end();
}

function rgbToHex(color) {
    let hex = {
      r : (parseInt(color.r)+0x10000).toString(16).substr(-2).toUpperCase(),
      g : (parseInt(color.g)+0x10000).toString(16).substr(-2).toUpperCase(),
      b : (parseInt(color.b)+0x10000).toString(16).substr(-2).toUpperCase()
    }
    let newColor = "0x" + hex.r + hex.g + hex.b;
    console.log('newColor', newColor)
    return newColor;
}
