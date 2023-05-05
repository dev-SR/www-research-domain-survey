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
	value: string;
	setValue: (value: React.SetStateAction<string>) => void;
	triggerText: string;
	notFoundText: string;
	inputPlaceholder: string;
	width?: number;
};

export function Combobox({
	data,
	value,
	setValue,
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
					variant='outline'
					role='combobox'
					aria-expanded={open}
					className='justify-between w-[250px] md:w-[300px]'
					// style={{
					// 	width: width ? `${width}px` : '448px'
					// }}
				>
					{value ? data.find((item) => item.value === value)?.label : triggerText}
					<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className={cn('p-0', 'w-[250px] md:w-[300px]')}
				// width style
				// style={{
				// 	width: width ? `${width}px` : '448px'
				// }}
			>
				<Command>
					<CommandInput placeholder={inputPlaceholder} />
					<CommandEmpty>{notFoundText}</CommandEmpty>
					<CommandGroup>
						{data.map((item) => (
							<CommandItem
								key={item.value}
								onSelect={(currentValue) => {
									setValue(currentValue === value ? '' : currentValue);
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
