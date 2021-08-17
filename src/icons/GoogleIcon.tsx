import * as React from "react";

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.354 7.531h-.604V7.5H9v3h4.239A4.498 4.498 0 014.5 9 4.5 4.5 0 019 4.5c1.147 0 2.19.433 2.985 1.14l2.122-2.122A7.466 7.466 0 009 1.5a7.5 7.5 0 107.354 6.031z"
        fill="#FFC107"
      />
      <path
        d="M2.365 5.51l2.464 1.806A4.498 4.498 0 019 4.5c1.147 0 2.19.433 2.985 1.14l2.122-2.122A7.465 7.465 0 009 1.5a7.496 7.496 0 00-6.635 4.01z"
        fill="#FF3D00"
      />
      <path
        d="M9 16.5a7.465 7.465 0 005.028-1.947l-2.32-1.964A4.466 4.466 0 019 13.5a4.498 4.498 0 01-4.231-2.98l-2.446 1.885A7.494 7.494 0 009 16.5z"
        fill="#4CAF50"
      />
      <path
        d="M16.354 7.531h-.604V7.5H9v3h4.239a4.515 4.515 0 01-1.533 2.09l.001-.002 2.321 1.965C13.864 14.702 16.5 12.75 16.5 9c0-.503-.052-.994-.146-1.469z"
        fill="#1976D2"
      />
    </svg>
  );
}

export default GoogleIcon;
