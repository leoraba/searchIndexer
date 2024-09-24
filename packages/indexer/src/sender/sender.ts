import { Client } from '@elastic/elasticsearch';

export const initializeElasticsearchClient = (url: string): Client => {
	return new Client({ node: url }); // Replace with actual node URL
};
