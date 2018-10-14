import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import {IronResizableBehavior} from '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';

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
class TmAnimatedCube extends mixinBehaviors([IronResizableBehavior], PolymerElement) {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
        }
        
        div {
            width: 100%;
            height: 100%;
            border: solid blue 1px;
            box-sizing: border-box;
        }
      </style>
      <div id="container">
        <div id="cube" ></div>
      </div>
      
     
    `;
    }

    static get properties() {
        return {
            scramble: {
                type: String
            },
            moves: {
                type: String
            }
        };
    }

    update(scramble, moves) {
        this.set('scramble', scramble);
        this.set('moves', moves);
        this.reset();
    }

    reset() {
        this.cube.reset();
        this.state = '';
        this.move(this.scramble);
        setTimeout(() => this.move(this.moves), 1000);
    }

    move(moves) {
        this.state += ' ' + moves;
        this.cube.move(moves);
    }

    onIronResizeHold() {
        console.log('tm-aspect-div has resized:');

        const self = this;
        if (!this.resizeTimeout) {
            this._rebuild();
            this.resizeTimeout = setTimeout(function () {
                self.resizeTimeout = null;
                self._rebuild();
            }, 200);
        }
    }

    onIronResize() {
        console.log('tm-animated-cube has resized:');

        const self = this;
        if (self.resizeCounter < 1) {
            self._rebuild();
        }
        self.resizeCounter++;
        setTimeout(function () {
            self.resizeCounter--;
            if (self.resizeCounter < 1) {
                self._rebuild();
            }
        }, 500);
    }

    connectedCallback() {
        super.connectedCallback();
        console.log('Listening for Resize Events')
        this.addEventListener('iron-resize', this.onIronResize.bind(this));
    }

    _rebuild() {
        if (!this.resizing) {
            this.resizing = true;
            console.log('Rebuilding...');
            $(this.cube).detach();
            $(this.cube).remove();
            const div = document.createElement('div');
            this.shadowRoot.querySelector('#container').appendChild(div);
            this.cube = $(div).cube({
                scramble: this.state
            });
            this.resizing = false;
        }
    }

    ready() {
        super.ready();
        this.resizing = false;
        this.resizeCounter=0;
        this.state = this.scramble;
        this.cube = $(this.$.cube).cube({
            scramble: this.scramble
        });
        const self = this;
        setTimeout(() => this.move(this.moves), 1000);

    }
}

window.customElements.define('tm-animated-cube', TmAnimatedCube);
