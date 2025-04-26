declare const templateEl: HTMLTemplateElement;
declare class FormComponent extends HTMLElement {
	#private;
	static formAssociated: boolean;
	static observedAttributes: string[];
	get name(): string | null;
	get readonly(): string | null;
	set readonly(newValue: string | null);
	get required(): string | null;
	set required(newValue: string | null);
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
