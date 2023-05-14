'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface LogoProps {}

const Logo = ({}: LogoProps) => {
	const router = useRouter();

	return (
		<Image
			priority
			alt="Logo"
			className="hidden cursor-pointer md:block"
			height={100}
			src="/images/logo.png"
			width={100}
			onClick={() => router.push('/')}
		/>
	);
};

export default Logo;
