import { useEffect } from 'react';
import './App.css';
import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
function App() {
  useEffect(() => {
    let  controls, stats;

    let mesh, geometry, material, clock;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xaabcff );
		scene.fog = new THREE.FogExp2( 0xaaccff, 0.0005 );
    const camera = new THREE.PerspectiveCamera(60, 800 / 300, 1, 2000);
    camera.position.y = 500;

    clock = new THREE.Clock();
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(800, 300);
    const canvasRef = document.getElementById('canvasRef');
    canvasRef.appendChild(renderer.domElement);
    const worldWidth = 128, worldDepth = 128;
    geometry = new THREE.PlaneGeometry( 20000, 20000, worldWidth - 1, worldDepth - 1 );
				geometry.rotateX( - Math.PI / 2 );

				const position = geometry.attributes.position;
				position.usage = THREE.DynamicDrawUsage;

				for ( let i = 0; i < position.count; i ++ ) {

					const y = 35 * Math.sin( i / 2 );
					position.setY( i, y );

				}
    
        const texture = new THREE.TextureLoader().load('textures/water.jpg');
				texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
				texture.repeat.set( 5, 5 );
				texture.colorSpace = THREE.SRGBColorSpace;
        material = new THREE.MeshBasicMaterial( { color: 0x0044ff, map: texture } );
				mesh = new THREE.Mesh( geometry, material );
				scene.add( mesh );
        controls = new FirstPersonControls( camera, renderer.domElement );

				controls.movementSpeed = 500;
				controls.lookSpeed = 0.1;

        stats = new Stats()

    let animationId;

    function animate() {
      requestAnimationFrame( animate );
      render();
      stats.update();
    
    }
    function render() {

      
      const time = clock.getElapsedTime() * 10;

      const position = geometry.attributes.position;

      for ( let i = 0; i < position.count; i ++ ) {

        const y = 35 * Math.sin( i / 5 + ( time + i ) / 7 );
        position.setY( i, y );

      }

      position.needsUpdate = true;

      renderer.render( scene, camera );

    }
    animate();

    return () => {
      // Limpiar recursos al desmontar
      cancelAnimationFrame(animationId);
      // Remover el canvas al desmontar
      canvasRef.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <>
     <div className="container">
  <div className="head">
    <h2>Fluid Simulator</h2>
    <p className="read-the-docs">By Jose Plata</p>
  </div>
  <div className="card">
    <div id="canvasRef" className="simulator">
      {/* El canvas se agregará aquí */}
    </div>
   
  </div>
</div>
    </>
  );
}

export default App;
