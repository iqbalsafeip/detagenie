'use client';
import Image from 'next/image';
import { MdMenu } from 'react-icons/md';
import { SiGithub } from 'react-icons/si';
import { useEffect, useState } from 'react';
import ThemeToggle from './themeToggle';
import LangSwitch from './langSwitch';

import { usePathname } from 'next/navigation';
import { defaultLocale } from '@/lib/i18n';
import { NavLinksList } from '@/lib/navLinksList';
import { GrDocument } from 'react-icons/gr';
import { BsSignIntersection } from 'react-icons/bs';

export default function Navbar() {
	const pathname = usePathname();
	const [langName, setLangName] = useState(defaultLocale);
	const [linkList, setLinkList] = useState([]);

	useEffect(() => {
		const fetchLinksList = async () => {
			if (pathname === '/') {
				setLangName(defaultLocale);
			} else {
				setLangName(pathname.split('/')[1]);
			}
			setLinkList(NavLinksList[`LINK_${langName.toUpperCase()}`] || []);
		};
		fetchLinksList();
	}, [pathname, langName]);

	return (
		<header className='w-full relative z-50 bg-base-100 p-5 pb-0 container mx-auto md:mb-5 flex justify-between items-center'>
			<a
				aria-label='landing page template'
				className='flex items-center 	'
				title='landing page template'
				href={`/${langName}`}
			>
				<Image
					width={400}
					height={230}
					src={'/logo.png'}
					className='transition-all hover:scale-110 '
					alt='logo'
				></Image>
			</a>


			<div className='md:w-1/5 flex items-center justify-end gap-3'>
				<div className='flex flex-col md:flex-row gap-2'>
					<a
						title='whitepaper code'
						className='btn btn-sm md:btn-md btn-base border-none hover:ring-1 ring-base-content text-base-100 hover:text-base-content bg-base-content hover:bg-base-100 rounded-full'
						href='https://dashboard.datagenie.fun'
					>
						<BsSignIntersection size={15} />
						Login
					</a>

				</div>
				<ThemeToggle />

			</div>
		</header>
	);
}
