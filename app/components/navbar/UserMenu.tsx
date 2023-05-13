'use client';

import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import { SafeUser } from '@/app/types';
import { signOut } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from './Avatar';
import MenuItem from './MenuItem';

interface UserMenuProps {
	currentUser?: SafeUser | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = useCallback(() => {
		setIsOpen((val) => !val);
	}, []);

	return (
		<div className="relative">
			<div className="flex flex-row items-center gap-3">
				<div className="hidden px-4 py-3 text-sm font-semibold transition rounded-full md:block hover:bg-neutral-100 cupture-pointer">
					Airbnb your home
				</div>
				<div
					onClick={toggleOpen}
					className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-sm transition"
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
								<MenuItem onClick={() => {}} label="My trips" />
								<MenuItem
									onClick={() => {}}
									label="My favorites"
								/>
								<MenuItem
									onClick={() => {}}
									label="My reservations"
								/>
								<MenuItem
									onClick={() => {}}
									label="My properties"
								/>
								<MenuItem
									onClick={() => {}}
									label="Airbnb my home"
								/>
								<MenuItem
									onClick={() => signOut()}
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
