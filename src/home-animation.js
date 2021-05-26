import * as THREE from 'three-js/three'

export default class HeaderScene {
  constructor(canvas) {
    this.canvas = canvas
    this.colors = {
      red: 0xf25346,
      yellow: 0xedeb27,
      white: 0xd8d0d1,
      brown: 0x59332e,
      pink: 0xf5986e,
      brownDark: 0x23190f,
      blue: 0x68c3c0,
      green: 0x458248,
      purple: 0x551a8b,
      lightgreen: 0x629265
    }
    this.mousePos = { x: 8, y: 0 }
    this.offSet = -600
  }

  init = theme => {
    try {
      this.createScene(this.canvas.current, theme)
      this.createLights()
      this.createPlane()
      this.createOrbit()
      this.createSun()
      this.createLand()
      this.createForest()
      this.createSky()
      window.addEventListener('mousemove', this.handleMouseMove, false)
      // window.addEventListener('load', this.init, false)

      this.loop()
    } catch (error) {}
  }

  updateFog = theme => {
    if (theme === 'light') {
      this.scene.fog = new THREE.Fog(0xfdf0de, 200, 600)
    } else {
      this.scene.fog = new THREE.Fog(0x656059, 200, 600)
    }
  }

  createScene = (canvas, theme) => {
    // Get the width and height of the screen
    // and use them to setup the aspect ratio
    // of the camera and the size of the renderer.
    this.HEIGHT = window.innerHeight
    this.WIDTH = window.innerWidth

    // Create the scene.
    this.scene = new THREE.Scene()

    // Add FOV Fog effect to the scene. Same colour as the BG int he stylesheet.
    this.updateFog(theme)
    // Create the camera
    this.aspectRatio = this.WIDTH / this.HEIGHT
    this.fieldOfView = 60
    this.nearPlane = 1
    this.farPlane = 10000
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      this.aspectRatio,
      this.nearPlane,
      this.farPlane
    )
    // Position the camera
    this.camera.position.x = 0
    this.camera.position.y = 150
    this.camera.position.z = 100

    // Create the renderer

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      // Alpha makes the background transparent, antialias is performant heavy
      alpha: true,
      antialias: true
    })

    //set the size of the renderer to fullscreen
    this.renderer.setSize(this.WIDTH, this.HEIGHT)
    //enable shadow rendering
    this.renderer.shadowMap.enabled = true

    //RESPONSIVE LISTENER
    window.addEventListener('resize', this.handleWindowResize, false)
  }

  //RESPONSIVE FUNCTION
  handleWindowResize = () => {
    this.HEIGHT = window.innerHeight
    this.WIDTH = window.innerWidth
    if (this.HEIGHT > 558) {
      this.renderer.setSize(this.WIDTH, this.HEIGHT)
      this.camera.aspect = this.WIDTH / this.HEIGHT
      this.camera.updateProjectionMatrix()
    }
  }

  createLights = () => {
    // Gradient coloured light - Sky, Ground, Intensity
    this.hemisphereLight = new THREE.HemisphereLight(0xf7d9aa, 0x000000, 0.8)
    // Parallel rays
    this.shadowLight = new THREE.DirectionalLight(0xf7d9aa, 0.9)

    this.shadowLight.position.set(0, 350, 350)
    this.shadowLight.castShadow = true

    // define the visible area of the projected shadow
    this.shadowLight.shadow.camera.left = -650
    this.shadowLight.shadow.camera.right = 650
    this.shadowLight.shadow.camera.top = 650
    this.shadowLight.shadow.camera.bottom = -650
    this.shadowLight.shadow.camera.near = 1
    this.shadowLight.shadow.camera.far = 1000

    // Shadow map size
    this.shadowLight.shadow.mapSize.width = 2048
    this.shadowLight.shadow.mapSize.height = 2048

    // Add the lights to the scene
    this.scene.add(this.hemisphereLight)

    this.scene.add(this.shadowLight)
  }

  animate = () => {}

  createSky = () => {
    this.sky = new Sky(this.colors)
    this.sky.mesh.position.y = this.offSet
    this.scene.add(this.sky.mesh)
  }

  createLand = () => {
    this.land = new Land(this.colors)
    this.land.mesh.position.y = this.offSet
    this.scene.add(this.land.mesh)
  }

  createOrbit = () => {
    this.orbit = new Orbit(this.colors)
    this.orbit.mesh.position.y = this.offSet
    this.orbit.mesh.rotation.z = -Math.PI / 6
    this.scene.add(this.orbit.mesh)
  }

  createForest = () => {
    this.forest = new Forest(this.colors)
    this.forest.mesh.position.y = this.offSet
    this.scene.add(this.forest.mesh)
  }

  createSun = () => {
    this.sun = new Sun(this.colors)
    this.sun.mesh.scale.set(0.55, 0.55, 0.3)
    this.sun.mesh.position.set(0, -20, -850)
    this.scene.add(this.sun.mesh)
  }

  createPlane = () => {
    this.airplane = new AirPlane(this.colors)
    this.airplane.mesh.scale.set(0.35, 0.35, 0.35)
    this.airplane.mesh.position.set(-10, 110, -240)
    // this.airplane.mesh.rotation.z = Math.PI/15;
    this.scene.add(this.airplane.mesh)
  }

  updatePlane = () => {
    var targetY = this.normalize(this.mousePos.y, -0.75, 0.75, 50, 190)
    var targetX = this.normalize(this.mousePos.x, -0.75, 0.75, -100, -20)

    // Move the plane at each frame by adding a fraction of the remaining distance
    this.airplane.mesh.position.y +=
      (targetY - this.airplane.mesh.position.y) * 0.1

    this.airplane.mesh.position.x +=
      (targetX - this.airplane.mesh.position.x) * 0.1 + 8

    // Rotate the plane proportionally to the remaining distance
    this.airplane.mesh.rotation.z =
      (targetY - this.airplane.mesh.position.y) * 0.0128
    this.airplane.mesh.rotation.x =
      (this.airplane.mesh.position.y - targetY) * 0.0064
    this.airplane.mesh.rotation.y =
      (this.airplane.mesh.position.x - targetX) * 0.0064

    this.airplane.propeller.rotation.x += 0.3
  }

  normalize = (v, vmin, vmax, tmin, tmax) => {
    var nv = Math.max(Math.min(v, vmax), vmin)
    var dv = vmax - vmin
    var pc = (nv - vmin) / dv
    var dt = tmax - tmin
    var tv = tmin + pc * dt
    return tv
  }

  loop = () => {
    if (this.renderer) {
      this.land.mesh.rotation.z += 0.002
      this.orbit.mesh.rotation.z += 0.001
      this.sky.mesh.rotation.z += 0.001
      this.forest.mesh.rotation.z += 0.002
      this.updatePlane()

      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.loop)
    }
  }

  handleMouseMove = event => {
    var tx = -1 + (event.clientX / this.WIDTH) * 2
    var ty = 1 - (event.clientY / this.HEIGHT) * 2
    this.mousePos = { x: tx, y: ty }
  }

  cleanup = () => {
    this.renderer = null
    this.scene.traverse(object => {
      if (!object.isMesh) return

      object.geometry.dispose()

      if (object.material.isMaterial) {
        cleanMaterial(object.material)
      } else {
        // an array of materials
        for (const material of object.material) cleanMaterial(material)
      }
    })

    const cleanMaterial = material => {
      material.dispose()

      // dispose textures
      for (const key of Object.keys(material)) {
        const value = material[key]
        if (value && typeof value === 'object' && 'minFilter' in value) {
          value.dispose()
        }
      }
    }
    window.removeEventListener('mousemove', this.handleMouseMove)
    // window.removeEventListener('load', this.init)
    window.removeEventListener('resize', this.handleWindowResize)
  }
}
class Land {
  constructor(colors) {
    this.colors = colors
    var geom = new THREE.CylinderGeometry(600, 600, 1700, 40, 10)
    //rotate on the x axis
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2))
    //create a material
    var mat = new THREE.MeshPhongMaterial({
      color: this.colors.lightgreen,
      shading: THREE.FlatShading
    })

    //create a mesh of the object
    this.mesh = new THREE.Mesh(geom, mat)
    //receive shadows
    this.mesh.receiveShadow = true
  }
}

class Orbit {
  constructor() {
    var geom = new THREE.Object3D()

    this.mesh = geom
    // this.mesh.add(this.sun)
  }
}

class Sun {
  constructor(colors) {
    this.colors = colors
    this.mesh = new THREE.Object3D()

    var sunGeom = new THREE.SphereGeometry(400, 20, 15)
    var sunMat = new THREE.MeshPhongMaterial({
      color: this.colors.yellow,
      shading: THREE.FlatShading
    })
    var sun = new THREE.Mesh(sunGeom, sunMat)
    //sun.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
    sun.castShadow = false
    sun.receiveShadow = false
    this.mesh.add(sun)
  }
}

class Cloud {
  constructor(colors) {
    this.colors = colors
    // Create an empty container for the cloud
    this.mesh = new THREE.Object3D()
    // Cube geometry and material
    var geom = new THREE.TetrahedronGeometry(20, 2)
    var mat = new THREE.MeshPhongMaterial({
      color: this.colors.white
    })

    var nBlocs = 3 + Math.floor(Math.random() * 3)

    for (var i = 0; i < nBlocs; i++) {
      //Clone mesh geometry
      var m = new THREE.Mesh(geom, mat)
      //Randomly position each cube
      m.position.x = i * 15
      m.position.y = Math.random() * 10
      m.position.z = Math.random() * 10
      m.rotation.z = Math.random() * Math.PI * 2
      m.rotation.y = Math.random() * Math.PI * 2

      //Randomly scale the cubes
      var s = 0.1 + Math.random() * 0.9
      m.scale.set(s, s, s)
      this.mesh.add(m)
    }
  }
}

class Sky {
  constructor(colors) {
    this.colors = colors
    this.mesh = new THREE.Object3D()

    // Number of cloud groups
    this.nClouds = 25

    // Space the consistenly
    var stepAngle = (Math.PI * 2) / this.nClouds

    // Create the Clouds
    for (var i = 0; i < this.nClouds; i++) {
      var c = new Cloud(this.colors)

      //set rotation and position using trigonometry
      var a = stepAngle * i
      // this is the distance between the center of the axis and the cloud itself
      var h = 800 + Math.random() * 200
      c.mesh.position.y = Math.sin(a) * h
      c.mesh.position.x = Math.cos(a) * h

      // rotate the cloud according to its position
      c.mesh.rotation.z = a + Math.PI / 2

      // random depth for the clouds on the z-axis
      c.mesh.position.z = -400 - Math.random() * 400

      // random scale for each cloud
      var s = 1 + Math.random() * 2
      c.mesh.scale.set(s, s, s)

      this.mesh.add(c.mesh)
    }
  }
}

class Tree {
  constructor(colors) {
    this.colors = colors
    this.mesh = new THREE.Object3D()

    var matTreeLeaves = new THREE.MeshPhongMaterial({
      color: this.colors.green,
      shading: THREE.FlatShading
    })

    var geonTreeBase = new THREE.BoxGeometry(10, 20, 10)
    var matTreeBase = new THREE.MeshBasicMaterial({ color: this.colors.brown })
    var treeBase = new THREE.Mesh(geonTreeBase, matTreeBase)
    treeBase.castShadow = true
    treeBase.receiveShadow = true
    this.mesh.add(treeBase)

    var geomTreeLeaves1 = new THREE.CylinderGeometry(1, 12 * 3, 12 * 3, 4)
    var treeLeaves1 = new THREE.Mesh(geomTreeLeaves1, matTreeLeaves)
    treeLeaves1.castShadow = true
    treeLeaves1.receiveShadow = true
    treeLeaves1.position.y = 20
    this.mesh.add(treeLeaves1)

    var geomTreeLeaves2 = new THREE.CylinderGeometry(1, 9 * 3, 9 * 3, 4)
    var treeLeaves2 = new THREE.Mesh(geomTreeLeaves2, matTreeLeaves)
    treeLeaves2.castShadow = true
    treeLeaves2.position.y = 40
    treeLeaves2.receiveShadow = true
    this.mesh.add(treeLeaves2)

    var geomTreeLeaves3 = new THREE.CylinderGeometry(1, 6 * 3, 6 * 3, 4)
    var treeLeaves3 = new THREE.Mesh(geomTreeLeaves3, matTreeLeaves)
    treeLeaves3.castShadow = true
    treeLeaves3.position.y = 55
    treeLeaves3.receiveShadow = true
    this.mesh.add(treeLeaves3)
  }
}

class Flower {
  constructor(colors) {
    this.colors = colors
    this.mesh = new THREE.Object3D()
    this.petalColors = [this.colors.red, this.colors.yellow, this.colors.blue]
    var geomStem = new THREE.BoxGeometry(5, 50, 5, 1, 1, 1)
    var matStem = new THREE.MeshPhongMaterial({
      color: this.colors.green,
      shading: THREE.FlatShading
    })
    var stem = new THREE.Mesh(geomStem, matStem)
    stem.castShadow = false
    stem.receiveShadow = true
    this.mesh.add(stem)

    var geomPetalCore = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1)
    var matPetalCore = new THREE.MeshPhongMaterial({
      color: this.colors.yellow,
      shading: THREE.FlatShading
    })
    const petalCore = new THREE.Mesh(geomPetalCore, matPetalCore)
    petalCore.castShadow = false
    petalCore.receiveShadow = true

    var petalColor = this.petalColors[Math.floor(Math.random() * 3)]

    var geomPetal = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1)
    var matPetal = new THREE.MeshBasicMaterial({ color: petalColor })
    geomPetal.vertices[5].y -= 4
    geomPetal.vertices[4].y -= 4
    geomPetal.vertices[7].y += 4
    geomPetal.vertices[6].y += 4
    geomPetal.translate(12.5, 0, 3)

    var petals = []
    for (var i = 0; i < 4; i++) {
      petals[i] = new THREE.Mesh(geomPetal, matPetal)
      petals[i].rotation.z = (i * Math.PI) / 2
      petals[i].castShadow = true
      petals[i].receiveShadow = true
    }

    petalCore.add(petals[0], petals[1], petals[2], petals[3])
    petalCore.position.y = 25
    petalCore.position.z = 3
    this.mesh.add(petalCore)
  }
}

class Forest {
  constructor(colors) {
    this.colors = colors
    this.mesh = new THREE.Object3D()

    // Number of Trees
    this.nTrees = 300

    // Space the consistenly
    var stepAngle = (Math.PI * 2) / this.nTrees

    // Create the Trees
    for (var i = 0; i < this.nTrees; i++) {
      var t = new Tree(colors)

      //set rotation and position using trigonometry
      var a = stepAngle * i
      // this is the distance between the center of the axis and the tree itself
      var h = 605
      t.mesh.position.y = Math.sin(a) * h
      t.mesh.position.x = Math.cos(a) * h

      // rotate the tree according to its position
      t.mesh.rotation.z = a + (Math.PI / 2) * 3

      //Andreas Trigo funtime
      //t.mesh.rotation.z = Math.atan2(t.mesh.position.y, t.mesh.position.x)-Math.PI/2;
      // random depth for the tree on the z-axis
      t.mesh.position.z = 0 - Math.random() * 600

      // random scale for each tree
      var s = 0.3 + Math.random() * 0.75
      t.mesh.scale.set(s, s, s)

      this.mesh.add(t.mesh)
    }

    // Number of Trees
    this.nFlowers = 350

    var stepAngle = (Math.PI * 2) / this.nFlowers

    for (var i = 0; i < this.nFlowers; i++) {
      var f = new Flower(colors)
      var a = stepAngle * i

      var h = 605
      f.mesh.position.y = Math.sin(a) * h
      f.mesh.position.x = Math.cos(a) * h

      f.mesh.rotation.z = a + (Math.PI / 2) * 3

      f.mesh.position.z = 0 - Math.random() * 600

      var s = 0.1 + Math.random() * 0.3
      f.mesh.scale.set(s, s, s)

      this.mesh.add(f.mesh)
    }
  }
}

class AirPlane {
  constructor(colors) {
    this.mesh = new THREE.Object3D()
    this.colors = colors

    // Create the cabin
    var geomCockpit = new THREE.BoxGeometry(80, 50, 50, 1, 1, 1)
    var matCockpit = new THREE.MeshPhongMaterial({
      color: this.colors.red,
      shading: THREE.FlatShading
    })
    geomCockpit.vertices[4].y -= 10
    geomCockpit.vertices[4].z += 20
    geomCockpit.vertices[5].y -= 10
    geomCockpit.vertices[5].z -= 20
    geomCockpit.vertices[6].y += 30
    geomCockpit.vertices[6].z += 20
    geomCockpit.vertices[7].y += 30
    geomCockpit.vertices[7].z -= 20
    var cockpit = new THREE.Mesh(geomCockpit, matCockpit)
    cockpit.castShadow = true
    cockpit.receiveShadow = true
    this.mesh.add(cockpit)

    // Create the engine
    var geomEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1)
    var matEngine = new THREE.MeshPhongMaterial({
      color: this.colors.white,
      shading: THREE.FlatShading
    })
    var engine = new THREE.Mesh(geomEngine, matEngine)
    engine.position.x = 40
    engine.castShadow = true
    engine.receiveShadow = true
    this.mesh.add(engine)

    // Create the tail
    var geomTailPlane = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1)
    var matTailPlane = new THREE.MeshPhongMaterial({
      color: this.colors.red,
      shading: THREE.FlatShading
    })
    var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane)
    tailPlane.position.set(-35, 25, 0)
    tailPlane.castShadow = true
    tailPlane.receiveShadow = true
    this.mesh.add(tailPlane)

    // Create the wing
    var geomSideWing = new THREE.BoxGeometry(40, 4, 150, 1, 1, 1)
    var matSideWing = new THREE.MeshPhongMaterial({
      color: this.colors.red,
      shading: THREE.FlatShading
    })

    var sideWingTop = new THREE.Mesh(geomSideWing, matSideWing)
    var sideWingBottom = new THREE.Mesh(geomSideWing, matSideWing)
    sideWingTop.castShadow = true
    sideWingTop.receiveShadow = true
    sideWingBottom.castShadow = true
    sideWingBottom.receiveShadow = true

    sideWingTop.position.set(20, 12, 0)
    sideWingBottom.position.set(20, -3, 0)
    this.mesh.add(sideWingTop)
    this.mesh.add(sideWingBottom)

    var geomWindshield = new THREE.BoxGeometry(3, 15, 20, 1, 1, 1)
    var matWindshield = new THREE.MeshPhongMaterial({
      color: this.colors.white,
      transparent: true,
      opacity: 0.3,
      shading: THREE.FlatShading
    })
    var windshield = new THREE.Mesh(geomWindshield, matWindshield)
    windshield.position.set(5, 27, 0)

    windshield.castShadow = true
    windshield.receiveShadow = true

    this.mesh.add(windshield)

    var geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1)
    geomPropeller.vertices[4].y -= 5
    geomPropeller.vertices[4].z += 5
    geomPropeller.vertices[5].y -= 5
    geomPropeller.vertices[5].z -= 5
    geomPropeller.vertices[6].y += 5
    geomPropeller.vertices[6].z += 5
    geomPropeller.vertices[7].y += 5
    geomPropeller.vertices[7].z -= 5
    var matPropeller = new THREE.MeshPhongMaterial({
      color: this.colors.brown,
      shading: THREE.FlatShading
    })
    this.propeller = new THREE.Mesh(geomPropeller, matPropeller)
    this.propeller.castShadow = true
    this.propeller.receiveShadow = true

    var geomBlade1 = new THREE.BoxGeometry(1, 100, 10, 1, 1, 1)
    var geomBlade2 = new THREE.BoxGeometry(1, 10, 100, 1, 1, 1)
    var matBlade = new THREE.MeshPhongMaterial({
      color: this.colors.brownDark,
      shading: THREE.FlatShading
    })

    var blade1 = new THREE.Mesh(geomBlade1, matBlade)
    blade1.position.set(8, 0, 0)
    blade1.castShadow = true
    blade1.receiveShadow = true

    var blade2 = new THREE.Mesh(geomBlade2, matBlade)
    blade2.position.set(8, 0, 0)
    blade2.castShadow = true
    blade2.receiveShadow = true
    this.propeller.add(blade1, blade2)
    this.propeller.position.set(50, 0, 0)
    this.mesh.add(this.propeller)

    var wheelProtecGeom = new THREE.BoxGeometry(30, 15, 10, 1, 1, 1)
    var wheelProtecMat = new THREE.MeshPhongMaterial({
      color: this.colors.white,
      shading: THREE.FlatShading
    })
    var wheelProtecR = new THREE.Mesh(wheelProtecGeom, wheelProtecMat)
    wheelProtecR.position.set(25, -20, 25)
    this.mesh.add(wheelProtecR)

    var wheelTireGeom = new THREE.BoxGeometry(24, 24, 4)
    var wheelTireMat = new THREE.MeshPhongMaterial({
      color: this.colors.brownDark,
      shading: THREE.FlatShading
    })
    var wheelTireR = new THREE.Mesh(wheelTireGeom, wheelTireMat)
    wheelTireR.position.set(25, -28, 25)

    var wheelAxisGeom = new THREE.BoxGeometry(10, 10, 6)
    var wheelAxisMat = new THREE.MeshPhongMaterial({
      color: this.colors.brown,
      shading: THREE.FlatShading
    })
    var wheelAxis = new THREE.Mesh(wheelAxisGeom, wheelAxisMat)
    wheelTireR.add(wheelAxis)

    this.mesh.add(wheelTireR)

    var wheelProtecL = wheelProtecR.clone()
    wheelProtecL.position.z = -wheelProtecR.position.z
    this.mesh.add(wheelProtecL)

    var wheelTireL = wheelTireR.clone()
    wheelTireL.position.z = -wheelTireR.position.z
    this.mesh.add(wheelTireL)

    var wheelTireB = wheelTireR.clone()
    wheelTireB.scale.set(0.5, 0.5, 0.5)
    wheelTireB.position.set(-35, -5, 0)
    this.mesh.add(wheelTireB)

    var suspensionGeom = new THREE.BoxGeometry(4, 20, 4)
    suspensionGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 10, 0))
    var suspensionMat = new THREE.MeshPhongMaterial({
      color: this.colors.red,
      shading: THREE.FlatShading
    })
    var suspension = new THREE.Mesh(suspensionGeom, suspensionMat)
    suspension.position.set(-35, -5, 0)
    suspension.rotation.z = -0.3
    this.mesh.add(suspension)
  }
}
