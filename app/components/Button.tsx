'use client';

import { IconType } from 'react-icons';

interface ButtonProps {
	className?: string;
	label: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	outline?: boolean;
	small?: boolean;
	icon?: IconType;
}

const Button = ({
	className = '',
	label,
	onClick,
	disabled,
	outline,
	small,
	icon: Icon,
}: ButtonProps) => {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className={`
            relative
            disabled:opacity-70
            disabled:cursor-not-allowed
            rounded-lg
            hover:opacity-80
            transition
            w-full
			${className}
            ${
				outline
					? 'bg-white text-black border-black'
					: 'bg-rose-500 text-white border-rose-500'
			}
            ${
				small
					? 'text-sm py-1 font-light border-[1px]'
					: 'text-md py-3 font-semibold border-2'
			}
          `}
		>
			{Icon && <Icon size={24} className="absolute left-4 top-3" />}
			{label}
		</button>
	);
};

export default Button;
