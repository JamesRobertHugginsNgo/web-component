export default class SimpleComponent extends HTMLElement {
	#private;
	static observedAttributes: string[];
	get greeting(): null | string;
	set greeting(newValue: null | string);
	constructor();
	connectedCallback(): void;
	disconnectedCallback(): void;
	adoptedCallback(): void;
	attributeChangedCallback(
		name: string,
		oldValue: null | string,
		newValue: null | string,
	): void;
}
