import { mapPropsToElement } from "../src";

describe("utils > mapPropsToElement", () => {
  it("shouldn't do anything when not receive element", () => {
    const mapping = mapPropsToElement({});
    mapping(null);
  });

  it("should set ref to element", () => {
    let ref = { current: null };

    const mapping = mapPropsToElement({ ref });

    expect(ref.current).toBe(null);

    const element = document.createElement("button");

    mapping(element);

    expect(ref.current).toBe(element);
  });

  it("should set attributes to element", () => {
    const mapping = mapPropsToElement({
      type: "button",
      online: true,
      ariaLabel: "label",
      "data-testid": "testid"
    });

    const element = document.createElement("button");

    expect(element.type).toBe("submit");
    // @ts-ignore
    expect(element["online"]).toBe(undefined);
    // @ts-ignore
    expect(element["aria-label"]).toBe(undefined);
    // @ts-ignore
    expect(element["data-testid"]).toBe(undefined);

    mapping(element);

    expect(element.type).toBe("button");
    // @ts-ignore
    expect(element["online"]).toBe(true);
    // @ts-ignore
    expect(element["aria-label"]).toBe("label");
    // @ts-ignore
    expect(element["data-testid"]).toBe("testid");
  });

  it("should add events to element when mount and remove event when unmount", () => {
    const onClick = jest.fn();

    const mapping = mapPropsToElement({ onClick });

    const element = document.createElement("button");

    mapping(element);

    element.click();

    expect(onClick).toBeCalled();

    mapping(null);
  });
});
