'use strict';

import THREE from 'three';
import BaseThreeObj from './BaseThreeObj.js';

export default class Plane extends BaseThreeObj {
  constructor() {
    super();

    this.initialGeomVertices = [];

    this.geom = new THREE.PlaneGeometry(50, 50, 20, 20);

    this.mat = new THREE.MeshBasicMaterial({
      color: 0x34495e,
      side: THREE.DoubleSide,
      wireframe: true
    });

    this.active = true;
    this.addMesh();
    this.saveVertices();

  }

  update(audioData) {
    for (let i = 0; i < this.mesh.geometry.vertices.length; i++) {

      this.mesh.geometry.vertices[i].x = this.initialGeomVertices[i].x * (audioData[i] / 100);
      this.mesh.geometry.vertices[i].y = -this.initialGeomVertices[i].y * (audioData[i] / 200);
      this.mesh.geometry.vertices[i].z = this.initialGeomVertices[i].z * (audioData[i] / 100);
    }
    this.mesh.geometry.verticesNeedUpdate = true;
    this.rotation.y -= 0.005;
  }
}
