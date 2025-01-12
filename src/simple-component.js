/* BOILERPLATE */

const templateEl = document.createElement('template');
templateEl.innerHTML = `
	<style>
		:host {
			display: block;
		}
	</style>
`;

class SimpleComponent extends HTMLElement {

	// STATIC PROPERTY(IES)

	static observedAttributes = [];

	// STATIC METHOD(S)

	// PRIVATE PROPERTY(IES)

	// PRIVATE METHOD(S)

	// PUBLIC PROPERTY(IES)

	// PUBLIC METHOD(S)

	// LIFE CYCLE

	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(templateEl.content.cloneNode(true));
	}

	connectedCallback() { }

	disconnectedCallback() { }

	adoptedCallback() { }

	attributeChangedCallback(name, oldValue, newValue) { }
}

customElements.define('simple-component', SimpleComponent);
