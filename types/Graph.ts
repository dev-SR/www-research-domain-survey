import { GraphinData } from '@antv/graphin';

export type GraphData = GraphinData & {
	domain: string;
};

export type JsonData = {
	domain: number;
	node: string;
	neighbor: string;
	weight: number;
	node_year: number;
	neighbor_year: number;
	node_paper_id: string;
	neighbor_paper_id: string;
};
