import React from 'react';

const focusableElementsString = `
 a[href],
 area[href],
 input:not([disabled]),
 select:not([disabled]),
 textarea:not([disabled]),
 button:not([disabled]),
 iframe,
 object,
 embed,
 [tabindex="0"],
 [contenteditable]
`;

const TAB_KEY = 9;
const ESC_KEY = 27;

type TrapElement = (() => Element) | Element;

export default function useTabTrap(getTrapElement: TrapElement, onPressEsc: () => void) {
  React.useEffect(
    () => {
      const lastFocusedElement = document.activeElement;
      const trapElement = typeof getTrapElement === 'function' ? getTrapElement() : getTrapElement;

      if (!trapElement) {
        return;
      }

      let focusableElements: NodeListOf<HTMLElement> = trapElement.querySelectorAll(focusableElementsString);
      focusableElements = Array.prototype.slice.call(focusableElements);

      const firstTabStop = focusableElements[0];
      const lastTabStop = focusableElements[focusableElements.length - 1];

      firstTabStop && firstTabStop.focus();

      // TODO take care of e.keyCode being deprecated according to MDN https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
      const listener = (e: KeyboardEvent) => {
        if (e.keyCode === ESC_KEY) {
          onPressEsc();
          return;
        }

        if (e.keyCode === TAB_KEY) {
          if (e.shiftKey) { // Tab backwards
            // Find the last tab stop if the current focus is on the first tab stop
            if (document.activeElement === firstTabStop) {
              e.preventDefault();
              lastTabStop && lastTabStop.focus();
            }
          } else { // Tab forwards
            // Jump to the first tab stop if the current focus is on the last tab stop
            if (document.activeElement === lastTabStop) {
              e.preventDefault();
              firstTabStop && firstTabStop.focus();
            }
          }
        }
      };

      trapElement.addEventListener('keydown', listener);

      return () => {
        (lastFocusedElement as HTMLElement).focus();
        trapElement.removeEventListener('keydown', listener);
      };
    },
    [getTrapElement, onPressEsc],
  );
}
