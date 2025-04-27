export default class FormComponent extends HTMLElement {
	#private;
	static formAssociated: boolean;
	static observedAttributes: string[];
	get name(): null | string;
	get readonly(): boolean;
	set readonly(newValue: boolean);
	get required(): boolean;
	set required(newValue: boolean);
	get validity(): ValidityState;
	get validationMessage(): string;
	get value(): string;
	set value(newValue: string);
	checkValidity(): boolean;
	reportValidity(): boolean;
	constructor();
	connectedCallback(): void;
	disconnectedCallback(): void;
	adoptedCallback(): void;
	attributeChangedCallback(
		name: string,
		oldValue: string,
		newValue: string,
	): void;
	formAssociatedCallback(formEl: HTMLFormElement): void;
	formResetCallback(): void;
	formDisabledCallback(isDisabled: boolean): void;
	formStateRestoreCallback(
		state: null | string | File | FormData,
		reason: 'restore' | 'autocomplete',
	): void;
}
