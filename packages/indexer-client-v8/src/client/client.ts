import { Client } from '@elastic/elasticsearch';
import type { IElasticsearchService, IndexData, MutationResponse } from 'common';

import { createIndexIfNotExists, deleteData, indexData, ping, updateData } from './operations.js';

export const es8 = (nodeUrl: string): IElasticsearchService => {
	const client = new Client({ node: nodeUrl });

	return {
		async createIndex(index: string): Promise<boolean> {
			return createIndexIfNotExists(client, index);
		},

		async indexData(index: string, data: IndexData): Promise<MutationResponse> {
			return indexData(client, index, data);
		},

		async ping(): Promise<boolean> {
			return ping(client);
		},

		async updateData(index: string, data: IndexData): Promise<MutationResponse> {
			return updateData(client, index, data);
		},

		async deleteData(index: string, id: string): Promise<MutationResponse> {
			return deleteData(client, index, id);
		},
	};
};
