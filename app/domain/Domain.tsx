'use client';
import Graphin, { Utils, GraphinData, Behaviors, IG6GraphEvent } from '@antv/graphin';
import { MiniMap } from '@antv/graphin-components';
const layout = {
	type: 'gForce' //https://graphin.antv.antgroup.com/en-US/graphin/layout/network
};
import { INode, NodeConfig } from '@antv/g6';
import React from 'react';
import { GraphData } from '~/types/Graph';

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
	return (
		<div className='w-full h-full'>
			{data &&
				data.map((value, key) => (
					<div key={key} className='p-3 border shadow my-2 rounded'>
						<div>Domain No: {value.domain}</div>
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
					</div>
				))}
		</div>
	);
}
