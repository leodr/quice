import { useFocusWithin } from "@react-aria/interactions";
import { useEffect, useState } from "react";
import tinykeys from "tinykeys";

export function useDropdown() {
  const [showDropdown, setShowDropdown] = useState(false);

  const { focusWithinProps } = useFocusWithin({
    onBlurWithin() {
      setShowDropdown(false);
    },
  });

  useEffect(
    () =>
      tinykeys(window, {
        Escape() {
          setShowDropdown(false);
        },
      }),
    []
  );

  return [showDropdown, setShowDropdown, focusWithinProps] as const;
}
