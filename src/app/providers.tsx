"use client";

import { ReduxProvider } from "@/redux";

export function Providers(props: React.PropsWithChildren) {
	return <ReduxProvider>{props.children}</ReduxProvider>;
}
