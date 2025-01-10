/* BOILERPLATE */

const templateEl = document.createElement('template');
templateEl.innerHTML = `
	<style>
		:host {
			display: block;
			margin-bottom: var(--advance-component-margin-bottom, 1rem);
			margin-top: var(--advance-component-margin-top, 1rem);
		}

		ol {
			margin-bottom: 0;
			margin-top: 0;
		}
	</style>

	<ol></ol>
`;

const itemTemplateEl = document.createElement('template');
itemTemplateEl.innerHTML = `
	<li><img src="${import.meta.resolve('./advance-component.svg')}"> <slot></slot></li>
`;

class AdvanceComponent extends HTMLElement {

	// STATIC PROPERTY(IES)

	static observedAttributes = [ 'start' ];

	// STATIC METHOD(S)

	// PRIVATE PROPERTY(IES)

	#listEl;
	#start;

	// PRIVATE METHOD(S)

	// PUBLIC PROPERTY(IES)

	get start() {
		return this.#start;
	}
	set start(newValue) {
		this.#start = newValue;
		if (this.#start == null) {
			this.#listEl.removeAttribute('start');
		} else {
			this.#listEl.setAttribute('start', this.#start);
		}
	}

	// PUBLIC METHOD(S)

	// LIFE CYCLE

	constructor() {
		super();

		console.log('CONSTRUCTOR', this);

		this.attachShadow({
			mode: 'open',
			slotAssignment: 'manual'
		});
		this.shadowRoot.appendChild(templateEl.content.cloneNode(true));

		this.#listEl = this.shadowRoot.querySelector('ol');

		new MutationObserver(() => {
			this.mutationCallback();
		}).observe(this, { childList: true });
		this.mutationCallback();
	}

	connectedCallback() {
		console.log('CONNECTED CALLBACK', this);
	}

	disconnectedCallback() {
		console.log('DISCONNECTED CALLBACK', this);
	}

	adoptedCallback() {
		console.log('ADOPTED CALLBACK');
	}

	attributeChangedCallback(name, oldValue, newValue) {
		console.log('ATTRIBUTE CHANGED CALLBACK');

		switch (name) {
			case 'start':
				this.start = newValue;
				break;
		}
	}

	mutationCallback(mutationRecords) {
		console.log('MUTATION CALLBACK', this);

		const itemEls = [];
		for (const child of this.children) {
			const itemEl = itemTemplateEl.content.cloneNode(true);
			const slot = itemEl.querySelector('slot');
			slot.assign(child);
			itemEls.push(itemEl);
		}
		this.#listEl.replaceChildren(...itemEls);
	}
}

customElements.define('advance-component', AdvanceComponent);
