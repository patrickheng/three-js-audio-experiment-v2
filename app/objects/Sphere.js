'use strict';

import THREE from 'three';
import BaseThreeObj from './BaseThreeObj.js';

export default class Sphere extends BaseThreeObj {
  constructor() {
    super();

    this.initialGeomVertices = [];

    this.geom = new THREE.SphereGeometry(60, 40, 40);

    this.mat = new THREE.MeshBasicMaterial({
      color: 0xFF5252,
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
      this.mesh.geometry.vertices[i].y = this.initialGeomVertices[i].y * (audioData[i] / 300);
      this.mesh.geometry.vertices[i].z = this.initialGeomVertices[i].z * (audioData[i] / 100);
    }
    this.mesh.geometry.verticesNeedUpdate = true;
  }
}
