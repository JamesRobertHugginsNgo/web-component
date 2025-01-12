/* BOILERPLATE: ../src/simple-component.js */

const templateEl = document.createElement('template');
templateEl.innerHTML = `
	<style>
		:host {
			display: block;
			margin-bottom: 1rem;
			margin-top: 1rem;
		}
	</style>

	<span class="greeting">Hello</span> <slot>World</slot>.
`;

class SimpleComponent extends HTMLElement {

	// STATIC PROPERTY(IES)

	static observedAttributes = ['greeting'];

	// STATIC METHOD(S)

	// PRIVATE PROPERTY(IES)

	#greeting;
	#greetingEl;

	// PRIVATE METHOD(S)

	// PUBLIC PROPERTY(IES)

	get greeting() {
		return this.#greeting;
	}
	set greeting(newValue) {
		this.#greeting = newValue;
		if (this.#greeting == null) {
			this.#greetingEl.textContent = 'Hello';
		} else {
			this.#greetingEl.textContent = this.#greeting;
		}
	}

	// PUBLIC METHOD(S)

	// LIFE CYCLE

	constructor() {
		super();

		console.log('CONSTRUCTOR', this);

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(templateEl.content.cloneNode(true));

		this.#greetingEl = this.shadowRoot.querySelector('.greeting');
	}

	connectedCallback() {
		console.log('CONNECTED CALLBACK', this);
	}

	disconnectedCallback() {
		console.log('DISCONNECTED CALLBACK', this);
	}

	adoptedCallback() {
		console.log('ADOPTED CALLBACK', this);
	}

	attributeChangedCallback(name, oldValue, newValue) {
		console.log('ATTRIBUTE CHANGED CALLBACK', this);

		switch (name) {
			case 'greeting':
				this.greeting = newValue;
				break;
		}
	}
}

customElements.define('simple-component', SimpleComponent);
