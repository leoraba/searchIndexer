import type { Client } from '@elastic/elasticsearch';

export const createIndexIfNotExists = async (client: Client, index: string) => {
	const exists = await client.indices.exists({ index });
	if (!exists) {
		await client.indices.create({ index });
		console.log(`Index ${index} created.`);
	} else {
		console.log(`Index ${index} already exists.`);
	}
};

export const indexData = async (client: Client, index: string, id: string, data: Record<string, any>) => {
	try {
		const response = await client.index({
			index,
			id,
			body: data,
		});
		console.log('Document indexed:', response);
	} catch (error) {
		console.error('Error indexing data:', error);
	}
};

export const bulkIndexData = async (client: Client, index: string, dataArray: Record<string, any>[]) => {
	const body = dataArray.flatMap((doc) => [{ index: { _index: index } }, doc]);
	try {
		const response = await client.bulk({ refresh: true, body });
		console.log('Bulk index response:', response);
	} catch (error) {
		console.error('Error in bulk indexing:', error);
	}
};

export const updateData = async (client: Client, index: string, id: string, partialData: Record<string, any>) => {
	try {
		const response = await client.update({
			index,
			id,
			body: {
				doc: partialData,
			},
		});
		console.log('Document updated:', response);
	} catch (error) {
		console.error('Error updating document:', error);
	}
};

export const deleteData = async (client: Client, index: string, id: string) => {
	try {
		const response = await client.delete({
			index,
			id,
		});
		console.log('Document deleted:', response);
	} catch (error) {
		console.error('Error deleting document:', error);
	}
};
