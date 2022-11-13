function draw3D() {

  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('3DCanvas'),
    preserveDrawingBuffer: true,
    antialias: true,
    alpha: true 
  });
  
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(imageWidth, imageHeight);

  let canvas = document.getElementById('3DCanvas');
  canvas.style.width = '50%';
  canvas.style.height = '100%';

  const scene = new THREE.Scene();
  scene.background = new THREE.Color( shapeBackgroundColor);

  if (bLighting)  addLighting(scene);
  if (bParticle)  createParticles(scene);
  if (bFog)       scene.fog = new THREE.Fog(0x000000, 1000, 500);

  const camera = new THREE.PerspectiveCamera(45, imageWidth / imageHeight);
  camera.position.set(750, 750, 750);
  new THREE.OrbitControls(camera, document.getElementById('3DCanvas'));

  const group = new THREE.Group();
  drawPatternShape(group);  
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


function drawPatternShape(group){
  let shapePatetrn = document.getElementById('shapePattern');
  switch (shapePatetrn.value){
    case 'Single':
      drawGridShapes(group, 1, true);
      break;
    case 'Triple':
      drawGridShapes(group, 3, true);
      break;
    case 'Nine':
      drawGridShapes(group, 9, true);
      break;
    case '3×3':  
      drawGridShapes(group, 3, false);
      break;
    case '9×9':  
      drawGridShapes(group, 9, false);
      break;
  }
}


function drawGridShapes(group, nSize, bArray){
  if (bArray){
    for (let i=0; i<nSize; i++){
      const geometry = getGeometry();
      const material = getMaterial();
      const drawPolygon = new THREE.Mesh(geometry, material);
      drawPolygon.position.x = shapeSpacing * (i / 2);
      group.add(drawPolygon);
    }
    group.position.x = -shapeSpacing * 0.5 * parseInt(nSize / 2);
  }
  else{
    for (let i=0; i<nSize; i++){
      for (let j=0; j<nSize; j++){
        const geometry = getGeometry();
        const material = getMaterial();
        const drawPolygon = new THREE.Mesh(geometry, material);
        drawPolygon.position.x = shapeSpacing * (j / 2);
        drawPolygon.position.y = shapeSpacing * (i / 2);
  
        group.add(drawPolygon);
      }
    }
  
    group.position.x = -shapeSpacing * 0.5 * parseInt(nSize / 2);
    group.position.y = -shapeSpacing * 0.5 * parseInt(nSize / 2);
  }
}

function createParticles(scene){
  // 形状データを作成
  const SIZE = 3000;
  // 配置する個数
  const LENGTH = 1000;
  // 頂点情報を格納する配列
  const vertices = [];
  for (let i = 0; i < LENGTH; i++) {
    const x = SIZE * (Math.random() - 0.5);
    const y = SIZE * (Math.random() - 0.5);
    const z = SIZE * (Math.random() - 0.5);

    vertices.push(x, y, z);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

  const material = new THREE.PointsMaterial({
    size: 10,
    color: shapeColor,
  });

  // 物体を作成
  const mesh = new THREE.Points(geometry, material);
  scene.add(mesh); // シーンは任意の THREE.Scene インスタンス
}