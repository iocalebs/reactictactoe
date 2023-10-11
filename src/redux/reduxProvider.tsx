"use client";

import { Provider } from "react-redux";
import { store } from ".";

export function ReduxProvider(props: React.PropsWithChildren) {
	return <Provider store={store()}>{props.children}</Provider>;
}
