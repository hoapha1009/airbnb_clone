'use client';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import Button from '../Button';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Modal from './Modal';
import useLoginModal from '@/app/hooks/useLoginModal';

interface RegisterModalProps {}

const RegisterModal = ({}: RegisterModalProps) => {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	const onToggle = useCallback(() => {
		registerModal.onClose();
		loginModal.onOpen();
	}, [loginModal, registerModal]);

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		setIsLoading(true);

		axios
			.post('/api/register', data)
			.then(() => {
				registerModal.onClose();
				loginModal.onOpen();
			})
			.catch((err) => {
				console.log(err);
				toast.error('Something went wrong.');
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading title="Welcome to Airbnb" subtitle="Create an acount!" />
			<Input
				id="email"
				label="Email"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="name"
				label="Name"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="password"
				label="Password"
				type="password"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	);

	const footerContent = (
		<div className="flex flex-col gap-4 mt-3">
			<hr />
			<Button
				outline
				label="Continue with Google"
				icon={FcGoogle}
				onClick={() => signIn('google')}
				className="hover:bg-neutral-100"
			/>
			<Button
				outline
				label="Continue with Github"
				icon={AiFillGithub}
				onClick={() => signIn('github')}
				className="hover:bg-neutral-100"
			/>
			<div className="mt-4 font-light text-center text-neutral-500">
				<div className="flex flex-row items-center justify-center gap-2">
					<div className="">Already have an account?</div>
					<div
						onClick={onToggle}
						className="cursor-pointer text-neutral-800 hover:underline"
					>
						Log in
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			title="Register"
			actionLabel="Continue"
			onClose={registerModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default RegisterModal;
