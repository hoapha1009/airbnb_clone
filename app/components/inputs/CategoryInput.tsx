'use client';

import { IconType } from 'react-icons';

interface CategoryInputProps {
	icon: IconType;
	label: string;
	selected?: boolean;
	onClick: (val: string) => void;
}

const CategoryInput = ({
	icon: Icon,
	label,
	selected,
	onClick,
}: CategoryInputProps) => {
	return (
		<div
			onClick={() => onClick(label)}
			className={`flex flex-col gap-3 p-4 transition border-2 cursor-pointer rounded-xl hover:border-black ${
				selected ? 'border-black' : 'border-neutral-200'
			}`}
		>
			<Icon size={30} />
			<div className="font-semibold">{label}</div>
		</div>
	);
};

export default CategoryInput;
