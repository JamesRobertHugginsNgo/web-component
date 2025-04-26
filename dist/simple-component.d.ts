export default class SimpleComponent extends HTMLElement {
	#private;
	static observedAttributes: string[];
	get greeting(): string | null;
	set greeting(newValue: string | null);
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
