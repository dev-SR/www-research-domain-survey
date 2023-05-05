import Topbar from '~/components/topnav/Topbar';
import './globals.css';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], weight: 'variable' });

import fsPromises from 'fs/promises';
import path from 'path';
export const metadata = {
	title: 'Domain Identification',
	description:
		'The purpose of this website is to evaluate the effectiveness of our proposed model for identifying the research domain of a given researcher. '
};

async function getDomainData() {
	const files = await fsPromises.readdir('data/Native th0.3');
	const jsonFiles = files.filter((file) => path.extname(file) === '.json');

	const paths = jsonFiles.map((file) => path.parse(file).name);

	return paths;
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const paths = await getDomainData();

	return (
		<html lang='en'>
			<body className={`${inter.className} flex flex-col min-h-screen`}>
				<Topbar data={paths.map((path) => ({ value: path.toLocaleLowerCase(), label: path }))} />
				{children}
			</body>
		</html>
	);
}
