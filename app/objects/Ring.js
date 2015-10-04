'use strict';

import THREE from 'three';
import BaseThreeObj from './BaseThreeObj.js';

export default class Ring extends BaseThreeObj {
  constructor() {
    super();

    this.initialGeomVertices = [];

    this.geom = new THREE.RingGeometry(20, 5, 32);

    this.mat = new THREE.MeshBasicMaterial({
      color: 0xa66bbe,
      side: THREE.DoubleSide,
      wireframe: true,
      opacity: 0.2,
      transparent : true
    });

    this.active = true;
    this.addMesh();
    this.saveVertices();
  }

  addMesh() {
    this.mesh = new THREE.Mesh(this.geom, this.mat);
    this.mesh.position.y = -10;
    this.mesh.rotation.x =  1.5;
    this.add(this.mesh);
    this.active = true;
  }

  update(audioData) {
    for (let i = 0; i < this.mesh.geometry.vertices.length; i++) {

      this.mesh.geometry.vertices[i].x = this.initialGeomVertices[i].x * (audioData[i] / 100);
      this.mesh.geometry.vertices[i].y = this.initialGeomVertices[i].y * (audioData[i] / 300);
      this.mesh.geometry.vertices[i].z = this.initialGeomVertices[i].z * (audioData[i] / 100);
    }
    this.mesh.geometry.verticesNeedUpdate = true;
    this.rotation.y += 0.005;
  }
}
