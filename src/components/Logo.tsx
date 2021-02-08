import React, { ReactElement, SVGProps } from "react";

export default function Logo(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg
      viewBox="0 0 1024 778"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M187.52 0C163.224 0 142.293 17.1519 137.475 41.0091L1.03146 716.706C-5.36638 748.389 18.8097 778 51.0759 778H444.324C455.01 778 460.366 765.085 452.818 757.522L284.973 589.37C275.003 579.382 275.003 563.189 284.973 553.201L431.069 406.837C441.038 396.849 457.203 396.849 467.172 406.837L825.936 766.258C833.44 773.776 843.625 778 854.246 778H972.924C1005.19 778 1029.37 748.389 1022.97 716.706L886.525 41.0091C881.707 17.1519 860.777 0 836.481 0H187.52Z"
        fill="currentColor"
      />
    </svg>
  );
}
