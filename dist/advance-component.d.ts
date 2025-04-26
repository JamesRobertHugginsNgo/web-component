export default class AdvanceComponent extends HTMLElement {
	#private;
	static observedAttributes: string[];
	get start(): string | null;
	set start(newValue: string | null);
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
