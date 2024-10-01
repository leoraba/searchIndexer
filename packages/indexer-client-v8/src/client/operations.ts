import type { Client } from '@elastic/elasticsearch';
import type { UpdateResponse, WriteResponseBase } from '@elastic/elasticsearch/lib/api/types.js';
import { DataRecordValue, IndexData, sanitize_index_name } from 'common';

/**
 * Creates an index in Elasticsearch if it does not already exist.
 *
 * This function checks if the specified index exists in Elasticsearch.
 * If the index does not exist, it creates the index.
 * If the index already exists, no action is taken.
 *
 * @param client
 * @param index
 * @returns `true` if the index already exists, `false` if doesn't exist.
 */
export const createIndexIfNotExists = async (client: Client, index: string): Promise<boolean> => {
	const sanitizedIndex = sanitize_index_name(index);
	const exists = await client.indices.exists({ index: sanitizedIndex });
	if (!exists) {
		await client.indices.create({ index: sanitizedIndex });
		console.log(`Index ${sanitizedIndex} created.`);
	} else {
		console.log(`Index ${sanitizedIndex} already exists.`);
	}
	return exists;
};

export const indexData = async (
	client: Client,
	index: string,
	{ id, data, entityName, organization }: IndexData,
): Promise<WriteResponseBase> => {
	const sanitizedIndex = sanitize_index_name(index);
	const response = await client.index({
		index: sanitizedIndex,
		id,
		document: {
			data,
			entityName,
			organization,
		},
	});
	console.log('Document indexed:', response);
	return response;
};

// TODO: add this to service
// export const bulkIndexData = async ({
// 	client,
// 	index,
// 	dataArray,
// 	entityName,
// 	organization,
// }: {
// 	client: Client;
// 	index: string;
// 	dataArray: Record<string, DataRecordValue>[];
// 	entityName: string;
// 	organization: string;
// }) => {
// 	const sanitizedIndex = sanitize_index_name(index);
// 	const body = dataArray.flatMap((doc) => [{ index: { _index: sanitizedIndex } }, doc]);
// 	try {
// 		const response = await client.bulk({ refresh: true, body });
// 		console.log('Bulk index response:', response);
// 		return response;
// 	} catch (error) {
// 		console.error('Error in bulk indexing:', error);
// 	}
// };

export const updateData = async (
	client: Client,
	index: string,
	{ id, data }: { id: string; data: Record<string, DataRecordValue> },
): Promise<UpdateResponse<unknown>> => {
	const sanitizedIndex = sanitize_index_name(index);
	const response = await client.update({
		index: sanitizedIndex,
		id,
		body: {
			doc: { data },
		},
	});
	console.log('Document updated:', response);
	return response;
};

export const deleteData = async (client: Client, index: string, id: string): Promise<WriteResponseBase> => {
	const sanitizedIndex = sanitize_index_name(index);
	const response = await client.delete({
		index: sanitizedIndex,
		id,
	});
	console.log('Document deleted:', response);
	return response;
};

export const ping = async (client: Client): Promise<boolean> => {
	return await client.ping();
};
