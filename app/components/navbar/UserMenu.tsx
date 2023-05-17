'use client';

import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import { SafeUser } from '@/app/types';
import { signOut } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useRentModal from '@/app/hooks/useRentModal';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
	currentUser?: SafeUser | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
	const router = useRouter();
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const rentModal = useRentModal();
	const [isOpen, setIsOpen] = useState(false);

	const links = {
		authenticated: [
			{ href: '/trips', label: 'My trips' },
			{ href: '/favorites', label: 'My favorites' },
			{ href: '/reservations', label: 'My reservations' },
			{ href: '/properties', label: 'My properties' },
			{ action: () => rentModal.onOpen(), label: 'Airbnb my home' },
			{
				action: () => {
					signOut();
					router.push('/');
				},
				label: 'Logout',
			},
		],
		unAuthenticated: [
			{ action: () => loginModal.onOpen(), label: 'Login' },
			{ action: () => registerModal.onOpen(), label: 'Sign up' },
		],
	};

	const toggleOpen = useCallback(() => {
		setIsOpen((val) => !val);
	}, []);

	const onRent = useCallback(() => {
		if (!currentUser) {
			loginModal.onOpen();
			return;
		}

		// Open Rent Modal
		rentModal.onOpen();
	}, [currentUser, loginModal, rentModal]);

	return (
		<div className="relative">
			<div className="flex flex-row items-center gap-3">
				<div
					onClick={onRent}
					className="hidden px-4 py-3 text-sm font-semibold transition rounded-full cursor-pointer md:block hover:bg-neutral-100"
				>
					Airbnb your home
				</div>
				<div
					onClick={toggleOpen}
					className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
				>
					<AiOutlineMenu />
					<div className="hidden md:block">
						<Avatar src={currentUser?.image} />
					</div>
				</div>
			</div>

			{isOpen && (
				<div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
					<div className="flex flex-col cursor-pointer">
						{currentUser ? (
							<>
								<MenuItem
									onClick={() => router.push('/trips')}
									label="My trips"
								/>
								<MenuItem
									onClick={() => router.push('/favorites')}
									label="My favorites"
								/>
								<MenuItem
									onClick={() => router.push('/reservations')}
									label="My reservations"
								/>
								<MenuItem
									onClick={() => router.push('/properties')}
									label="My properties"
								/>
								<MenuItem
									onClick={rentModal.onOpen}
									label="Airbnb my home"
								/>
								<MenuItem
									onClick={() => {
										signOut();
										router.push('/');
									}}
									label="Log out"
								/>
							</>
						) : (
							<>
								<MenuItem
									onClick={loginModal.onOpen}
									label="Login"
								/>
								<MenuItem
									onClick={registerModal.onOpen}
									label="Sign up"
								/>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
