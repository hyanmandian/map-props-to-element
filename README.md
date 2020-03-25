# React Bridge to Web Components

## Example

```javascript
import mapsPropsToElement from "@hyanmandian/map-props-to-element";

function Example() {
  const elRef = useRef();

  return (
    <example-of-web-component ref={mapsPropsToElement({
      ref: elRef,
      onChange: () => {},
      disabled: true,
    })}></example-of-web-component>
  );
}
```
