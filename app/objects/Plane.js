'use strict';

import THREE from 'three';

export default class plane extends THREE.Object3D {
  constructor() {
    super();

    this.initialGeomVertices = [];

    this.geom = new THREE.PlaneGeometry(50, 50, 20, 20);
    //this.geom = new THREE.SphereGeometry(20, 32, 32);
    this.mat = new THREE.MeshBasicMaterial({
      color: 0xFF5252,
      side: THREE.DoubleSide,
      wireframe: true
    });

    this.mesh = new THREE.Mesh(this.geom, this.mat);

    for (let i = 0; i < this.mesh.geometry.vertices.length; i++) {
      this.initialGeomVertices[i] = {};
      this.initialGeomVertices[i].x = this.mesh.geometry.vertices[i].x;
      this.initialGeomVertices[i].y = this.mesh.geometry.vertices[i].y;
      this.initialGeomVertices[i].z = this.mesh.geometry.vertices[i].z;
    }
    console.log('VERTICES : ', this.mesh.geometry.vertices.length)
    console.log('INIT VERTCES : ', this.initialGeomVertices)
    this.add(this.mesh);

    this.rotation.x = -10;
  }

  update(audioData) {
    for (let i = 0; i < this.mesh.geometry.vertices.length; i++) {

      this.mesh.geometry.vertices[i].z = this.initialGeomVertices[i].z -
        audioData[i] / 5;
    }
    this.mesh.geometry.verticesNeedUpdate = true;
  }


}
