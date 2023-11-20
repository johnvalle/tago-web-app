import "../mocks/watchMedia";
import { describe, it } from "vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { List } from "@/features";
import { BrowserRouter } from "react-router-dom";
import { TAGO_PIN } from "@/constants/vars";
import { useLocalStorage } from "@mantine/hooks";

describe("Add Item Modal", () => {
  const setup = () => {
    render(<BrowserRouter><List /></BrowserRouter>)
    const addItemButton = screen.getByText("Add item");
    return {
      addItemButton
    }
  }

  it("should show dialog add item button is clicked and no pin was added yet", async () => {
    // arrange
    const { addItemButton } = setup();
    // act
    fireEvent.click(addItemButton);
    // assert
    expect(screen.getByTestId('pinRequiredDialog')).toBeInTheDocument();
  })

  it("should show modal if add item button is clicked and a pin was already added", async () => {
    // arrange
    const { addItemButton } = setup();
    // act
    const { result: { current: [_, setPin] }} = renderHook(() => useLocalStorage({ key: TAGO_PIN }));
    act(() => setPin("test-pin"));
    fireEvent.click(addItemButton);
    // assert
    waitFor(() => expect(screen.getByTestId('addItemModal')).toBeInTheDocument());
  })
});