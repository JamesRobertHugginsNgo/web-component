export default class AdvanceComponent extends HTMLElement {
	#private;
	static observedAttributes: string[];
	get start(): number;
	set start(newValue: number);
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
