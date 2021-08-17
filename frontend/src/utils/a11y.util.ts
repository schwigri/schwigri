import { debugClient } from "./debug.util";

export class Dialog {
	static DialogOpenClass = "has-dialog";
	callback: (() => void) | null = null;
	dialogNode: HTMLElement | null = null;
	focusAfterClosed: HTMLElement | null = null;
	focusFirst: HTMLElement | null = null;
	ignoreUntilFocusChanges = false;
	lastFocus: HTMLElement | null = null;
	openDialogList = Array<Dialog>(0);
	postNode: HTMLDivElement | null = null;
	preNode: HTMLDivElement | null = null;

	constructor(
		dialogId: string,
		focusAfterClosed: string,
		options?: { callback?: () => void; focusFirst?: string }
	) {
		const { callback, focusFirst } = options || {};

		this.dialogNode = document.getElementById(dialogId);
		if (this.dialogNode === null) {
			throw new Error(`No element found with ID: ${dialogId}`);
		}

		const validRoles = ["alertdialog", "dialog"];
		const isDialog = (this.dialogNode.getAttribute("role") || "")
			.trim()
			.split(/\s+/g)
			.some(token => validRoles.some(role => token === role));
		if (!isDialog) {
			throw new Error("The target dialog does not have a valid role");
		}

		if (callback) this.callback = callback;

		document.body.classList.add(Dialog.DialogOpenClass);

		this.focusAfterClosed = document.getElementById(focusAfterClosed);
		if (focusFirst) this.focusFirst = document.getElementById(focusFirst);

		if (this.dialogNode.parentNode) {
			const preDiv = document.createElement("div");
			this.preNode = this.dialogNode.parentNode.insertBefore(
				preDiv,
				this.dialogNode
			);
			this.preNode.tabIndex = 0;

			const postDiv = document.createElement("div");
			this.postNode = this.dialogNode.parentNode.insertBefore(
				postDiv,
				this.dialogNode.nextSibling
			);
			this.postNode.tabIndex = 0;
		}

		if (this.openDialogList.length > 0) {
			this.getCurrentDialog()?.removeListeners();
		}

		this.addListeners();
		this.openDialogList.push(this);
		this.clearDialog();
	}

	addListeners = (): void => {
		document.addEventListener("focus", this.trapFocus, true);
		document.addEventListener("keyup", this.handleEscape, true);
	};

	attemptFocus = (element: HTMLElement | ChildNode): boolean => {
		if (!this.isFocusable(element)) return false;

		this.ignoreUntilFocusChanges = true;

		try {
			(element as HTMLElement).focus();
		} catch (e) {
			debugClient("Failed to focus: %o", (e as Error).message);
		}

		this.ignoreUntilFocusChanges = false;
		return document.activeElement === element;
	};

	clearDialog = (): void => {
		Array.prototype.map.call(
			this.dialogNode?.querySelectorAll("input"),
			input => (input.value = "")
		);
	};

	close = (): void => {
		this.openDialogList.pop();
		this.removeListeners();
		if (this.preNode) this.remove(this.preNode);
		if (this.postNode) this.remove(this.postNode);
		this.focusAfterClosed?.focus();

		if (this.openDialogList.length > 0) {
			this.getCurrentDialog()?.addListeners();
		} else {
			document.body.classList.remove(Dialog.DialogOpenClass);
		}

		if (this.callback) this.callback();
	};

	closeCurrentDialog = (): boolean => {
		const currentDialog = this.getCurrentDialog();
		if (currentDialog) {
			currentDialog.close();
			return true;
		}

		return false;
	};

	focusFirstDescendent = (element: HTMLElement | ChildNode): boolean => {
		for (let i = 0; i < element.childNodes.length; i++) {
			const child = element.childNodes[i];
			if (this.attemptFocus(child) || this.focusFirstDescendent(child)) {
				return true;
			}
		}

		return false;
	};

	focusLastDescendent = (element: HTMLElement | ChildNode): boolean => {
		for (let i = element.childNodes.length - 1; i >= 0; i--) {
			const child = element.childNodes[i];
			if (this.attemptFocus(child) || this.focusLastDescendent(child))
				return true;
		}

		return false;
	};

	getCurrentDialog = (): Dialog | undefined => {
		if (this.openDialogList.length) {
			return this.openDialogList[this.openDialogList.length - 1];
		}
	};

	handleEscape = (e: KeyboardEvent): void => {
		if (("Escape" === e.key || "Esc" === e.key) && this.closeCurrentDialog()) {
			e.stopPropagation();
		}
	};

	isFocusable = (element: HTMLElement | ChildNode): boolean => {
		if (
			(element as HTMLElement).tabIndex >= 0 ||
			((element as HTMLElement).tabIndex === 0 &&
				(element as HTMLElement).getAttribute("tabIndex") !== null)
		) {
			return true;
		}

		switch (element.nodeName) {
			case "A":
				return (
					!!(element as HTMLAnchorElement).href &&
					(element as HTMLAnchorElement).rel !== "ignore"
				);

			case "INPUT":
				return (element as HTMLInputElement).type !== "hidden";

			case "BUTTON":
			case "SELECT":
			case "TEXTAREA":
				return true;

			default:
				return false;
		}
	};

	remove = (element: HTMLDivElement): boolean => {
		if (element.remove && "function" === typeof element.remove) {
			element.remove();
			return true;
		}

		if (
			element.parentNode &&
			element.parentNode.removeChild &&
			"function" === typeof element.parentNode.removeChild
		) {
			element.parentNode.removeChild(element);
			return true;
		}

		return false;
	};

	removeListeners = (): void => {
		document.removeEventListener("focus", this.trapFocus, true);
		document.removeEventListener("keyup", this.handleEscape, true);
	};

	trapFocus = (e: FocusEvent): void => {
		if (this.ignoreUntilFocusChanges) return;

		const currentDialog = this.getCurrentDialog();
		if (currentDialog?.dialogNode) {
			if (currentDialog?.dialogNode?.contains(e.target as HTMLElement)) {
				currentDialog.lastFocus = e.target as HTMLElement;
			} else {
				this.focusFirstDescendent(currentDialog.dialogNode);

				if (currentDialog.lastFocus === document.activeElement) {
					this.focusLastDescendent(currentDialog.dialogNode);
				}

				currentDialog.lastFocus = document.activeElement as HTMLElement;
			}
		}
	};
}
