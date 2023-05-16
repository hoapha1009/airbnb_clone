'use client';

import { useEffect } from 'react';
import EmptyState from '@/app/components/EmptyState';
import { useRouter } from 'next/navigation';

interface ErrorStateProps {
	error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
	const router = useRouter();

	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<EmptyState
			showReset
			title="Uh Oh"
			subtitle="Something went wrong!"
			actionLabel="Back to home"
			actionButton={() => router.push('/')}
		/>
	);
};

export default ErrorState;
