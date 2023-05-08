'use client';
import React from 'react';
import { Combobox, ComboboxDataType } from '../ui/combobox';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '../ui/select';
import { GithubIcon, HomeIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

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
		<div className='flex w-full flex-col sm:flex-row px-10 justify-center pt-4 space-y-4 sm:space-y-0 sm:space-x-4'>
			<div className='flex-1  flex items-center  space-x-4 w-full'>
				<div className='cursor-pointer' onClick={() => router.push('/')}>
					<HomeIcon className='w-6 h6 hover:text-primary' />
				</div>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger className='[data-state="instant-open"]'>
							<a
								target='_blank'
								href='https://github.com/dev-SR/www-research-domain-survey'
								rel='noopener noreferrer'>
								<GithubIcon className='w-6 h6 hover:text-primary' />
							</a>
						</TooltipTrigger>
						<TooltipContent className='[data-state="instant-open"]'>
							<p>Edit on github</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
			<div className='flex flex-col sm:flex-row  items-center space-y-4 sm:space-y-0 sm:space-x-4'>
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
					<SelectTrigger className='w-full md:w-[300px]'>
						<SelectValue placeholder='Data versions' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel> Unlabelled datasets</SelectLabel>
							<SelectItem value='Native th0.3'> Native th0.3</SelectItem>
							<SelectItem value='Fine Tune th0.5'> Fine Tune th0.5</SelectItem>
						</SelectGroup>
						<SelectGroup>
							<SelectLabel>Labelled datasets</SelectLabel>
							<SelectItem value='Taxonomy-kps[1k]-Out[No]'>Taxonomy-kps[1k]-Out[No]</SelectItem>
							<SelectItem value='Taxonomy-kps[1k]-Out[th0.5]'>
								Taxonomy-kps[1k]-Out[th0.5]
							</SelectItem>
							<SelectItem value='Taxonomy-kps[1k]-Out[th0.7]'>
								Taxonomy-kps[1k]-Out[th0.7]
							</SelectItem>
							<SelectItem value='Taxonomy-kps[1k]-Out[th0.85]'>
								Taxonomy-kps[1k]-Out[th0.85]
							</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>

				<Button onClick={handleClick} className='w-full sm:w-[150px]'>
					Show Graph
				</Button>
			</div>
		</div>
	);
};

export default Topbar;
