/**
 *  Renders a stroke around some text
 *
 *  @author Holmes Bryant <webbmaastaa@gmail.com>
 *  @license GPL-3.0
 *
 *  @attribute [strokecolor] optional (default: "silver") The color of the stroke.
 *  @attribute [strokewidth] optional (default: "2px") The width of the stroke.
 *
 *  @usage
 *  	<script type="module" src="text-stroke.js"></script>
 *  	<text-stroke>Some text to stroke</text-stroke>
 */
export class TextStroke extends HTMLElement {
	shadow = ShadowRoot;
	neg = '-2px';
	pos = '2px';
	measure = 'px';
	#strokecolor = 'silver';
	#strokewidth = '2';
	static observedAttributes = ['strokewidth', 'strokecolor'];

	constructor() {
		super();
		this.shadow = this.attachShadow({mode: 'open'});
		this.shadow.innerHTML = `
		<style>
			::slotted(*) {
		        text-shadow:
		        ${this.neg} ${this.neg} 0 ${this.strokecolor},
		        0 ${this.neg} 0 ${this.strokecolor},
		        ${this.pos} ${this.neg} 0 ${this.strokecolor},
		        ${this.pos} 0 0 ${this.strokecolor},
		        ${this.pos} ${this.pos} 0 ${this.strokecolor},
		        0 ${this.pos} 0 ${this.strokecolor},
		        ${this.neg} ${this.pos} 0 ${this.strokecolor},
		        ${this.neg} 0 0 ${this.strokecolor};
			}
		</style>
		<slot></slot>
		`;
	}

	connectedCallback() {
		if (this.children.length < 1) {
			this.wrapTextInsideElement('h1');
		}
		this.#strokewidth = this.getAttribute('strokewidth') || this.strokewidth;
		this.#strokecolor = this.getAttribute('strokecolor') || this.strokecolor;
		this.update(this.#strokewidth);
	}

	attributeChangedCallback(attr, oldval, newval) {
		this[attr] = newval;
	}

	update(width) {
		const el = this.shadow.querySelector('style');

		if (typeof width === 'string' && isNaN(width)) {
			const arr = width.match(/([\d.]+)(\D*)/);
			this.measure = arr.pop();
			width = arr.pop();
		}

		this.pos = width + this.measure;
		this.neg = (width * -1) + this.measure;
		this.setCss();
	}

	setCss() {
		const css = `
			<style>
			::slotted(*) {
		        text-shadow:
		        ${this.neg} ${this.neg} 0 ${this.strokecolor},
		        0 ${this.neg} 0 ${this.strokecolor},
		        ${this.pos} ${this.neg} 0 ${this.strokecolor},
		        ${this.pos} 0 0 ${this.strokecolor},
		        ${this.pos} ${this.pos} 0 ${this.strokecolor},
		        0 ${this.pos} 0 ${this.strokecolor},
		        ${this.neg} ${this.pos} 0 ${this.strokecolor},
		        ${this.neg} 0 0 ${this.strokecolor};
			}
			</style>
		`;

		const frag = document.createRange().createContextualFragment(css);
		const el = this.shadow.querySelector('style');
		this.shadow.replaceChild(frag, el);
	}

	wrapTextInsideElement(elemTxt) {
		const elem = document.createElement(elemTxt);
		elem.innerText = this.innerHTML.trim();
		this.innerHTML = '';
		this.append(elem);
	}

	get strokecolor() { return this.#strokecolor; }
	set strokecolor(value) {
		if (!value) value = 'inherit';
		this.#strokecolor = value;
		this.update(this.strokewidth);
		// console.log('color', this.#strokecolor);
	}

	get strokewidth() { return this.#strokewidth; }
	set strokewidth(value) {
		if (!value) value = '2px';
		this.#strokewidth = value;
		this.update(value);
		// console.log('width', this.#strokewidth);
	}

}

document.addEventListener('DOMContentLoaded', customElements.define('text-stroke', TextStroke));
