import React, { ReactElement } from "react";
import ReactLinkify from "react-linkify";

interface Props {
  children: string;
}

export default function Linkify({ children }: Props): ReactElement {
  return (
    <ReactLinkify
      componentDecorator={(href, text, key) => (
        <a
          href={href}
          key={key}
          className="text-indigo-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          {text.toLowerCase()}
        </a>
      )}
    >
      {children}
    </ReactLinkify>
  );
}
