'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

interface InputProps {
	id: string;
	label: string;
	type?: string;
	disabled?: boolean;
	formatPrice?: boolean;
	required?: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
}

const Input = ({
	id,
	label,
	type,
	disabled,
	formatPrice,
	required,
	register,
	errors,
}: InputProps) => {
	console.log('🚀 ~ file: Input.tsx:27 ~ errors:', errors);
	return (
		<div className="w-full">
			<div className="relative">
				{formatPrice && (
					<BiDollar
						size={24}
						className="absolute text-neutral-700 top-5 left-2"
					/>
				)}
				<input
					id={id}
					disabled={disabled}
					{...register(id, {
						required: 'Required',
						...(formatPrice
							? {
									min: {
										value: 1,
										message: 'Minimum value is 1',
									},
							  }
							: {}),
					})}
					placeholder=" "
					type={type}
					className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:pointer-events-none
                ${formatPrice ? 'pl-9' : 'pl-4'}
                ${
					errors[id]
						? 'border-rose-500 focus:border-rose-500'
						: 'border-neutral-300 focus:border-black'
				}
                `}
				/>

				<label
					className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] ${
						formatPrice ? 'left-9' : 'left-4'
					} peer-placeholder-shown:scale-75 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
						errors[id] ? 'text-rose-500' : 'text-zinc-400'
					}`}
				>
					{label}
				</label>
			</div>
			{errors[id] && (
				<div className="text-xs text-right text-red-500">
					{errors[id]?.message?.toString()}
				</div>
			)}
		</div>
	);
};

export default Input;
