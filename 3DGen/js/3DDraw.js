function init3DDraw() {

  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('3DCanvas'),
    preserveDrawingBuffer: true,
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(imageWidth, imageHeight);

  let canvas = document.getElementById('3DCanvas');
  canvas.style.width = '50%';
  canvas.style.height = '100%';

  const scene = new THREE.Scene();

  if (bFog)
    scene.fog = new THREE.Fog(0x000000, 1000, 500);

  const camera = new THREE.PerspectiveCamera(45, imageWidth / imageHeight);
  camera.position.set(750, 750, 750);

  let canvas3D = document.getElementById('3DCanvas');
  const controls = new THREE.OrbitControls(camera, canvas3D);
  
  if (bLighting)
    addLighting(scene);

  const group = new THREE.Group();

  let shapePatetrn = document.getElementById('shapePattern');
  if (shapePatetrn.value == 'Single'){
    const geometry = getGeometry();
    const material = getMaterial();
    const drawPolygon = new THREE.Mesh(geometry, material);
    drawPolygon.position.x = shapeSpacing;
    group.add(drawPolygon);
  }
  else if (shapePatetrn.value == 'Triple'){
    drawTripleShapes(group, 0);
  }
  else if (shapePatetrn.value == 'Nine'){
    for (let i = 0; i < 3; i++){
      drawTripleShapes(group, i);
    }
  }

  group.position.x = -shapeSpacing;
  
  scene.add(group);

  tick();

  function tick() {
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
}


function getGeometry(){
  let geometry = new THREE.BoxGeometry(shapeSize, shapeSize, shapeSize);
  
  const shapeType = document.getElementById('shapeType');
  switch (shapeType.value){
    case "Plane":
      geometry = new THREE.PlaneGeometry(shapeSize, shapeSize, shapeVertexSize);
      break;
    case "Circle":
      geometry = new THREE.CircleGeometry(shapeSize, shapeVertexSize);
      break;
    case "Box":
      geometry = new THREE.BoxGeometry(shapeSize, shapeSize, shapeSize);
      break;
    case "Cylinder":
      geometry = new THREE.CylinderGeometry(shapeSize, shapeSize, shapeSize, shapeVertexSize);
      break;
    case "Cone":
      geometry = new THREE.ConeGeometry(shapeSize, shapeSize, shapeVertexSize);
      break;
    case "Sphere":
      geometry = new THREE.SphereGeometry(shapeSize, shapeVertexSize, shapeVertexSize);
      break;
    case "Torus":
      geometry = new THREE.TorusGeometry(400, 200, 10, shapeVertexSize);
      break;
    case "TorusKnot":  
      geometry = new THREE.TorusKnotGeometry(shapeSize, shapeSize, shapeSize, shapeVertexSize);
      break;
  }

  geometry.computeVertexNormals();

  return geometry;
}


function getMaterial(){
  let material = new THREE.MeshNormalMaterial();
  
  const meshType = document.getElementById('meshType');
  switch(meshType.value){
    case "Phong":
      material = new THREE.MeshPhongMaterial({color: shapeColor, wireframe: bWireFrame});
      break;
    case "Lambert":
      material = new THREE.MeshLambertMaterial({color: shapeColor, wireframe: bWireFrame});
      break;
    case "Toon":
      material = new THREE.MeshToonMaterial({color: shapeColor, wireframe: bWireFrame});
      break;
    case "Standard":
      material = new THREE.MeshStandardMaterial({color: shapeColor, wireframe: bWireFrame});
      break;
    case "Normal":
      material = new THREE.MeshNormalMaterial();
      break;
  }

  return material;
}


function addLighting(scene){
    const directionalLightOne = new THREE.DirectionalLight( 0xffffff, 1.0);
    scene.add(directionalLightOne);
    directionalLightOne.position.set(0, 1, 0);

    const directionalLightTwo = new THREE.DirectionalLight( 0xffffff, 0.8);
    scene.add(directionalLightTwo );
    directionalLightTwo.position.set(0, 0, 1);
    
    const directionalLightThree = new THREE.DirectionalLight( 0xffffff, 0.5);
    scene.add(directionalLightThree);
    directionalLightThree.position.set(1, 0, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
}

function drawTripleShapes(group, Locate){
    for (let i=0; i<3;i++){
      const geometry = getGeometry();
      const material = getMaterial();
      const drawPolygon = new THREE.Mesh(geometry, material);
      drawPolygon.position.x = i * shapeSpacing;
      if (Locate == 1){
        drawPolygon.position.y = shapeSpacing;
      }
      else if (Locate == 2){
        drawPolygon.position.y = -shapeSpacing;
      }

      group.add(drawPolygon);
    }
}