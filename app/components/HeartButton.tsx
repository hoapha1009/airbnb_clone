'use client';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { SafeUser } from '../types';
import useFavorite from '../hooks/useFavorite';

interface HeartButtonProps {
	listingId: string;
	currentUser?: SafeUser | null;
}

const HeartButton = ({ listingId, currentUser }: HeartButtonProps) => {
	const { hasFavorited, toggleFavorite } = useFavorite({
		listingId,
		currentUser,
	});

	return (
		<div
			onClick={toggleFavorite}
			className="relative transition cursor-pointer hover:opacity-80"
		>
			<AiOutlineHeart
				size={24}
				className="fill-white absolute -top-[2px] -right-[2px]"
			/>
			<AiFillHeart
				size={20}
				className={
					hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'
				}
			/>
		</div>
	);
};

export default HeartButton;
