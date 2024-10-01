import { IElasticsearchService, type IndexData } from 'common';
import { es8 } from 'indexer-client-v8';

export type ESVersion = '7' | '8';

export const clientProvider = ({
	version,
	nodeUrl,
}: {
	version: ESVersion;
	nodeUrl: string;
}): IElasticsearchService => {
	let service: IElasticsearchService;

	if (version === '8') {
		service = es8(nodeUrl);
	} else {
		throw new Error('Unsupported Elasticsearch version');
	}

	return {
		createIndex: (index: string) => service.createIndex(index),
		indexData: (index: string, data: IndexData) => service.indexData(index, data),
		ping: () => service.ping(),
		updateData: (index: string, data: IndexData) => service.updateData(index, data),
		deleteData: (index: string, id: string) => service.deleteData(index, id),
	};
};
