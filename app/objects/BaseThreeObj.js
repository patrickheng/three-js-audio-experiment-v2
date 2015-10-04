'use strict';

import THREE from 'three';

export default class BaseThreeObj extends THREE.Object3D {
  constructor() {
    super();
  }

  saveVertices() {
    for (let i = 0; i < this.mesh.geometry.vertices.length; i++) {
      this.initialGeomVertices[i] = {};
      this.initialGeomVertices[i].x = this.mesh.geometry.vertices[i].x;
      this.initialGeomVertices[i].y = this.mesh.geometry.vertices[i].y;
      this.initialGeomVertices[i].z = this.mesh.geometry.vertices[i].z;
    }
  }

  toggleMesh() {
    if (!this.active) {
      this.removeMesh();
    } else {
      this.addMesh();
    }
  }

  addMesh() {
    this.mesh = new THREE.Mesh(this.geom, this.mat);
    this.mesh.position.y = -10;
    this.add(this.mesh);
    this.active = true;
  }

  removeMesh() {
      this.remove(this.mesh);
      this.active = false;
  }

  update(audioData) {
    for (let i = 0; i < this.mesh.geometry.vertices.length; i++) {

      this.mesh.geometry.vertices[i].x = this.initialGeomVertices[i].x * (audioData[i] / 100);
      this.mesh.geometry.vertices[i].y = this.initialGeomVertices[i].y * (audioData[i] / 100);
      this.mesh.geometry.vertices[i].z = this.initialGeomVertices[i].z * (audioData[i] / 100);
    }
    this.mesh.geometry.verticesNeedUpdate = true;
  }
}
