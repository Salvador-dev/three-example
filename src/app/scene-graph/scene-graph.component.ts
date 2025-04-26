import { Component, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, viewChild, ElementRef, computed, inject } from '@angular/core';
import { extend, injectBeforeRender, injectLoader, injectStore, NgtArgs } from 'angular-three';
import { Color, Mesh, MeshStandardMaterial } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three-stdlib';

extend({OrbitControls});

@Component({
  selector: 'app-scene-graph',
  standalone: true,
  imports: [NgtArgs],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './scene-graph.component.html',
  styleUrl: './scene-graph.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SceneGraphComponent {

  // configService = inject(ConfigService)

  ngtStore = injectStore();

  gltf = injectLoader(() => GLTFLoader, () => `assets/cup_of_coffee/scene.gltf`);

  model = computed(() => {
    const gltf = this.gltf();

    if(!gltf) return null;

    const color = '#48e';
    const mesh = gltf.scene.getObjectByName('Object_2') as Mesh;
    const material = mesh.material as MeshStandardMaterial;
    material.color.set(new Color(color));

    return gltf.scene;
  });

  camera = this.ngtStore.select('camera');
  glDomElement = this.ngtStore.select('gl', 'domElement');

  orbitControls = viewChild.required<ElementRef<OrbitControls>>('orbitControls');

  constructor() {

    injectBeforeRender(() => {
      const orbitControls = this.orbitControls().nativeElement;

      if(orbitControls){
        orbitControls.update();
      }

      // orbitControls.rotation.x += 0.01;
      // orbitControls.rotation.y += 0.01;
    });
  }
}
