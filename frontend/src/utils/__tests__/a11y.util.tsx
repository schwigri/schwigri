import { Dialog } from "../a11y.util";
import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("a11y.util:Dialog", () => {
	it("should open a valid dialog during construction", () => {
		render(
			<div>
				<button id="button">Button</button>

				<aside id="dialog" role="dialog">
					<a id="link1" href="https://localhost">
						Link 1
					</a>
					<a id="link2" href="https://localhost">
						Link 2
					</a>
				</aside>
			</div>
		);

		const dialog = new Dialog("dialog", "button");

		expect(document.body.classList.contains(Dialog.DialogOpenClass)).toBe(true);

		userEvent.tab();
		expect(document.activeElement?.getAttribute("id")).toBe("link1");
		userEvent.tab();
		expect(document.activeElement?.getAttribute("id")).toBe("link2");
		userEvent.tab();
		expect(document.activeElement?.getAttribute("id")).toBe("link1");

		dialog.close();
		expect(document.activeElement?.getAttribute("id")).toBe("button");
	});
});
