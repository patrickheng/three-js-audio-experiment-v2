'use strict';

import THREE from 'three';
import BaseThreeObj from './BaseThreeObj.js';

export default class Cube extends BaseThreeObj {
  constructor() {
    super();

    this.initialGeomVertices = [];

    this.geom = new THREE.CubeGeometry(30, 30, 30, 5, 5, 5);

    this.mat = new THREE.MeshBasicMaterial({
      color: 0x16a085,
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
      this.mesh.geometry.vertices[i].y = -this.initialGeomVertices[i].y * (audioData[i] / 100);
      this.mesh.geometry.vertices[i].z = this.initialGeomVertices[i].z * (audioData[i] / 100);
    }
    this.mesh.geometry.verticesNeedUpdate = true;
  }
}
