AFRAME.registerComponent('group', {
    init: function () {
      this.group = new THREE.Group();
      this.el.object3D.add(this.group);
      for (let i = 0; i < this.el.children.length; i++) {
        this.group.add(this.el.children[i].object3D);
      }
    },
  });