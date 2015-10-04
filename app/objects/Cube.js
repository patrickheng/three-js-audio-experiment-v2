'use strict';

import THREE from 'three';
import BaseThreeObj from './BaseThreeObj.js';

export default class Cube extends BaseThreeObj {
  constructor() {
    super();

    this.initialGeomVertices = [];

    this.geom = new THREE.CubeGeometry(25, 25, 25, 5, 5, 5);

    this.mat = new THREE.MeshBasicMaterial({
      color: 0x16a085,
      side: THREE.DoubleSide,
      wireframe: true,
      opacity: 0.8,
      transparent : true
    });

    this.active = true;
    this.addMesh();
    this.saveVertices();
  }

  update(audioData) {
    for (let i = 0; i < this.mesh.geometry.vertices.length; i++) {

      this.mesh.geometry.vertices[i].x = this.initialGeomVertices[i].x * (audioData[i] / 400);
      this.mesh.geometry.vertices[i].y = -this.initialGeomVertices[i].y * (audioData[i] / 400);
      this.mesh.geometry.vertices[i].z = this.initialGeomVertices[i].z * (audioData[i] / 400);
    }
    this.mesh.geometry.verticesNeedUpdate = true;
    this.rotation.y -= 0.005;
    this.rotation.x += 0.005;
    this.rotation.z += 0.005;
  }
}
