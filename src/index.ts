interface Props {
  ref?: { current: any };
  [key: string]: any;
}

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z])(?=[a-z])/g, "$1-$2")
    .toLowerCase();
}

function getEventName(name: string): string | undefined {
  if (!name.startsWith("on")) return;

  const [firstEventLetter, ...restEventName] = name.substr(2);

  if (firstEventLetter !== firstEventLetter.toUpperCase()) return;

  return firstEventLetter.toLowerCase() + restEventName.join("");
}

export function mapPropsToElement({ ref, ...props }: Props): Function {
  let storedEl: Element;

  return (el: Element) => {
    if (!el && !storedEl) return;

    for (const key in props) {
      const eventName = getEventName(key);

      if (eventName) {
        const action = el ? el.addEventListener : storedEl.removeEventListener;

        try {
          action(eventName, props[key]);
        } catch (e) {
          // trick to fix __listeners errors when handle events in testing env
          action.call(storedEl || el, eventName, props[key]);
        }

        continue;
      }

      /* istanbul ignore else */
      if (el) {
        // @ts-ignore
        el[toKebabCase(key)] = props[key];
      }
    }

    storedEl = el;

    if (ref) {
      ref.current = storedEl;
    }
  };
}
