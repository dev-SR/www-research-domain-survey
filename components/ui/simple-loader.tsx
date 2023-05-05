'use client';
import { Loader2 } from 'lucide-react';
import { Button } from './button';

const Loader1 = () => {
	return (
		<div className='m-auto flex justify-center items-center h-full w-full'>
			<Loader2 className='mr-2 h-7 w-7 animate-spin' />
			<div className='text-gray-600 dark:text-gray-400 text-lg'>Loading...</div>
		</div>
	);
};

type LoaderButtonProps = {
	children: React.ReactNode;
	isLoading?: boolean;
	loadingText?: string;
	[key: string]: any; // allow additional props
};

const LoaderButton = ({
	children,
	isLoading = false,
	loadingText = 'Please wait',
	...rest
}: LoaderButtonProps) => {
	return (
		<Button disabled={isLoading} {...rest}>
			{isLoading ? (
				<>
					<Loader2 className='mr-2 h-4 w-4 animate-spin' />
					{loadingText}
				</>
			) : (
				<>{children}</>
			)}
		</Button>
	);
};

export { Loader1, LoaderButton };
