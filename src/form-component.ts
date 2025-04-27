// == TEMPLATE ==

const templateEl: HTMLTemplateElement = document.createElement('template');
templateEl.innerHTML = `
	<style>
		:host {
			display: block;
			margin-bottom: 1rem;
			margin-top: 1rem;
		}
		input {
			border: 2px solid darkgrey;
			font-size: 1rem;
			line-height: normal;
			padding: 0.5rem 1rem;

			&:valid {
				border-color: darkgreen;
			}
			&:invalid {
				border-color: darkred;
			}
		}
	</style>
	<input type="text">
`;

// == CLASS ==

export default class FormComponent extends HTMLElement {

	// -- STATIC PROPERTY(IES) --

	static formAssociated: boolean = true;
	static observedAttributes: string[] = [
		'readonly',
		'required',
		'value'
	];

	// -- STATIC METHOD(S) --

	// -- PRIVATE PROPERTY(IES) --

	#internals: ElementInternals;

	#inputEl: HTMLInputElement;

	#readOnly: boolean = false;
	#required: boolean = false;

	// -- PRIVATE METHOD(S) --

	#setFormValue(): void {
		this.#internals.setFormValue(this.#inputEl.value);
		this.#setValidity();
	}

	#setValidity(): void {
		this.#internals.setValidity(
			this.#inputEl.validity,
			this.#inputEl.validationMessage,
			this.#inputEl
		);
	}

	// -- PUBLIC PROPERTY(IES) --

	get name(): null | string {
		return this.getAttribute('name');
	}

	get readonly(): boolean {
		return this.#readOnly;
	}
	set readonly(newValue: boolean) {
		if (this.#readOnly === newValue) {
			return;
		}

		this.#readOnly = newValue;

		if (!this.#readOnly) {
			this.#inputEl.removeAttribute('readonly');
			this.#setValidity();
			return;
		}

		this.#inputEl.setAttribute('readonly', '');
		this.#setValidity();
	}

	get required(): boolean {
		return this.#required;
	}
	set required(newValue: boolean) {
		if (this.#required === newValue) {
			return;
		}

		this.#required = newValue;

		if (!this.#required) {
			this.#inputEl.removeAttribute('required');
			this.#setValidity();
			return;
		}

		this.#inputEl.setAttribute('required', '');
		this.#setValidity();
	}

	get validity(): ValidityState {
		return this.#internals.validity;
	}

	get validationMessage(): string {
		return this.#internals.validationMessage;
	}

	get value(): string {
		return this.#inputEl.value;
	}
	set value(newValue: string) {
		this.#inputEl.value = newValue;
		this.#setFormValue();
	}

	// -- PUBLIC METHOD(S) --

	checkValidity(): boolean {
		return this.#internals.checkValidity();
	}

	reportValidity(): boolean {
		return this.#internals.reportValidity();
	}

	// -- LIFE CYCLE --

	constructor() {
		super();

		console.log('CONSTRUCTOR', this);

		this.attachShadow({
			mode: 'open',
			delegatesFocus: true
		});
		this.shadowRoot!.appendChild(templateEl.content.cloneNode(true));
		this.#internals = this.attachInternals();

		this.#inputEl = this.shadowRoot!.querySelector('input')!;
		this.#setValidity();
		this.#inputEl.addEventListener('input', () => {
			this.#setFormValue();
		});
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

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		console.log('ATTRIBUTE CHANGED CALLBACK', this, name, oldValue, newValue);

		switch (name) {
			case 'readonly':
				this.readonly = newValue != null;
				break;
			case 'required':
				this.required = newValue != null;
				break;
			case 'value':
				this.value = newValue;
				break;
		}
	}

	// -- FORM LIFE CYCLE --

	formAssociatedCallback(formEl: HTMLFormElement): void {
		console.log('FORM ASSOCIATED CALLBACK', this, formEl);
	}

	formResetCallback(): void {
		console.log('FORM RESET CALLBACK', this);

		const value = this.getAttribute('value');
		if (value == null) {
			this.value = '';
		} else {
			this.value = value;
		}
	}

	formDisabledCallback(isDisabled: boolean): void {
		console.log('FORM DISABLED CALLBACK', this, isDisabled);

		if (isDisabled) {
			this.#inputEl.setAttribute('disabled', '');
		} else {
			this.#inputEl.removeAttribute('disabled');
		}
		this.#setValidity();
	}

	formStateRestoreCallback(state: null | string | File | FormData, reason: 'restore' | 'autocomplete'): void {
		console.log('FORM STATE RESTORE CALLBACK', this, state, reason);

		if (state == null) {
			return;
		}
		this.#inputEl.value = state as string;
	}
}

// == DEFINE ==

customElements.define('form-component', FormComponent);
