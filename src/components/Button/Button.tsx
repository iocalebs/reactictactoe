import { ReactNode } from "react";

export interface ButtonProps {
	children?: ReactNode;
	icon: ReactNode;
	onClick?: () => void;
}

export function Button({ children, icon, onClick }: ButtonProps) {
	return (
		<button
			className="flex items-center gap-1 rounded bg-blue-600 p-4 pl-3 text-2xl text-neutral-100 drop-shadow-md transition-colors hover:animate-none hover:bg-blue-700 sm:p-2 sm:pr-3 sm:text-base"
			onClick={onClick}
		>
			<div className="grow-0 justify-self-start">{icon}</div>
			{children}
		</button>
	);
}
