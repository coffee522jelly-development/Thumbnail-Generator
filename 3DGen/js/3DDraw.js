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

  const camera = new THREE.PerspectiveCamera(45, imageWidth / imageHeight);
  camera.position.set(500, 500, 500);

  let canvas3D = document.getElementById('3DCanvas');
  const controls = new THREE.OrbitControls(camera, canvas3D);

  const geometry = getGeometry();
  const material = getMaterial();

  const drawPolygon = new THREE.Mesh(geometry, material);
  scene.add(drawPolygon);

  if (bWireFrame)
    addWireFrame(scene, geometry);

  if (bLighting)
    addLighting(scene);

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
      geometry = new THREE.TorusGeometry(200, 200, 200, shapeVertexSize);
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
      material = new THREE.MeshPhongMaterial({color: shapeColor});
      break;
    case "Lambert":
      material = new THREE.MeshLambertMaterial({color: shapeColor});
      break;
    case "Toon":
      material = new THREE.MeshToonMaterial({color: shapeColor});
      break;
    case "Standard":
      material = new THREE.MeshStandardMaterial({color: shapeColor});
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

function addWireFrame(scene, geometry){
    const wireframe = new THREE.WireframeGeometry(geometry);
    const line = new THREE.LineSegments(wireframe);
    line.material.depthTest = false;
    line.material.opacity = shapeOpacity;
    line.material.transparent = true;
    scene.add(line);
}
