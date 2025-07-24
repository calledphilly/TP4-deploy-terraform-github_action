import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
	DeleteCommand,
	DynamoDBDocumentClient,
	GetCommand,
	PutCommand,
	UpdateCommand,
} from '@aws-sdk/lib-dynamodb';

const ddbClient = new DynamoDBClient({ region: 'eu-west-1' });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

// Define the name of the DDB table to perform the CRUD operations on
const tablename = 'lambda-apigateway';

/**
 * Provide an event that contains the following keys:
 *
 *   - operation: one of 'create,' 'read,' 'update,' 'delete,' or 'echo'
 *   - payload: a JSON object containing the parameters for the table item
 *     to perform the operation on
 */
export const handler = async (event, context) => {
	let body;
	try {
		body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
	} catch (err) {
		return {
			statusCode: 400,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				message: 'Invalid JSON in request body',
				error: err.message,
			}),
		};
	}

	const operation = body.operation;
	const payload = body.payload;
	if (!operation) {
		return {
			statusCode: 500,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				message: 'internal server error',
				error: "missing in 'operation' request in body ",
			}),
		};
	}
	if (!payload) {
		return {
			statusCode: 500,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				message: 'internal server error',
				error: "missing in 'payload' request in body ",
			}),
		};
	}

	payload.TableName = tablename;

	let response;
	try {
		switch (operation) {
			case 'create':
				response = await ddbDocClient.send(new PutCommand(payload));
				break;
			case 'read':
				response = await ddbDocClient.send(new GetCommand(payload));
				break;
			case 'update':
				response = ddbDocClient.send(new UpdateCommand(payload));
				break;
			case 'delete':
				response = ddbDocClient.send(new DeleteCommand(payload));
				break;
			case 'echo':
				return {
					statusCode: 200,
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(payload),
				};
			default:
				return {
					statusCode: 400,
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ message: `Unknown operation: ${operation}` }),
				};
		}
		console.log(response);
		return {
			statusCode: 200,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(response),
		};
	} catch (err) {
		console.error(err);
		return {
			statusCode: 500,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				message: 'internal server error',
				error: err.message,
			}),
		};
	}
};
