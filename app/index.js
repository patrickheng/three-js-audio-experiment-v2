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

  let sphereFolder = gui.addFolder('Sphere');
  let cubeFolder = gui.addFolder('Cube');
  let ringFolder = gui.addFolder('Ring');
  let planeFolder = gui.addFolder('Plane');

  gui.add(webgl, 'usePostprocessing');

  sphereFolder.add(webgl.sphere, 'active').onChange(function(value) {
    webgl.sphere.toggleMesh();
  });
  cubeFolder.add(webgl.cube, 'active').onChange(function(value) {
    webgl.cube.toggleMesh();
  });
  ringFolder.add(webgl.ring, 'active').onChange(function(value) {
    webgl.ring.toggleMesh();
  });
  planeFolder.add(webgl.plane, 'active').onChange(function(value) {
    webgl.plane.toggleMesh();
  });

  sphereFolder.open();
  cubeFolder.open();
  ringFolder.open();
  planeFolder.open();

  //Stats js
  stats = new Stats();
  stats.setMode(0); // 0: fps, 1: ms

  // Align top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';

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
    r: (parseInt(color.r) + 0x10000).toString(16).substr(-2).toUpperCase(),
    g: (parseInt(color.g) + 0x10000).toString(16).substr(-2).toUpperCase(),
    b: (parseInt(color.b) + 0x10000).toString(16).substr(-2).toUpperCase()
  }
  let newColor = "0x" + hex.r + hex.g + hex.b;
  console.log('newColor', newColor)
  return newColor;
}
