/* eslint-disable testing-library/no-unnecessary-act */
import {
  fireEvent,
  render,
  renderHook,
  screen,
  act,
} from "@testing-library/react";
import React from "react";
import { useHover } from "..";

describe("useHover", () => {
  it("should be defined", () => {
    expect(useHover).toBeDefined();
  });
  it("test hover", () => {});

  it("test function", () => {
    render(<button>Hover</button>);
    let count = 0;
    let flag = false;
    const { result } = renderHook(() => {
      // call the useHover
      useHover(screen.getByText("Hover"), {
        onEnter() {
          count++;
        },
        onChange(flagMark) {
          flag = flagMark;
        },
        onLeave() {
          count++;
        },
      });
    });

    expect(result.current).toBeUndefined();
    act(() => {
      fireEvent.mouseEnter(screen.getByText("Hover"), () => {
        expect(result.current).toBe(true);
        expect(count).toBe(1);
        expect(flag).toBe(true);
      });
    });

    act(() => {
      fireEvent.mouseLeave(screen.getByText("Hover"), () => {
        expect(result.current).toBe(false);
        expect(count).toBe(2);
        expect(flag).toBe(false);
      });
    });
  });
});
