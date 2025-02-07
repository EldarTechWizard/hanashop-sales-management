import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, describe } from "vitest";
import App from "../app/App";

describe("Navigation Test", () => {
  test("navigates between pages when clicking the button", async () => {

    render(
      <App/>
    );

    // ✅ Assert initial page content
    expect(await screen.findByText("landing"));

    // ✅ Click the navigation button
    const button1 = await screen.findByRole("button", { name: /here/i });
    await userEvent.click(button1);

    // ✅ Assert the new page loaded
    await waitFor(() => expect(screen.getByText("example")));

    // ✅ Click to go back
    await userEvent.click(await screen.findByRole("button", { name: /here/i }));

    // ✅ Assert we are back on the home page
    await waitFor(() => expect(screen.getByText("landing")));
  });
});
