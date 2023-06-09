'use client';

import { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Button from '../Button';

interface ModalProps {
	isOpen?: boolean;
	onClose: () => void;
	onSubmit: () => void;
	title?: string;
	body?: React.ReactElement;
	footer?: React.ReactElement;
	actionLabel: string;
	disabled?: boolean;
	secondaryAction?: () => void;
	secondaryActionLabel?: string;
}

const Modal = ({
	isOpen,
	onClose,
	onSubmit,
	title,
	body,
	footer,
	actionLabel,
	disabled,
	secondaryAction,
	secondaryActionLabel,
}: ModalProps) => {
	const [showModal, setShowModal] = useState(isOpen);

	useEffect(() => {
		setShowModal(isOpen);
	}, [isOpen]);

	const handleClose = useCallback(() => {
		if (disabled) return;

		setShowModal(false);
		setTimeout(() => {
			onClose();
		}, 300);
	}, [disabled, onClose]);

	const handleSubmit = useCallback(() => {
		if (disabled) return;

		onSubmit();
	}, [disabled, onSubmit]);

	const handleSecondaryAction = useCallback(() => {
		if (disabled || !secondaryAction) return;

		secondaryAction();
	}, [disabled, secondaryAction]);

	if (!isOpen) return null;

	return (
		<>
			<div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-neutral-800/70">
				<div className="relative w-full h-full mx-auto my-6 md:w-4/6 lg:w-3/6 xl:w-2/5 lg:h-auto md:h-auto">
					{/* CONTENT */}
					<div
						className={`translate duration-300 h-full ${
							showModal
								? 'translate-y-0 opacity-100'
								: 'translate-y-full opacity-0'
						}`}
					>
						<div className="relative flex flex-col w-full h-full transition bg-white border-0 rounded-lg outline-none md:h-auto focus:outline-none">
							{/*header*/}
							<div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
								<button
									onClick={handleClose}
									className="absolute p-1.5 transition border-0 rounded-full hover:opacity-70 left-9 hover:bg-neutral-200"
								>
									<IoMdClose size={18} />
								</button>
								<div className="text-lg font-semibold">
									{title}
								</div>
							</div>

							{/*body*/}
							<div className="relative flex-auto p-6">{body}</div>

							{/*footer*/}
							<div className="flex flex-col gap-2 p-6">
								<div className="flex flex-row items-center w-full gap-4">
									{secondaryAction &&
										secondaryActionLabel && (
											<Button
												disabled={disabled}
												label={secondaryActionLabel}
												outline
												onClick={handleSecondaryAction}
											/>
										)}
									<Button
										disabled={disabled}
										label={actionLabel}
										onClick={handleSubmit}
									/>
								</div>
								{footer}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
