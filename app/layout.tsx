import LoginModal from '@/app/components/modals/LoginModal';
import RegisterModal from '@/app/components/modals/RegisterModal';
import { Nunito } from 'next/font/google';
import ToasterProvider from '@/app/providers/ToasterProvider';
import ClientOnly from './components/ClientOnly';
import './globals.css';
import Navbar from './components/navbar/Navbar';
import getCurrentUser from './actions/getCurrentUser';
import RentModal from './components/modals/RentModal';

export const metadata = {
	title: 'Airbnb Clone',
	description: 'Airbnb clone',
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
					<RegisterModal />
					<LoginModal />
					<RentModal />
					<Navbar currentUser={currentUser} />
				</ClientOnly>
				{children}
			</body>
		</html>
	);
}
