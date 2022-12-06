import Joi from 'joi';

import ledgerController from '../controller/ledgerController.js';
import {
    smartContractError,
    internalServerError,
    transactionResponse,
    getUserActionsPayload,
    saveActionPayload,
    saveActionsBatchPayload,
    getSourceActionTypesPayload
} from './joiModels.js';

export default {
    name: 'drt',
    register(server) {
        server.route({
            method: 'POST',
            path: '/get_source_action_types',
            handler: (request) => {
                return ledgerController.getSourceActionTypes(
                    request.payload
                );
            },
            options: {
                description: 'Get source action types',
                notes: 'Get a list of action types submitted by a source.',
                tags: ['api'],
                response: {
                    status: {
                        200: Joi.any(),
                        400: smartContractError,
                        500: internalServerError
                    }
                },
                validate: {
                    payload: getSourceActionTypesPayload
                }
            }
        });

        server.route({
            method: 'POST',
            path: '/save_actions_batch',
            handler: (request) => {
                return ledgerController.saveActionsBatch(
                    request.payload
                );
            },
            options: {
                description: 'Save actions batch',
                notes: 'Save a batch of actions from one source',
                tags: ['api'],
                response: {
                    status: {
                        200: transactionResponse,
                        400: smartContractError,
                        500: internalServerError
                    }
                },
                validate: {
                    payload: saveActionsBatchPayload
                }
            }
        });

        server.route({
            method: 'POST',
            path: '/save_action',
            handler: (request) => {
                return ledgerController.saveAction(
                    request.payload
                );
            },
            options: {
                description: 'Save action',
                notes: 'Save an action made by a user',
                tags: ['api'],
                response: {
                    status: {
                        200: transactionResponse,
                        400: smartContractError,
                        500: internalServerError
                    }
                },
                validate: {
                    payload: saveActionPayload
                }
            }
        });

        server.route({
            method: 'POST',
            path: '/get_user_actions',
            handler: (request) => {
                return ledgerController.getUserActions(
                    request.payload
                );
            },
            options: {
                description: 'Get user actions',
                notes: 'Get all actions done by a user submitted by a source',
                tags: ['api'],
                response: {
                    status: {
                        200: Joi.any(),
                        400: smartContractError,
                        500: internalServerError
                    }
                },
                validate: {
                    payload: getUserActionsPayload
                }
            }
        });

        server.route({
            method: 'POST',
            path: '/get_user_trust_actions',
            handler: (request) => {
                return ledgerController.getUserTrustActions(
                    request.payload
                );
            },
            options: {
                description: 'Get user trust actions',
                // eslint-disable-next-line max-len
                notes: 'Get all actions, that modifies the trust, done by a user submitted by a source',
                tags: ['api'],
                response: {
                    status: {
                        200: Joi.any(),
                        400: smartContractError,
                        500: internalServerError
                    }
                },
                validate: {
                    payload: getUserActionsPayload
                }
            }
        });

        server.route({
            method: 'POST',
            path: '/get_user_performance_actions',
            handler: (request) => {
                return ledgerController.getUserPerformanceActions(
                    request.payload
                );
            },
            options: {
                description: 'Get user performance actions',
                // eslint-disable-next-line max-len
                notes: 'Get all actions, that modifies the performance, done by a user submitted by a source',
                tags: ['api'],
                response: {
                    status: {
                        200: Joi.any(),
                        400: smartContractError,
                        500: internalServerError
                    }
                },
                validate: {
                    payload: getUserActionsPayload
                }
            }
        });
    }
};
