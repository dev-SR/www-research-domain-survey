'use client';
import { useState } from 'react';
import { ComboboxArr, ComboboxDataType, categoryData } from './ui/ComboboxArr';

const times = Array.from({ length: 3 });

const init: { [key: number]: string } = times.reduce((obj: { [key: number]: string }, _, index) => {
	obj[index] = '';
	return obj;
}, {});
export default function Mcq() {
	const [selectedValues, setSelectedValues] = useState<{ [key: number]: string }>({}); //Or init

	const handleValueChange = (index: number, value: string) => {
		setSelectedValues((prevValues) => ({
			...prevValues,
			[index]: value
		}));
	};

	console.log(selectedValues);

	return (
		<div>
			{times.map((item, index) => (
				<ComboboxArr
					key={index}
					data={categoryData}
					value={selectedValues[index] || ''}
					onValueChange={(value) => handleValueChange(index, value)}
					triggerText='Select an option'
					notFoundText='No options found'
					inputPlaceholder='Search options'
					width={300}
				/>
			))}
		</div>
	);
}
