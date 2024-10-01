import type { IndexData, MutationResponse } from './dataRecord';

export interface IElasticsearchService {
	createIndex(index: string): Promise<boolean>;
	indexData(index: string, data: IndexData): Promise<MutationResponse>;
	ping(): Promise<boolean>;
	updateData(index: string, data: IndexData): Promise<MutationResponse>;
	deleteData(index: string, id: string): Promise<MutationResponse>;
}
