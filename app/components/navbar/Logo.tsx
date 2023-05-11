'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface LogoProps {}

const Logo = ({}: LogoProps) => {
	const router = useRouter();

	return (
		<Image
			alt="Logo"
			className="hidden cursor-pointer md:block"
			height={100}
			src="/images/logo.png"
			width={100}
		/>
	);
};

export default Logo;
