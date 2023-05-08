'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem
} from '~/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';

export type ComboboxDataType = {
	value: string;
	label: string;
};

type ComboboxProps = {
	data: ComboboxDataType[];
	onValueChange: (value: string) => void;
	triggerText: string;
	notFoundText: string;
	inputPlaceholder: string;
	width?: number;
	value: string;
};

export function ComboboxArr({
	data,
	value,
	onValueChange,
	triggerText,
	notFoundText,
	inputPlaceholder,
	width
}: ComboboxProps) {
	const [open, setOpen] = React.useState(false);
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant={'default'}
					role='combobox'
					aria-expanded={open}
					className='justify-between w-full md:w-[300px]'
					style={{
						width: width ? `${width}px` : '448px'
					}}>
					{value ? value : triggerText}
					<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className={cn('p-0', 'w-[430px] md:w-[300px]')}
				style={{
					width: width ? `${width}px` : '448px'
				}}>
				<Command>
					<CommandInput placeholder={inputPlaceholder} />
					<CommandEmpty>{notFoundText}</CommandEmpty>
					<CommandGroup>
						{data.map((item) => (
							<CommandItem
								key={item.value}
								onSelect={(currentValue) => {
									onValueChange(currentValue === value ? '' : currentValue);
									setOpen(false);
								}}>
								<Check
									className={cn('mr-2 h-4 w-4', value === item.value ? 'opacity-100' : 'opacity-0')}
								/>
								{item.label}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
export const category_map = [
	'Same as identified',
	'Artificial Intelligence',
	'Hardware Architecture',
	'Computational Complexity',
	'Computational Engineering, Finance, and Science',
	'Computational Geometry',
	'Computation and Language',
	'Cryptography and Security',
	'Computer Vision and Pattern Recognition',
	'Computers and Society',
	'Databases',
	'Distributed, Parallel, and Cluster Computing',
	'Digital Libraries',
	'Discrete Mathematics',
	'Data Structures and Algorithms',
	'Emerging Technologies',
	'Formal Languages and Automata Theory',
	'General Literature',
	'Graphics',
	'Computer Science and Game Theory',
	'Human-Computer Interaction',
	'Information Retrieval',
	'Information Theory',
	'Machine Learning',
	'Logic in Computer Science',
	'Multiagent Systems',
	'Multimedia',
	'Mathematical Software',
	'Numerical Analysis',
	'Neural and Evolutionary Computing',
	'Networking and Internet Architecture',
	'Other Computer Science',
	'Operating Systems',
	'Performance',
	'Programming Languages',
	'Robotics',
	'Symbolic Computation',
	'Sound',
	'Software Engineering',
	'Social and Information Networks',
	'Systems and Control'
];

export const categoryData: ComboboxDataType[] = category_map.map((category) => ({
	value: category.toLocaleLowerCase(),
	label: category
}));
