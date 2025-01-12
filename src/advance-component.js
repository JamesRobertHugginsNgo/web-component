/* BOILERPLATE */

const templateEl = document.createElement('template');
templateEl.innerHTML = `
	<style>
		:host {
			display: block;
		}
	</style>
`;

class AdvanceComponent extends HTMLElement {

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

		this.attachShadow({
			mode: 'open',
			slotAssignment: 'manual'
		});
		this.shadowRoot.appendChild(templateEl.content.cloneNode(true));

		new MutationObserver(() => {
			this.mutationCallback();
		}).observe(this, { childList: true });
		this.mutationCallback();
	}

	connectedCallback() { }

	disconnectedCallback() { }

	adoptedCallback() { }

	attributeChangedCallback(name, oldValue, newValue) { }

	mutationCallback(mutationRecords) { }
}

customElements.define('advance-component', AdvanceComponent);
