'use client';
import React from 'react';
import { Combobox, ComboboxDataType } from '../ui/combobox';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import queryString from 'query-string';
import { alerter } from '../../lib/utils';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '../ui/select';

const Topbar = ({ data = [] }: { data: ComboboxDataType[] }) => {
	const [author, setAuthor] = React.useState('');
	const [version, setVersion] = React.useState('');
	const router = useRouter();
	const handleClick = () => {
		const authorFound = data.find((item) => item.value == author);
		if (authorFound && authorFound?.value == '') return;

		const authorName = authorFound?.label;

		router.push(`?author=${authorName}&version=${version}`);
	};

	function handleVersionValueChange(value: string) {
		setVersion(value);
	}

	return (
		<div className='flex w-full h-16 items-center px-10 space-x-4'>
			<Combobox
				data={data}
				inputPlaceholder='Search author name'
				notFoundText='No author found'
				setValue={setAuthor}
				value={author}
				triggerText='Select an author'
				width={300}
			/>
			<Select onValueChange={handleVersionValueChange}>
				<SelectTrigger className='w-[180px]'>
					<SelectValue placeholder='Data versions' />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Different versions</SelectLabel>
						<SelectItem value='Native th0.3'>Native th0.3</SelectItem>
						<SelectItem value='Fine Tune th0.5'>Fine Tune th0.5</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>

			<Button onClick={handleClick}>Show Graph</Button>
		</div>
	);
};

export default Topbar;
