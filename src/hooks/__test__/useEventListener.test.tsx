/* eslint-disable testing-library/no-unnecessary-act */
// act (when the  operation would lead to state'chage of the component we should use act)
import { renderHook } from "@testing-library/react";
import { useEventListener } from "../index";

describe("useEventListener", () => {
  it("should bew defined", () => {
    expect(useEventListener).toBeDefined();
  });

  let container: HTMLDivElement;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it("test click event", async () => {
    let count = 0;
    const onClick = () => count++;
    const { rerender, unmount } = renderHook(() =>
      useEventListener("click", onClick, container)
    );
    document.body.click();
    expect(count).toEqual(0);
    container.click();
    expect(count).toEqual(1);
    rerender(); // could pass a newProp to the Comonent
    container.click();
    expect(count).toEqual(2);
    unmount();
    container.click();
    expect(count).toEqual(2);
  });
});
