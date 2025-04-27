// == TEMPLATE(S) ==
const templateEl = document.createElement('template');
templateEl.innerHTML = `
	<link rel="stylesheet" href="${import.meta.resolve('./advance-component.css')}">
	<ol></ol>
`;
const itemTemplateEl = document.createElement('template');
itemTemplateEl.innerHTML = `
	<li><img src="${import.meta.resolve('./advance-component.svg')}"> <slot></slot></li>
`;
// == CLASS ==
export default class AdvanceComponent extends HTMLElement {
	// -- STATIC PROPERTY(IES) --
	static observedAttributes = ['start'];
	// -- STATIC METHOD(S) --
	// -- PRIVATE PROPERTY(IES) --
	#listEl;
	#start = 1;
	// -- PRIVATE METHOD(S) --
	#mutationCallback() {
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
	// -- PUBLIC PROPERTY(IES) --
	get start() {
		return this.#start;
	}
	set start(newValue) {
		if (this.#start === newValue) {
			return;
		}
		this.#start = newValue;
		if (this.#start == 1) {
			this.#listEl.removeAttribute('start');
			return;
		}
		this.#listEl.setAttribute('start', String(this.#start));
	}
	// -- PUBLIC METHOD(S) --
	// -- LIFE CYCLE --
	constructor() {
		super();
		console.log('CONSTRUCTOR', this);
		this.attachShadow({
			mode: 'open',
			slotAssignment: 'manual',
		});
		this.shadowRoot.appendChild(templateEl.content.cloneNode(true));
		this.#listEl = this.shadowRoot.querySelector('ol');
		new MutationObserver(() => {
			this.#mutationCallback();
		}).observe(this, { childList: true });
		this.#mutationCallback();
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
		console.log(
			'ATTRIBUTE CHANGED CALLBACK',
			this,
			name,
			oldValue,
			newValue,
		);
		switch (name) {
			case 'start': {
				if (newValue == null) {
					this.start = 1;
					break;
				}
				const numberValue = +newValue;
				if (isNaN(numberValue)) {
					this.start = 1;
					break;
				}
				this.start = numberValue;
				break;
			}
		}
	}
}
// == DEFINE ==
customElements.define('advance-component', AdvanceComponent);
