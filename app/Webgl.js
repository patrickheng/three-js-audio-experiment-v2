'use strict';

import Sphere from './objects/Sphere';
import Plane from './objects/Plane';
import Cube from './objects/Cube';
import Ring from './objects/Ring';
import THREE from 'three';

window.THREE = THREE;

let OrbitControls = require('three-orbit-controls')(THREE)


export default class Webgl {
  constructor(width, height, audio) {
    this.audio = audio;



    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
    this.camera.position.z = 100;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0))

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x262626);

    this.usePostprocessing = true;
    this.composer = new WAGNER.Composer(this.renderer);
    this.composer.setSize(width, height);
    this.initPostprocessing();

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.plane = new Plane();
    this.plane.position.set(0, 0, 0);
    this.scene.add(this.plane);

    this.cube = new Cube();
    this.cube.position.set(0, 0, 0);
    this.scene.add(this.cube);

    this.sphere = new Sphere();
    this.sphere.position.set(0, 0, 0);
    this.scene.add(this.sphere);

    this.ring = new Ring();
    this.ring.position.set(0, 0, 0);
    this.scene.add(this.ring);

    this.ring.removeMesh();
    this.cube.removeMesh();
    this.plane.removeMesh();

  }

  initPostprocessing() {
    if (!this.usePostprocessing) return;

    this.vignette2Pass = new WAGNER.Vignette2Pass();
  }

  resize(width, height) {
    this.composer.setSize(width, height);

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  };

  render() {
    if (this.usePostprocessing) {
      this.composer.reset();
      this.composer.renderer.clear();
      this.composer.render(this.scene, this.camera);
      this.composer.pass(this.vignette2Pass);
      this.composer.toScreen();
    } else {
      this.renderer.autoClear = false;
      this.renderer.clear();
      this.renderer.render(this.scene, this.camera);
    }

    let audiData = this.audio.getAudioData();

    if(this.plane.active)
      this.plane.update(audiData);
    if(this.sphere.active)
      this.sphere.update(audiData);
    if(this.cube.active)
      this.cube.update(audiData);
    if(this.ring)
      this.ring.update(audiData);
  }
}
