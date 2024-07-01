import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const World = () => {
  const mountRef = useRef(null); // Ref to hold the mounting DOM element

  useEffect(() => {
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Append the renderer to the DOM
    mountRef.current.appendChild(renderer.domElement);

    // Create a sphere
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    scene.add(sphere);

    // Add a light source
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
    scene.add(ambientLight);

    // Set the camera position
    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the sphere for some basic animation
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;
      
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  // The main return that renders the JSX
  return (
    <><div className='Content' ref={mountRef} /><h1>World Battles</h1></>
  );
};

export default World;
