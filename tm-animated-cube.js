import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

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
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'tm-animated-cube',
      },
    };
  }
}

window.customElements.define('tm-animated-cube', TmAnimatedCube);
