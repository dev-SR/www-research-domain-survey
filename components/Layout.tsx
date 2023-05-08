'use client';

import { useSearchParams } from 'next/navigation';
import Topbar from './topnav/Topbar';

export default function Layout({
	children,
	paths
}: {
	paths: string[];
	children: React.ReactNode;
}) {
	const search = useSearchParams();

	return (
		<body
			className={`flex flex-col min-h-screen ${
				search.toString() === '' && 'bg-gradient-to-t from-indigo-200'
			}`}>
			<Topbar data={paths.map((path) => ({ value: path.toLocaleLowerCase(), label: path }))} />
			{children}
		</body>
	);
}
