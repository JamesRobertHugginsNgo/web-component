/* BOILERPLATE */

const templateEl = document.createElement('template');
templateEl.innerHTML = `
	<style>
		:host {
			display: block;
		}
	</style>

	<input>
`;

class FormComponent extends HTMLElement {

	// STATIC PROPERTY(IES)

	static formAssociated = true;
	static observedAttributes = ['value'];

	// STATIC METHOD(S)

	// PRIVATE PROPERTY(IES)

	#inputEl;
	#internals;

	// PRIVATE METHOD(S)

	#setFormValue() {
		this.#internals.setFormValue(this.#inputEl.value);
		this.#setValidity();
	}

	#setValidity() {
		this.#internals.setValidity(
			this.#inputEl.validity,
			this.#inputEl.validationMessage,
			this.#inputEl
		);
	}

	// PUBLIC PROPERTY(IES)

	get name() {
		return this.getAttribute('name');
	}

	get validity() {
		return this.#internals.validity;
	}

	get validationMessage() {
		return this.#internals.validationMessage;
	}

	get value() {
		return this.#inputEl.value;
	}
	set value(newValue) {
		this.#inputEl.value = newValue;
		this.#setFormValue();
	}

	// PUBLIC METHOD(S)

	checkValidity() {
		return this.#internals.checkValidity();
	}

	reportValidity() {
		return this.#internals.reportValidity();
	}

	// LIFE CYCLE

	constructor() {
		super();

		this.attachShadow({
			mode: 'open',
			delegatesFocus: true
		});
		this.shadowRoot.appendChild(templateEl.content.cloneNode(true));

		this.#internals = this.attachInternals();

		this.#inputEl = this.shadowRoot.querySelector('input');
		this.#setValidity();
		this.#inputEl.addEventListener('input', () => {
			this.#setFormValue();
		});
	}

	connectedCallback() { }

	disconnectedCallback() { }

	adoptedCallback() { }

	attributeChangedCallback(name, oldValue, newValue) {
		switch (name) {
			case 'value':
				this.value = newValue;
				break;
		}
	}

	formAssociatedCallback(formEl) { }

	formResetCallback() {
		const value = this.getAttribute('value');
		if (value == null) {
			this.value = '';
		} else {
			this.value = value;
		}
	}

	formDisabledCallback(isDisabled) {
		if (isDisabled) {
			this.#inputEl.setAttribute('disabled', '');
		} else {
			this.#inputEl.removeAttribute('disabled');
		}
		this.#setValidity();
	}

	formStateRestoreCallback(state, reason) { }
}

customElements.define('form-component', FormComponent);
