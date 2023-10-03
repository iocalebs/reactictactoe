import { ReactNode } from "react";

export interface ButtonProps {
	children?: ReactNode;
	icon: ReactNode;
	onClick?: () => void;
}

export function Button({ children, icon, onClick }: ButtonProps) {
	return (
		<button
			className="flex items-center gap-1 rounded bg-blue-600 py-2 pl-2 pr-3 text-neutral-100 drop-shadow-md transition-colors hover:animate-none hover:bg-blue-700"
			onClick={onClick}
		>
			<div className="flex-grow-0 justify-self-start">{icon}</div>
			{children}
		</button>
	);
}
