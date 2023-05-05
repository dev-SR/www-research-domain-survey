/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import fsPromises from 'fs/promises';
import path from 'path';
import { SearchParamProps } from '~/types/common';
import { Params } from '~/types/common';
import { GraphData, JsonData } from '~/types/Graph';
import { GraphinData } from '@antv/graphin';
import Domain from './domain/Domain';

async function getDomainData(params: Record<string, any>) {
	const authorName = params.author;
	const version = params.version;
	if (!authorName || !version) return [];
	// Get the path of the json file
	let filePath = '';
	try {
		filePath = path.join(process.cwd(), `data/${version}/${authorName}.json`);
		// Read the json file
		const jsonData = await fsPromises.readFile(filePath);
		// Parse data as json
		const objectData = JSON.parse(jsonData.toString()) as JsonData[];

		const domainsCountSet = new Set<string>();
		objectData.forEach((element) => {
			domainsCountSet.add(element.domain.toString());
		});

		const domainsCountArr = Array.from(domainsCountSet);
		const graphDataArr: GraphData[] = [];
		for (const domain of domainsCountArr) {
			let graphData: GraphData = {
				domain: domain,
				nodes: [],
				edges: []
			};

			const allNode = new Set<string>();
			objectData.forEach((element) => {
				if (element.domain.toString() == domain) {
					allNode.add(element.node);
					allNode.add(element.neighbor);
				}
			});
			const nodes = Array.from(allNode).map((node) => ({
				id: node,
				type: 'graphin-circle',
				style: {
					keyshape: {
						size: 20,
						stroke: '#4338ca',
						fill: '#4338ca',
						fillOpacity: 0.2
					},
					label: {
						value: node,
						position: 'right',
						offset: [20, 5]
						// fill: 'black',
						// fillOpacity: 0.6
					},
					badges: [
						{
							position: 'RT',
							type: 'text',
							value: Math.round(objectData.find((d) => d.neighbor == node)?.neighbor_year!!),
							color: '#4338ca',
							size: [0, 0],
							fontSize: 8,
							offset: [10, 0]
						}
					]
				}
			}));

			const edges = objectData.map((element) => ({
				source: element.node,
				target: element.neighbor
				// style: {
				// 	keyshape: {
				// 		stroke: '#ffff',
				// 		lineWidth: 1,
				// 		opacity: 0.2,
				// 	}
				// }
			}));

			graphData = {
				...graphData,
				nodes,
				edges
			};
			graphDataArr.push(graphData as GraphData);
		}

		return graphDataArr;
	} catch (error) {}
	if (filePath == ' ') {
		return null;
	}
}

// next 13 search param
export default async function Home({ searchParams }: SearchParamProps) {
	const data = (await getDomainData(searchParams)) as GraphData[] | undefined;
	// console.log(searchParams);
	return (
		<main className='flex flex-col p-10 h-full flex-1'>
			{!data?.length && searchParams.author && (
				<div className='h-full w-full flex items-center justify-center my-auto'>
					Nothing found!! 🦄
				</div>
			)}
			{data?.length ? <Domain data={data} /> : ''}

			{!searchParams.author && (
				<div className='h-full w-full flex items-center justify-center my-auto'>
					<div className='w-full flex flex-col space-y-4 items-center px-4 md:p-52'>
						<h1 className='font-extrabold text-3xl text-primary'>
							Research Area/Index/Domain Identification of a Researcher
						</h1>
						<p className='md:text-center'>
							The purpose of this website is to evaluate the effectiveness of our proposed model for
							identifying the research domain of a given researcher. Through a survey, we aim to
							gather data and assess the accuracy of our model in correctly identifying the domain
							of a researcher's work. By conducting this evaluation, we hope to gain insights into
							the strengths and weaknesses of our model, and identify areas for improvement in order
							to better support researchers in their work. This survey serves as a critical tool for
							improving the accuracy of domain identification in research and advancing the field of
							research evaluation.
						</p>
					</div>
				</div>
			)}
		</main>
	);
}
