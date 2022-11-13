function init3DDraw() {

    // サイズを指定
    const width = 960;
    const height = 540;

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('3DCanvas'),
      preserveDrawingBuffer: true,
      antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(500, 500, 500);

    // カメラコントローラーを作成
    let canvas3D = document.getElementById('3DCanvas');
    const controls = new THREE.OrbitControls(camera, canvas3D);

    // 箱を作成
    const shapeType = document.getElementById('shapeType');

    let geometry = new THREE.BoxGeometry(shapeSize, shapeSize, shapeSize);
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

    if (bWireFrame){
      const wireframe = new THREE.WireframeGeometry(geometry);
      const line = new THREE.LineSegments(wireframe);
      line.material.depthTest = false;
      line.material.opacity = shapeOpacity;
      line.material.transparent = true;
      scene.add(line);
    }

    let material = new THREE.MeshNormalMaterial();

    let meshType = document.getElementById('meshType');
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

    if (bLighting){
      const directionalLightOne = new THREE.DirectionalLight( 0xffffff, 1.0);
      scene.add( directionalLightOne );
      directionalLightOne.position.set(0, 1, 0);

      const directionalLightTwo = new THREE.DirectionalLight( 0xffffff, 0.8);
      scene.add( directionalLightTwo );
      directionalLightTwo.position.set(0, 0, 1);
      
      const directionalLightThree = new THREE.DirectionalLight( 0xffffff, 0.5);
      scene.add( directionalLightThree );
      directionalLightThree.position.set(1, 0, 0);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
      scene.add( ambientLight );
    }

    const drawPolygon = new THREE.Mesh(geometry, material);
    scene.add(drawPolygon);

    tick();

    // 毎フレーム時に実行されるループイベントです
    function tick() {
      renderer.render(scene, camera); // レンダリング
      // lightHelper.update();
      requestAnimationFrame(tick);
    }
  }