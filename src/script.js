import * as THREE from 'three';
import { AsciiEffect } from 'three/addons/effects/AsciiEffect.js';

// Function to fill a given element with repeated characters based on its size
function fillElement(selector, char, multiplier) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(element => {
        const { offsetWidth: width, offsetHeight: height } = element;
        const fontSize = parseInt(window.getComputedStyle(element).fontSize, 10);

        const charsPerLine = Math.floor(width / fontSize);
        const lines = Math.floor(height / fontSize);
        const totalChars = charsPerLine * lines * multiplier;

        element.textContent = char.repeat(totalChars);
    });
}

// Wrapper function to handle different element types
function handleFiller() {
    fillElement('.filler-text', '.', 2);
    fillElement('.section-div', '-', 2);
}

// Attach event listeners
window.addEventListener('resize', handleFiller);
window.addEventListener('load', handleFiller);


// Navigation
const sections = document.querySelectorAll(".section-header");
const navItems = document.querySelectorAll(".header-nav-item");

window.onscroll = () => {
    var current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (scrollY + 85 >= sectionTop ) {
        current = section }
    });

    navItems.forEach((item) => {item.classList.remove("nav-active")});

    switch(current.id) {
        case "home":
            navItems[0].classList.add("nav-active");
            break;
        case "portfolio":
            navItems[1].classList.add("nav-active");
            break;
        case "about":
            navItems[2].classList.add("nav-active");
            break;
        case "contact":
            navItems[3].classList.add("nav-active");
            break;
    }
  };


// THREE JS For Home Screen
let camera, scene, renderer, effect;
let sphere, plane;

init();

function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 600;

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0, 0, 0 );

    const pointLight1 = new THREE.PointLight( 0xffffff, 2.5, 0, 0 );
    pointLight1.position.set( 500, 500, 500 );
    scene.add( pointLight1 );

    const pointLight2 = new THREE.PointLight( 0xffffff, 1, 0, 0 );
    pointLight2.position.set( - 500, - 500, - 500 );
    scene.add( pointLight2 );

    sphere = new THREE.Mesh( new THREE.SphereGeometry( 200, 20,10 ), new THREE.MeshPhongMaterial( { flatShading: true } ) );
    sphere.position.x = -25;
    scene.add( sphere );

    // Plane
    plane = new THREE.Mesh( new THREE.PlaneGeometry( 5000, 4000 ), new THREE.MeshBasicMaterial( { color: 0xe0e0e0 } ) );
    plane.position.y = - 200;
    scene.add( plane );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( animate );

    effect = new AsciiEffect( renderer, ' .:-+*=%@#' );
    effect.setSize( window.innerWidth, window.innerHeight );
    effect.domElement.style.color = 'black';
    effect.domElement.style.backgroundColor = 'white';

    // Attach effect.domElement to a specific HTML element
    const container = document.getElementById('three-container');
    if (container) {
        container.appendChild( effect.domElement );
    } else {
        console.error('Element with ID "three-container" not found.');
    }

    window.addEventListener( 'resize', onWindowResize );

}

// Function to update the model's rotation based on mouse position
function onDocumentMouseMove(event) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = (event.clientY / window.innerHeight) * 2 - 1;

    // Convert mouseX and mouseY to rotation values, and clamp them within tighter bounds
    const rotationX = mouseY * (Math.PI / 8); // ±45 degrees in radians for X rotation
    const rotationY = mouseX * (Math.PI / 8); // ±45 degrees in radians for Y rotation

    // Apply the rotation with clamping
    sphere.rotation.x = THREE.MathUtils.clamp(rotationX, -Math.PI / 8, Math.PI / 8);
    sphere.rotation.y = THREE.MathUtils.clamp(rotationY, -Math.PI / 8, Math.PI / 8);
}

// Listen for mouse movement
document.addEventListener('mousemove', onDocumentMouseMove, false);

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    effect.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
    effect.render( scene, camera );
}
