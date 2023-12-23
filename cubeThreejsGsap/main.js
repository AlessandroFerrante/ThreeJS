import * as THREE from 'three' 
import gsap from 'gsap'
console.log(THREE)

const scene =  new THREE.Scene();
const geometry1 = new THREE.SphereGeometry(1, 15, 15)
const geometry2 = new THREE.ConeGeometry(1, 2, 110, 1)
const geometry3 = new THREE.BoxGeometry(1, 1, 1,2,1,2)
const material  = new THREE.LineBasicMaterial({color: 0x00ff00})
const mesh = new THREE.Line(geometry1, material)
const mesh2 = new THREE.Line(geometry2, material)
const mesh3 = new THREE.Line(geometry3, material)
 
 
scene.add(mesh, mesh2, mesh3);

const _window = {
  width: 1024,
  height: 720
}
const camera = new THREE.PerspectiveCamera(75, _window.width/_window.height, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(_window.width, _window.height)

document.body.appendChild( renderer.domElement)

mesh2.position.x = -2;
mesh3.position.x = 2;
camera.position.z = 4;
  
const group = new THREE.Group()
group.add(mesh2, mesh3)
scene.add(group)
group.position.set(0, 1, 1)
group.scale.multiplyScalar(0.5)
mesh.scale.multiplyScalar(0)
mesh2.scale.multiplyScalar(0)
mesh3.scale.multiplyScalar(0)
renderer.render(scene, camera)

let vel = 0.5
const clock = new THREE.Clock()

function tic() {
  const deltaTIme = clock.getDelta()
  const time = clock.getElapsedTime()

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
  
  requestAnimationFrame(tic)
}

requestAnimationFrame(tic)

function pop() {
  gsap.to(mesh.scale,{ duration: 1, x:1, y:1, z:1 })
  gsap.to(mesh2.scale,{ duration: 0.5, x:1, y:1, z:1 })
  gsap.to(mesh3.scale,{ duration: 2, x:1, y:1, z:1 })
  gsap.to(mesh.rotation,{ duration: 1, x:3.14, y:3.14, z:3.14})
  gsap.to(mesh2.rotation,{ duration: 1, x:3.14, y:3.14, z:3.14})
  gsap.to(mesh3.rotation,{ duration: 1, x:3.14, y:3.14, z:3.14})

}

window.addEventListener('click', pop)
window.addEventListener('keypress', 
function(){
  //requestAnimationFrame(tic)
  vel += 3;
})
window.addEventListener('dblclick', 
function(){
  //requestAnimationFrame(tic)
  vel = 0.5;
}) 