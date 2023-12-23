import *  as THREE from 'three'

console.log(THREE)

// scena generale
// all'intterno di cui andremo a inserire gi ogetti
// e tutto ciò che vogliamo rappresentare

const scene = new THREE.Scene()

// mesh =  geometria + materiale
// la geometria contiene le coordinate  di tutti i vertici e come vanno a formare le facce
const geometry = new THREE.BoxGeometry(1, 1, 1, 3, 1, 3);
const material = new THREE.LineBasicMaterial({color: 0x00ff00});
const mesh = new THREE.LineLoop(geometry, material);

scene.add(mesh);

const temp = {
  width: 1024,
  height: 720
}

// camera prospettica 
// parametri
// fov cioè l'angolo verticale dell'inquadratura, 
// rapporto tra altezza e larghezza, 
// near plane cioè il piano da dove inzia a vedere, far plane cioè il piano limite di visione)
const camera = new THREE.PerspectiveCamera(75, temp.width/temp.height, 0.1, 1000);
// renderizza i frame secondo le misure
const renderer = new THREE.WebGLRenderer()
renderer.setSize(temp.width, temp.height)

// aggiunge al dom l'immaggine renderizzata dal render, chiamto canvas
document.body.appendChild( renderer.domElement )

// sposta la camera che altrimenti rimarrebbe in posizone 0 cioè dentro il cubo
camera.position.z = 4
/*
mesh.rotation.y = Math.PI / 4
mesh.rotation.x = Math.PI / 4
*/

//mesh.position.set(1, 0, -2);

//const pos = new  THREE.Vector3(2, 2, 0);
//mesh.position.copy(pos);
//mesh.position.add(new THREE.Vector3(2, 1, 0));
const mesh2 = mesh.clone();
const mesh3 = mesh.clone();

scene.add(mesh2, mesh3)
mesh2.position.x = -2;
mesh3.position.x = 2;

//mesh2.scale.set(1.2, 1.2, 1.2)
mesh2.scale.multiplyScalar(1.5)
//mesh3.scale.set(0.5, 0.75, 3)
//mesh3.scale.y= 2;
mesh3.scale.multiplyScalar(0.5)
/*
const axesHelper = new THREE.AxesHelper(2)
mesh.add(axesHelper.clone())
mesh2.add(axesHelper.clone())
mesh3.add(axesHelper.clone())
*/
//mesh2.rotation.y = Math.PI * 0.25;
//mesh2.rotation.z  = Math.PI * 0.1;
mesh2.rotation.y = THREE.MathUtils.degToRad(45)
mesh2.rotation.z = THREE.MathUtils.degToRad(-15)

mesh2.rotation.order = 'ZXY'

mesh.quaternion.copy(new THREE.Quaternion(-0.1999, -1 , 0, 0))
console.log(mesh.rotation)

camera.position.y = 1;
//camera.position.set(-2, 1, 2)

const group = new THREE.Group();
group.add(mesh2, mesh3)
scene.add(group)

group.position.set(-0.2, 1, 1)
group.scale.multiplyScalar(0.5)


const v = new THREE.Vector3()
mesh2.getWorldPosition(v)

//camera.lookAt(v)
//camera.lookAt(mesh.position)

renderer.render(scene, camera)

const vel = 0.5;
//let time = Date.now();
let clock = new THREE.Clock();

function tic() {
  //const curretnTime = Date.now()
  //const deltaTIme = (curretnTime - time)/1000
  //time = curretnTime
  const deltaTIme = clock.getDelta()
  const time = clock.getElapsedTime()
  
  //console.log(time);
  
  renderer.render(scene, camera)

  mesh.position.z = Math.sin(time*0.5)-0.5
  mesh2.position.y = Math.sin(time*0.5)-0.5
  mesh3.position.x = Math.sin(time*0.5)
  
  mesh.rotation.x += vel * deltaTIme
  mesh.rotation.y += vel * deltaTIme
  mesh.rotation.z += vel * deltaTIme
  mesh2.rotation.x += 0.0
  mesh2.rotation.y += vel * deltaTIme
  mesh3.rotation.x += vel * deltaTIme
  mesh3.rotation.y += 0.0
  
  //crea la ricorsione
  requestAnimationFrame(tic)
}
// prima esecuzione funzione tic
requestAnimationFrame(tic)
