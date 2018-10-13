import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import 'jquery/dist/jquery.js';
import * as THREE from 'three';
import './lib/jquery.cube.threejs.js';
window.THREE = THREE;

/**
 * `tm-animated-cube`
 * Animated twisty puzzle cube Polymer web component.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class TmAnimatedCube extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          width: 80vw;
          height: 80vw;
        }
        div {
            width: 100%;
            height: 100%;
            border: solid red 1px;
            box-sizing: border-box;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
      <div id="cube" ></div>
      <!--<div id="cube" data-moves="(U R U' R') (U R U' R') (U R U' R') (U R U' R') (U R U' R') (U R U' R')"></div>-->
	    <h3>-----------------------------</h3>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'This is a test',
      },
    };
  }

  ready() {
      super.ready();
      // const cube = this.shadowRoot.querySelector('#cube');
      // console.log(cube);


      const c = $(this.$.cube).cube();
      c.move("R U R' U'");
      c.move("U R U' R'");


  }
}

window.customElements.define('tm-animated-cube', TmAnimatedCube);
