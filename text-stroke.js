export class TextStroke extends HTMLElement {
	shadow = {ShadowRoot};
	color = 'black';
	width = 2;
	measure = 'px';
	static observedAttributes = ['width', 'color'];

	constructor() {
		super();
		this.shadow = this.attachShadow({mode: 'open'});
		this.color = this.getAttribute('color') || this.color;
		this.setWidth(this.getAttribute('width'));
	}

	connectedCallback() {
		const css = this.setCss();
		const tmpl = this.setTemplate();
		this.shadow.append(css);
		this.shadow.append(tmpl);
	}

	setWidth(width = {String}) {
		if (typeof width === 'string') {
			const arr = width.match(/(\d+)(\D*)/);
			this.measure = arr.pop();
			this.width = arr.pop();
		}
	}

	setTemplate() {
		const tmpl = `<slot></slot>`;
		return document.createRange().createContextualFragment(tmpl);
	}

	setCss() {
		const color = this.color;
		const pos = this.width + this.measure;
		const neg = (this.width * -1) + this.measure;
		const css = `
			<style>
			::slotted(*) {
		        text-shadow:
		        ${neg} ${neg} 0 ${color},
		        0 ${neg} 0 ${color},
		        ${pos} ${neg} 0 ${color},
		        ${pos} 0 0 ${color},
		        ${pos} ${pos} 0 ${color},
		        0 ${pos} 0 ${color},
		        ${neg} ${pos} 0 ${color},
		        ${neg} 0 0 ${color};
			}
			</style>
		`;

		return document.createRange().createContextualFragment(css);
	}
}

document.addEventListener('DOMContentLoaded', customElements.define('text-stroke', TextStroke));
