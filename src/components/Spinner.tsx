import { ReactElement, SVGProps } from "react";

export default function Spinner(props: SVGProps<SVGSVGElement>): ReactElement {
	return (
		<>
			<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
				<circle cx={50} cy={50} r={45} />
			</svg>
			<style jsx>{`
				svg {
					animation: 2s linear infinite svg-animation;
					max-width: 100px;
				}
				@keyframes svg-animation {
					0% {
						transform: rotateZ(0deg);
					}
					100% {
						transform: rotateZ(360deg);
					}
				}
				circle {
					animation: 1.4s ease-in-out infinite both circle-animation;
					display: block;
					fill: transparent;
					stroke: currentColor;
					stroke-linecap: round;
					stroke-dasharray: 283;
					stroke-dashoffset: 280;
					stroke-width: 10px;
					transform-origin: 50% 50%;
				}
				@keyframes circle-animation {
					0%,
					25% {
						stroke-dashoffset: 280;
						transform: rotate(0);
					}
					50%,
					75% {
						stroke-dashoffset: 75;
						transform: rotate(45deg);
					}
					100% {
						stroke-dashoffset: 280;
						transform: rotate(360deg);
					}
				}
			`}</style>
		</>
	);
}
