const LOADER = document.getElementById('js-loader');

const OPTION_TRAY = document.getElementById('js-option-tray');
const MODEL_TRAY = document.getElementById('js-model-tray-slide');
const TRAY = document.getElementById('js-tray-slide');

const DRAG_NOTICE = document.getElementById('js-drag-notice');

const INITIAL_MTL = new THREE.MeshPhongMaterial({ color: 0xf1f1f1, shininess: 10 });
// const INITIAL_MTL1 = new THREE.MeshPhongMaterial({ color: 0x495057, shininess: 10 });
// const INITIAL_MTL2 = new THREE.MeshPhongMaterial({ color: 0x868e96, shininess: 10 });

var theModel;
var activeOption;
var options;
var loaded = false;
var currentSettingArea = 0;

var lights = [new THREE.AmbientLight(), new THREE.DirectionalLight(0xffffff, 0.54), new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61), new THREE.PointLight()];
var lightEnabled = [false, true, true, false];

const MODELS = [
{
  path: 'models/chair.glb',
  thumb: 'models/chair.jpg',
  map: [{ childID: "legs", mtl: INITIAL_MTL, thumb: 'img/thumb/legs.svg' },
    { childID: "cushions", mtl: INITIAL_MTL, thumb: 'img/thumb/cushions.svg' },
    { childID: "base", mtl: INITIAL_MTL, thumb: 'img/thumb/base.svg' },
    { childID: "supports", mtl: INITIAL_MTL, thumb: 'img/thumb/supports.svg' },
    { childID: "back", mtl: INITIAL_MTL, thumb: 'img/thumb/back.svg' }]},

{
  path: 'models/bicycle.glb',
  thumb: 'models/bicycle.jpg',
  map: [
  { childID: "bicycle_body_main_0", mtl: INITIAL_MTL, thumb: 'img/thumb/bicycle_body_main_0.png' },
  { childID: "bicycle_body_forward_0", mtl: INITIAL_MTL, thumb: 'img/thumb/bicycle_body_forward_0.png' },
  { childID: "bicycle_cover_forward_0", mtl: INITIAL_MTL, thumb: 'img/thumb/bicycle_cover_forward_0.png' },
  { childID: "bicycle_cover_back_0", mtl: INITIAL_MTL, thumb: 'img/thumb/bicycle_cover_back_0.png' },
  { childID: "bicycle_seat_0", mtl: INITIAL_MTL, thumb: 'img/thumb/bicycle_seat_0.png' }]},

{
  path: 'models/bed.gltf',
  thumb: 'models/bed.jpg',
  scale: [0.3, 0.3, 0.3],
  map: [
    { childID: "Object_4", mtl: INITIAL_MTL, thumb: 'img/thumb/bed_frame.png' },
    { childID: "Object_6", mtl: INITIAL_MTL, thumb: 'img/thumb/bed_cover.png'  },
    { childID: "Object_8", mtl: INITIAL_MTL, thumb: 'img/thumb/bed_pillow.png'  },
    { childID: "Object_10", mtl: INITIAL_MTL, thumb: 'img/thumb/bed_upper_pillow.png'  },
    { childID: "Object_12", mtl: INITIAL_MTL, thumb: 'img/thumb/bed_lower_pillow.png'  }]}];

const colors = [
  {
    texture: 'img/wood_.jpg',
    size: [2, 2, 2],
    shininess: 60 },
  
  {
    texture: 'img/fabric_.jpg',
    size: [4, 4, 4],
    shininess: 0 },
  
  {
    texture: 'img/pattern_.jpg',
    size: [8, 8, 8],
    shininess: 10 },
  
  {
    texture: 'img/denim_.jpg',
    size: [3, 3, 3],
    shininess: 0 },
  
  {
    texture: 'img/quilt_.jpg',
    size: [6, 6, 6],
    shininess: 0 },
  
  {
    texture: 'img/black_.jpg',
    size: [6, 6, 6],
    shininess: 0 },
  
  {
  texture: 'img/blue_.jpg',
  size: [6, 6, 6],
  shininess: 0 },
  
  {
  texture: 'img/flower_.webp',
  size: [6, 6, 6],
  shininess: 0 },
  
  {
    texture: 'img/galaxy_.jpg',
    size: [6, 6, 6],
    shininess: 0 },
  
  {
    texture: 'img/green_.jpg',
    size: [6, 6, 6],
    shininess: 0 },
  
  {
    texture: 'img/bleather_.jpg',
    size: [6, 6, 6],
    shininess: 0 },
  
  {
    texture: 'img/leather_.jpg',
    size: [6, 6, 6],
    shininess: 0 },
  
  {
    texture: 'img/purple_.jpg',
    size: [6, 6, 6],
    shininess: 0 },
  
  {
    texture: 'img/gray_.png',
    size: [6, 6, 6],
    shininess: 0 },
  
  {
    texture: 'img/metal_.jpg',
    size: [6, 6, 6],
    shininess: 0 },

{
  color: '131417' },

{
  color: '374047' },

{
  color: '5f6e78' },

{
  color: '7f8a93' },

{
  color: '97a1a7' },

{
  color: 'acb4b9' },

{
  color: 'DF9998' },

{
  color: '7C6862' },

{
  color: 'A3AB84' },

{
  color: 'D6CCB1' },

{
  color: 'F8D5C4' },

{
  color: 'A3AE99' },

{
  color: 'EFF2F2' },

{
  color: 'B0C5C1' },

{
  color: '8B8C8C' },

{
  color: '565F59' },

{
  color: 'CB304A' },

{
  color: 'FED7C8' },

{
  color: 'C7BDBD' },

{
  color: '3DCBBE' },

{
  color: '264B4F' },

{
  color: '389389' },

{
  color: '85BEAE' },

{
  color: 'F2DABA' },

{
  color: 'F2A97F' },

{
  color: 'D85F52' },

{
  color: 'D92E37' },

{
  color: 'FC9736' },

{
  color: 'F7BD69' },

{
  color: 'A4D09C' },

{
  color: '4C8A67' },

{
  color: '25608A' },

{
  color: '75C8C6' },

{
  color: 'F5E4B7' },

{
  color: 'E69041' },

{
  color: 'E56013' },

{
  color: '11101D' },

{
  color: '630609' },

{
  color: 'C9240E' },

{
  color: 'EC4B17' },

{
  color: '281A1C' },

{
  color: '4F556F' },

{
  color: '64739B' },

{
  color: 'CDBAC7' },

{
  color: '946F43' },

{
  color: '66533C' },

{
  color: '173A2F' },

{
  color: '153944' },

{
  color: '27548D' },

{
  color: '438AAC' }];




const BACKGROUND_COLOR = 0xf1f1f1;
// Init the scene
const scene = new THREE.Scene();
// Set background
scene.background = new THREE.Color(BACKGROUND_COLOR);
scene.fog = new THREE.Fog(BACKGROUND_COLOR, 20, 100);

const canvas = document.querySelector('#c');

// Init the renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

// Add a camerra
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5; // cameraFar
camera.position.x = 0;


// Init the object loader
function loadGLTF(model) {
  var loader = new THREE.GLTFLoader();

  // Remove previous model
  scene.remove(theModel);

  loader.load(model.path, function (gltf) {
    theModel = gltf.scene;

    theModel.traverse(o => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });

    // Set the models initial scale   
    if (model.scale)
      theModel.scale.set(model.scale[0], model.scale[1], model.scale[2])
    else
      theModel.scale.set(2, 2, 2);
    theModel.rotation.y = Math.PI;

    // Offset the y position a bit
    theModel.position.y = -1;

    // Set initial textures
    for (let object of model.map) {
      initColor(theModel, object.childID, object.mtl);
    }

    // Add the model to the scene
    scene.add(theModel);

    // Remove the loader
    LOADER.remove();

  }, undefined, function (error) {
    console.error(error);
  });
}

loadGLTF(MODELS[0]);

// Function - Add the textures to the models
function initColor(parent, type, mtl) {
  parent.traverse(o => {
    if (o.isMesh) {
      if (o.name.includes(type)) {
        o.material = mtl;
        o.nameID = type; // Set a new property to identify this object
      }
    }
  });
}

// Add lights
lights[2].position.set(0, 50, 0);
// Add hemisphere light to scene   
scene.add(lights[2]);

lights[1].position.set(-8, 12, 8);
lights[1].castShadow = true;
lights[1].shadow.mapSize = new THREE.Vector2(1024, 1024);
// Add directional Light to scene    
scene.add(lights[1]);

// Floor
var floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
var floorMaterial = new THREE.MeshPhongMaterial({
  color: 0xeeeeee,
  shininess: 0 });


var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -0.5 * Math.PI;
floor.receiveShadow = true;
floor.position.y = -1;
scene.add(floor);

// Add controls
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = Math.PI / 3;
controls.enableDamping = true;
controls.enablePan = false;
controls.dampingFactor = 0.1;
controls.autoRotate = false; // Toggle this if you'd like the chair to automatically rotate
controls.autoRotateSpeed = 0.2; // 30

function animate() {

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  if (theModel != null && loaded == false) {
    initialRotation();
    DRAG_NOTICE.classList.add('start');
  }
}

animate();

// Function - New resizing method
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  var width = window.innerWidth;
  var height = window.innerHeight;
  var canvasPixelWidth = canvas.width / window.devicePixelRatio;
  var canvasPixelHeight = canvas.height / window.devicePixelRatio;

  const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;
  if (needResize) {

    renderer.setSize(width, height, false);
  }
  return needResize;
}

// Function - Build Options

function buildOptions(model) {
  OPTION_TRAY.innerHTML = '';
  for (const [i, object] of Object.entries(model.map)) {
    let swatch = document.createElement('div');
    swatch.classList.add('option');
    if (!parseInt(i))
      swatch.classList.add('--is-active'); // select fist item (default)

    if (object.thumb)
      swatch.innerHTML = "<img src=\"" + object.thumb + "\" alt=\"\"></img>";

    swatch.setAttribute('data-option', object.childID);
    OPTION_TRAY.append(swatch);
  }

  options = document.querySelectorAll(".option");
  activeOption = model.map[0].childID;
  for (const option of options) {
    option.addEventListener('click', selectOption);
  }
}

buildOptions(MODELS[0]);

// Function - Build Models

function buildModels(models) {
  for (let [i, model] of models.entries()) {
    let swatch = document.createElement('div');
    swatch.classList.add('model-tray__swatch');

    swatch.style.backgroundImage = "url(" + model.thumb + ")";

    swatch.setAttribute('data-key', i);
    MODEL_TRAY.append(swatch);
  }
}

buildModels(MODELS);

// Function - Build Colors

function buildColors(colors) {
  for (let [i, color] of colors.entries()) {
    let swatch = document.createElement('div');
    swatch.classList.add('tray__swatch');

    if (color.texture)
    {
      swatch.style.backgroundImage = "url(" + color.texture + ")";
    } else
    {
      swatch.style.background = "#" + color.color;
    }

    swatch.setAttribute('data-key', i);
    TRAY.append(swatch);
  }
}

buildColors(colors);

// Select Option
function selectOption(e) {
  let option = e.target;
  activeOption = e.target.dataset.option;
  for (const otherOption of options) {
    otherOption.classList.remove('--is-active');
  }
  option.classList.add('--is-active');
}

// Swatches - models
const swatches_models = document.querySelectorAll(".model-tray__swatch");

for (const swatch of swatches_models) {
  swatch.addEventListener('click', selectSwatchModels);

  function selectSwatchModels(e) {
    var i = parseInt(e.target.dataset.key);

    loadGLTF(MODELS[i])
    buildOptions(MODELS[i]);
  }
}

// Swatches
const swatches = document.querySelectorAll(".tray__swatch");

for (const swatch of swatches) {
  swatch.addEventListener('click', selectSwatch);
}

function selectSwatch(e) {
  let color = colors[parseInt(e.target.dataset.key)];
  let new_mtl;

  if (color.texture) {

    let txt = new THREE.TextureLoader().load(color.texture);

    txt.repeat.set(color.size[0], color.size[1], color.size[2]);
    txt.wrapS = THREE.RepeatWrapping;
    txt.wrapT = THREE.RepeatWrapping;

    new_mtl = new THREE.MeshPhongMaterial({
      map: txt,
      shininess: color.shininess ? color.shininess : 10 });

  } else

  {
    new_mtl = new THREE.MeshPhongMaterial({
      color: parseInt('0x' + color.color),
      shininess: color.shininess ? color.shininess : 10 });


  }

  setMaterial(theModel, activeOption, new_mtl);
}

function setMaterial(parent, type, mtl) {
  parent.traverse(o => {
    if (o.isMesh && o.nameID != null) {
      if (o.nameID == type) {
        o.material = mtl;
      }
    }
  });
}

// Function - Opening rotate
let initRotate = 0;

function initialRotation() {
  initRotate++;
  if (initRotate <= 120) {
    theModel.rotation.y += Math.PI / 60;
  } else {
    loaded = true;
  }
}

var slider = document.getElementById('js-tray'),sliderItems = document.getElementById('js-tray-slide'),difference;

function slide(wrapper, items) {
  var posX1 = 0,
  posX2 = 0,
  posInitial,
  threshold = 20,
  posFinal,
  slides = items.getElementsByClassName('tray__swatch');

  // Mouse events
  items.onmousedown = dragStart;

  // Touch events
  items.addEventListener('touchstart', dragStart);
  items.addEventListener('touchend', dragEnd);
  items.addEventListener('touchmove', dragAction);


  function dragStart(e) {
    e = e || window.event;
    posInitial = items.offsetLeft;
    difference = sliderItems.offsetWidth - slider.offsetWidth;
    difference = difference * -1;

    if (e.type == 'touchstart') {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }

  function dragAction(e) {
    e = e || window.event;

    if (e.type == 'touchmove') {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }

    if (items.offsetLeft - posX2 <= 0 && items.offsetLeft - posX2 >= difference) {
      items.style.left = items.offsetLeft - posX2 + "px";
    }
  }

  function dragEnd(e) {
    posFinal = items.offsetLeft;
    if (posFinal - posInitial < -threshold) {

    } else if (posFinal - posInitial > threshold) {

    } else {
      items.style.left = posInitial + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }

}

slide(slider, sliderItems);

document.getElementById("Next_Btn").onclick = function() {
  if (!currentSettingArea) { // View Setting
    document.getElementById('Setting_area_Light').style.display = "none";
    document.getElementById('Setting_area_View').style.display = "block";
  }
  else { // Light Setting
    document.getElementById('Setting_area_Light').style.display = "block";
    document.getElementById('Setting_area_View').style.display = "none";
  }

  currentSettingArea = !currentSettingArea;
};

var lightList = document.getElementById('light_list');
document.getElementById("light_list").onclick = function(e) {
  if (lightList.options[lightList.selectedIndex]) { // check if light is selected
    if (lightEnabled[lightList.selectedIndex]) // apply checkbox status from selected light
      document.getElementById("light_enable").checked = true;
    else
      document.getElementById("light_enable").checked = false;

    // apply color and intensity input from selected light
    document.getElementById("light_color").value = '#' + ('00'+(lights[lightList.selectedIndex].color.r*255).toString(16)).slice(-2) + ('00'+(lights[lightList.selectedIndex].color.g*255).toString(16)).slice(-2) + ('00'+(lights[lightList.selectedIndex].color.b*255).toString(16)).slice(-2);
    document.getElementById("light_intensity").value = lights[lightList.selectedIndex].intensity;

    if (lights[lightList.selectedIndex].type == 'AmbientLight')
      document.getElementById('Setting_area_Light_Position').style.display = "none"; // hide unsupported options
    else {
      document.getElementById("slider_X").value = lights[lightList.selectedIndex].position.x;
      document.getElementById("slider_Y").value = lights[lightList.selectedIndex].position.y;
      document.getElementById("slider_Z").value = lights[lightList.selectedIndex].position.z;
      document.getElementById('Setting_area_Light_Position').style.display = "block"; // show supported options
    }
  }
};

document.getElementById("light_enable").onclick = function(e) {
  if (lightList.options[lightList.selectedIndex]) {
    if (document.getElementById("light_enable").checked == true) {
      scene.add(lights[lightList.selectedIndex]);
      lightEnabled[lightList.selectedIndex] = true;
    }
    else {
      scene.remove(lights[lightList.selectedIndex]);
      lightEnabled[lightList.selectedIndex] = false;
    }
  }
};

document.getElementById("slider_X").onchange = function(event) {
  lights[lightList.selectedIndex].position.x = event.target.value;
};
document.getElementById("slider_Y").onchange = function(event) {
  lights[lightList.selectedIndex].position.y = event.target.value;
};
document.getElementById("slider_Z").onchange = function(event) {
  lights[lightList.selectedIndex].position.z = event.target.value;
};
document.getElementById("light_color").onchange = function(event) {
  lights[lightList.selectedIndex].color.r = parseInt(event.target.value.substr(1, 2), 16)/255;
  lights[lightList.selectedIndex].color.g = parseInt(event.target.value.substr(3, 2), 16)/255;
  lights[lightList.selectedIndex].color.b = parseInt(event.target.value.substr(5, 2), 16)/255;
};
document.getElementById("light_intensity").onchange = function(event) {
  lights[lightList.selectedIndex].intensity = event.target.value;
};

document.getElementById("view_X").value = camera.position.x;
document.getElementById("view_Y").value = camera.position.y;
document.getElementById("view_Z").value = camera.position.z;
document.getElementById("c").oncontextmenu = function(e) {
  console.log(e.pageX, e.pageY);
  document.getElementById("view_X").value = camera.position.x;
  document.getElementById("view_Y").value = camera.position.y;
  document.getElementById("view_Z").value = camera.position.z;
}
document.getElementById("view_X").onchange = function(event) {
  camera.position.x = event.target.value;
};
document.getElementById("view_Y").onchange = function(event) {
  camera.position.y = event.target.value;
};
document.getElementById("view_Z").onchange = function(event) {
  camera.position.z = event.target.value;
};