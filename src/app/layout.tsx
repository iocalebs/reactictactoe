import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { NavBar } from "@/components/NavBar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Tic Tac Toe",
	description: "A project by @castdin",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={
					inter.className +
					" flex flex-col bg-neutral-200 text-neutral-900 transition-colors dark:bg-neutral-900 dark:text-neutral-200"
				}
			>
				<NavBar />
				<main className="mx-8">{children}</main>
			</body>
		</html>
	);
}
