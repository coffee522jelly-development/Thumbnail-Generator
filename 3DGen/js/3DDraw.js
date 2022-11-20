function draw3D() {
  // レンダラー・キャンバスの設定
  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('3DCanvas'),
    preserveDrawingBuffer: true,
    antialias: true,
    alpha: true, 
    physicalCorrectLights:true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(imageWidth, imageHeight);
  // renderer.shadowMap.enabled = true;
  
  let canvas = document.getElementById('3DCanvas');
  canvas.style.width = '50%';
  canvas.style.height = '100%';

  // カメラの設定
  const camera = new THREE.PerspectiveCamera(45, imageWidth / imageHeight);
  camera.position.set(750, 750, 750);
  let controls = new THREE.OrbitControls(camera, document.getElementById('3DCanvas'));

  // シーン設定
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(shapeBackgroundColor);
  
  if (bHelper)    addHelper(scene);
  if (bFog)       addFog(scene);

  getBackgroundTexture(scene);

  // シーンへジオメトリ追加
  const group = new THREE.Group();
  drawPatternShape(group);

  scene.add(group);

  // ライト固定
  scene.add(camera);
  if (bLighting)  addLighting(camera);

  tick();

  function tick() {
    renderer.render(scene, camera);
    camera.castShadow = true;
    controls.update();
    requestAnimationFrame(tick);
  }
}


function getGeometry(){
  let geometry = new THREE.BoxGeometry(shapeSize, shapeSize, shapeSize);
  
  const shapeType = document.getElementById('shapeType');
  switch (shapeType.value){
    case "Line":
      geometry = new THREE.PlaneGeometry(shapeSize, shapeSize, shapeVertexSize);
      break;

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
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.99);
    directionalLight.position.set(0.5, 0.8, 0.5).normalize();
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 512;
    directionalLight.shadow.mapSize.height = 512;
    scene.add(directionalLight);
    scene.add(directionalLight.target);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
}


function addHelper(scene){
  const size = 1500;
  const divisions = 15;
  const gridHelper = new THREE.GridHelper( size, divisions );
  scene.add(gridHelper);
}


function addFog(scene){
    // scene.fog = new THREE.Fog(0x000000, 1000, 500);
    scene.fog = new THREE.FogExp2(0x000000, 0.00050);
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

function getBackgroundTexture(scene){
  const bgTexture = document.getElementById('bgTexture');
  switch (bgTexture.value){
    case "Particle":
      createParticles(scene);
      break;
  }
}

function createParticles(scene){
  // 形状データを作成
  const SIZE = 3000;
  // 配置する個数
  const LENGTH = 100000;
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
    size: 7,
    color: particleColor,
  });

  // 物体を作成
  const mesh = new THREE.Points(geometry, material);
  scene.add(mesh); // シーンは任意の THREE.Scene インスタンス
}