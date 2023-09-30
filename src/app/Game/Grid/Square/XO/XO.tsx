import { memo } from "react";
import "./XO.css";

export interface XOProps {
	hover?: boolean;
	shape: "x" | "o";
}

const X = memo(function O({ hover }: XOProps) {
	return (
		<svg
			viewBox="0 0 50 50"
			height="80%"
			width="80%"
			strokeWidth={3}
			className={
				"stroke-black dark:stroke-white" +
				(hover ? " xo--hover" : " x--animated")
			}
		>
			<g>
				<line id="x-line-1" x1="8.5" y1="41.5" x2="41.5" y2="8.5" />
				<line id="x-line-2" x1="41.5" y1="41.5" x2="8.5" y2="8.5" />
			</g>
		</svg>
	);
});

const O = memo(function O({ hover }: XOProps) {
	return (
		<svg
			viewBox="0 0 100 100"
			height="80%"
			width="80%"
			aria-hidden={hover}
			className={
				"stroke-black dark:stroke-white" +
				(hover ? " xo--hover" : " o--animated")
			}
		>
			<circle
				cx="50"
				cy="50"
				r="38"
				fill="none"
				strokeWidth={6}
				transform="rotate(-90, 50, 50)"
			/>
		</svg>
	);
});

export function XO(props: XOProps) {
	switch (props.shape) {
		case "x":
			return <X {...props} />;
		case "o":
			return <O {...props} />;
	}
}
