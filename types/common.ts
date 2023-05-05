export type Params = {
	params: {
		author: string;
	};
};
export type SearchParamProps = {
	searchParams: { [key: string]: string | string[] | undefined };
};
export type URLParam = { params: { id: string } };
export type ReactChildren = { children: React.ReactNode };
