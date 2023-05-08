'use client';
import Graphin, { Utils, GraphinData, Behaviors, IG6GraphEvent } from '@antv/graphin';
import { MiniMap } from '@antv/graphin-components';
const layout = {
	type: 'gForce' //https://graphin.antv.antgroup.com/en-US/graphin/layout/network
};
import { INode, NodeConfig } from '@antv/g6';
import React, { useState } from 'react';
import { GraphData } from '~/types/Graph';
import NotifyDialog from '~/components/notify_dialog';
import { Combobox } from '~/components/ui/combobox';
import { FcGoogle } from 'react-icons/fc';
import { ComboboxArr, categoryData } from '~/components/ui/ComboboxArr';
import { Button } from '~/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '~/components/ui/dialog';

const { DragCanvas, ZoomCanvas, DragNode, ActivateRelations, ClickSelect } = Behaviors;
// Graphin.registerBehavior('sampleBehavior', {
// 	getEvents() {
// 		return {
// 			'node:click': 'onClick'
// 		};
// 	},
// 	onClick(evt: IG6GraphEvent) {
// 		const node = evt.item as INode;
// 		const model = node.getModel() as NodeConfig;
// 		// TODO
// 		// console.log(model);
// 		// alert(JSON.stringify(model, null, 2));
// 	}
// });

// mock data
// const data: GraphinData = Utils.mock(10).circle().graphin();

export default function Domain({ data }: { data: GraphData[] | null | undefined }) {
	const [selectedValues, setSelectedValues] = useState<{ [key: number]: string }>({}); //Or init

	const handleValueChange = (index: number, value: string) => {
		setSelectedValues((prevValues) => ({
			...prevValues,
			[index]: value
		}));
	};

	return (
		<div className='w-full h-full'>
			<NotifyDialog />
			{data &&
				data.map((value, key) => (
					<div key={key} className='p-3 border shadow my-2 rounded'>
						{value.domain.split(' ').length > 1 ? (
							<div className='my-2'>
								<div className='font-semibold'>{value.domain}</div>
								<div className='text-sm'>
									More information about{' '}
									<span className='font-semibold'>category descriptions</span> can be found at{' '}
									<a
										href='https://arxiv.org/category_taxonomy'
										target='_blank'
										rel='noopener noreferrer'
										className='text-blue-500 underline hover:text-blue-700'>
										https://arxiv.org/category_taxonomy
									</a>{' '}
									under the <span className='font-semibold'>Computer Science</span> section
								</div>
							</div>
						) : (
							<div>Domain No: {key}</div>
						)}
						<Graphin
							data={value}
							layout={layout}
							// modes={{ default: ['sampleBehavior', 'drag-canvas', 'drag-node'] }}
							// theme={{ mode: 'dark' }}
						>
							<ZoomCanvas enableOptimize />
							<ActivateRelations trigger='click' />
							<ClickSelect />
							<DragNode />
							<DragCanvas />
						</Graphin>
						<div className='my-2 flex justify-end items-center space-x-4'>
							<div className='text-indigo-600 font-bold text-lg'>Your preferred category:</div>
							<ComboboxArr
								data={categoryData}
								value={
									categoryData.find((item) => item.value == selectedValues[key])?.label ||
									'Same as identified'
								}
								onValueChange={(value) => handleValueChange(key, value)}
								triggerText='Your preferred category'
								notFoundText='No options found'
								inputPlaceholder='Search arxiv defined categories'
								width={400}
							/>
						</div>
					</div>
				))}
			<div className=' flex w-full justify-center mt-8'>
				<Dialog>
					<DialogTrigger>
						<Button variant={'destructive'}>Submit Review</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Login to submit</DialogTitle>
							<DialogDescription>{JSON.stringify(selectedValues, null, 4)}</DialogDescription>
							<Button variant={'secondary'} onClick={() => alert('to be implemented')}>
								<FcGoogle className='mr-2 h-4 w-4' /> Login with Google
							</Button>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}
