import Joi from 'joi';

import didController from '../controller/didController.js';
import {
    smartContractError,
    internalServerError,
    transactionResponse,
    createDIDResponse,
    putDIDPayload,
    transferDIDPayload,
    getHasDIDPayload
} from './joiModels.js';

export default {
    name: 'did',
    register(server) {
        server.route({
            method: 'POST',
            path: '/create_did',
            handler: (request) => {
                return didController.createDID(
                    request.payload
                );
            },
            options: {
                description: 'Create DID',
                notes: 'Generate a new DID based to a NEAR wallet',
                tags: ['api'],
                response: {
                    status: {
                        200: createDIDResponse,
                        400: Joi.any(),
                        500: internalServerError
                    }
                }
            }
        });

        server.route({
            method: 'POST',
            path: '/put_did',
            handler: (request) => {
                return didController.putDID(
                    request.payload
                );
            },
            options: {
                description: 'Put DID',
                notes: 'Add the DID into the DID registry',
                tags: ['api'],
                response: {
                    status: {
                        200: transactionResponse,
                        400: smartContractError,
                        500: internalServerError
                    }
                },
                validate: {
                    payload: putDIDPayload
                }
            }
        });

        server.route({
            method: 'POST',
            path: '/transfer_did',
            handler: (request) => {
                return didController.transferDID(
                    request.payload
                );
            },
            options: {
                description: 'Transfer DID',
                notes: 'Transfer the DID to another wallet',
                tags: ['api'],
                response: {
                    status: {
                        200: transactionResponse,
                        400: smartContractError,
                        500: internalServerError
                    }
                },
                validate: {
                    payload: transferDIDPayload
                }
            }
        });

        server.route({
            method: 'POST',
            path: '/get_did',
            handler: (request) => {
                return didController.getDID(
                    request.payload
                );
            },
            options: {
                description: 'Get DID',
                notes: 'Get the DID from the DID registry',
                tags: ['api'],
                response: {
                    status: {
                        200: Joi.string().description(
                            'The DID associated with the NEAR account ID'
                        ),
                        400: Joi.any(),
                        500: internalServerError
                    }
                },
                validate: {
                    payload: getHasDIDPayload
                }
            }
        });

        server.route({
            method: 'POST',
            path: '/has_did',
            handler: (request) => {
                return didController.hasDID(
                    request.payload
                );
            },
            options: {
                description: 'Has DID',
                notes: 'Check if a NEAR account has an associated DID',
                tags: ['api'],
                response: {
                    status: {
                        200: Joi.boolean().description(
                            // eslint-disable-next-line max-len
                            'Boolean value indicating if the NEAR account has an associated DID'
                        ),
                        400: Joi.any(),
                        500: internalServerError
                    }
                },
                validate: {
                    payload: getHasDIDPayload
                }
            }
        });
    }
};
