import type {Metadata} from "next";
import {Kanit} from "next/font/google";
import {PropsWithChildren} from "react";
import "./globals.css";


const kanit = Kanit({
	weight: ["400", "600"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Ticket Sorter Game - Become an Elite Project Manager!",
	description: "Sort Tickets & Beat the Clock! Quickly analyze and classify incoming tickets to earn points. Survive the rush and beat records in this addictive game!",
	openGraph: {
    title: 'Ticket Sorter Game - Become an Elite Project Manager!',
    description: 'Test your skills by sorting tickets in this fast-paced game! Classify bugs, features, support, and technical issues to earn points and beat the clock.',
    url: 'https://ecv-manager-hero.vercel.app/', 
    type: 'website',
    images: [
      {
        url: '/images/1.png', 
        width: 1200,
        height: 630,
        alt: 'Ticket Sorter Game - Screenshot of the game',
      },
    ],
    locale: 'en_US',
  },
};

export default function RootLayout({children}: Readonly<PropsWithChildren>) {
	return (
		<html lang="en">
			<body className={`${kanit.className} antialiased`}>{children}</body>
		</html>
	);
}
