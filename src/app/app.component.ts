import { Component } from '@angular/core';
import { NgtCanvas, extend } from 'angular-three';
import { SceneGraphComponent } from './scene-graph/scene-graph.component';
import * as THREE from 'three';

extend(THREE);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgtCanvas],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'three-js';
  protected sceneGraph = SceneGraphComponent;

}
