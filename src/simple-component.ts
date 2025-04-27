// == TEMPLATE ==

const templateEl: HTMLTemplateElement = document.createElement('template');
templateEl.innerHTML = `
	<style>
		:host {
			display: block;
		}
		p {
			margin: 1rem 0;
		}
	</style>
	<p>Hello <slot>there</slot></p>
`;

// == CLASS ==

export default class SimpleComponent extends HTMLElement {

	// -- STATIC PROPERTY(IES) --

	static observedAttributes: string[] = [
		'greeting'
	];

	// -- STATIC METHOD(S) --

	// -- PRIVATE PROPERTY(IES) --

	#rootEl: HTMLDivElement;
	#slotEL: HTMLSlotElement;

	#greeting: null | string = null;

	// -- PRIVATE METHOD(S) --

	// -- PUBLIC PROPERTY(IES) --

	get greeting(): null | string {
		return this.#greeting;
	}
	set greeting(newValue: null | string) {
		if (this.#greeting === newValue) {
			return;
		}

		this.#greeting = newValue;

		if (this.#greeting == null) {
			this.#rootEl.replaceChildren('Hello ', this.#slotEL);
			return;
		}

		this.#rootEl.replaceChildren(this.#greeting, ' ', this.#slotEL);
	}

	// -- PUBLIC METHOD(S) --

	// -- LIFE CYCLE --

	constructor() {
		super();

		console.log('CONSTRUCTOR', this);

		this.attachShadow({ mode: 'open' });
		this.shadowRoot!.appendChild(templateEl.content.cloneNode(true));

		this.#rootEl = this.shadowRoot!.querySelector('p')!;
		this.#slotEL = this.#rootEl.querySelector('slot')!;
	}

	connectedCallback(): void {
		console.log('CONNECTED CALLBACK', this);
	}

	disconnectedCallback(): void {
		console.log('DISCONNECTED CALLBACK', this);
	}

	adoptedCallback(): void {
		console.log('ADOPTED CALLBACK', this);
	}

	attributeChangedCallback(name: string, oldValue: null | string, newValue: null | string): void {
		console.log('ATTRIBUTE CHANGED CALLBACK', this, name, oldValue, newValue);

		switch (name) {
			case 'greeting':
				this.greeting = newValue;
				break;
		}
	}
}

// == DEFINE ==

customElements.define('simple-component', SimpleComponent);
