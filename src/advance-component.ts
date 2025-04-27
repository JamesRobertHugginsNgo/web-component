// == TEMPLATE(S) ==

const templateEl: HTMLTemplateElement = document.createElement('template');
templateEl.innerHTML = `
	<link rel="stylesheet" href="${import.meta.resolve('./advance-component.css')}">
	<ol></ol>
`;

const itemTemplateEl: HTMLTemplateElement = document.createElement('template');
itemTemplateEl.innerHTML = `
	<li><img src="${import.meta.resolve('./advance-component.svg')}"> <slot></slot></li>
`;

// == CLASS ==

export default class AdvanceComponent extends HTMLElement {

	// -- STATIC PROPERTY(IES) --

	static observedAttributes: string[] = [
		'start'
	];

	// -- STATIC METHOD(S) --

	// -- PRIVATE PROPERTY(IES) --

	#listEl: HTMLOListElement;

	#start: number = 1;

	// -- PRIVATE METHOD(S) --

	#mutationCallback(): void {
		console.log('MUTATION CALLBACK', this);

		const itemEls = [];
		for (const child of this.children) {
			const itemEl = itemTemplateEl.content.cloneNode(true) as DocumentFragment;
			const slot = itemEl.querySelector('slot')!;
			slot.assign(child);
			itemEls.push(itemEl);
		}
		this.#listEl.replaceChildren(...itemEls);
	}

	// -- PUBLIC PROPERTY(IES) --

	get start(): number {
		return this.#start;
	}
	set start(newValue: number) {
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
			slotAssignment: 'manual'
		});
		this.shadowRoot!.appendChild(templateEl.content.cloneNode(true));

		this.#listEl = this.shadowRoot!.querySelector('ol')!;

		new MutationObserver(() => {
			this.#mutationCallback();
		}).observe(this, { childList: true });
		this.#mutationCallback();
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
