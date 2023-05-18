import ToasterProvider from '@/app/providers/ToasterProvider';
import { Nunito } from 'next/font/google';
import getCurrentUser from './actions/getCurrentUser';
import ClientOnly from './components/ClientOnly';
import Navbar from './components/navbar/Navbar';
import './globals.css';
import ModalsProvider from './providers/ModalsProvider';

export const metadata = {
	title: 'Airbnb Clone',
	description:
		'This is a repository for a Full Stack Airbnb Clone with Next.js 13 App Router: React, Tailwind, Prisma, MongoDB, NextAuth.',
};

const font = Nunito({
	subsets: ['latin'],
});

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentUser = await getCurrentUser();

	return (
		<html lang="en">
			<body className={font.className}>
				<ClientOnly>
					<ToasterProvider />
					<ModalsProvider />
					<Navbar currentUser={currentUser} />
				</ClientOnly>
				<div className="pb-20 pt-28">{children}</div>
			</body>
		</html>
	);
}
