'use strict';

import THREE from 'three';

export default class Cube extends THREE.Object3D {
  constructor() {
    super();

    this.geom = new THREE.BoxGeometry(10, 10, 10);
    this.mat = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true
    });
    this.mesh = new THREE.Mesh(this.geom, this.mat);

    this.add(this.mesh);
  }

  update() {
    this.rotation.x += 0.01;
    this.rotation.z += 0.01;
  }
}