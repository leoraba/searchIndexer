export type DataRecordValue = string | string[] | number | number[] | boolean | boolean[] | undefined;

export type Result = 'created' | 'updated' | 'deleted' | 'not_found' | 'noop';

export interface MutationResponse {
	result: Result;
	_id: string;
	_index: string;
}

export interface IndexData {
	id: string;
	data: Record<string, DataRecordValue>;
	organization: string;
	entityName: string;
}
