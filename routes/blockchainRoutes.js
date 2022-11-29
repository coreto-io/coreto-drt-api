import pg from 'pg';
import Joi from 'joi';

import blockchainController from '../controller/blockchainController.js';
import {
    replyCachedValue,
    getServerMethodParams
} from '../utils.js';
import {
    smartContractError,
    internalServerError,
    viewPayload,
    callPayload,
    balanceParams
} from './joiModels.js';

const { Client } = pg;
Client.poolSize = 100;

export default {
    name: 'blockchain',
    register(server) {
        server.route({
            method: 'POST',
            path: '/view',
            options: {
                description: 'View',
                notes: 'Perform a view action on a smart contract',
                tags: ['api'],
                response: {
                    status: {
                        200: Joi.any(),
                        400: smartContractError,
                        500: internalServerError
                    }
                },
                validate: {
                    payload: viewPayload
                }
            },
            handler: async (request, h) => {
                if (request.payload.disabled_cache) {
                    return blockchainController.View(
                        request.payload.contract,
                        request.payload.method,
                        request.payload.params,
                        request.payload.rpc_node,
                        request.payload.headers
                    );
                }

                request.payload.request_name = 'view';
                return replyCachedValue(
                    h,
                    await server.methods.view(request.payload)
                );

            }
        });

        server.method(
            'view',
            (params) => blockchainController.View(
                params.contract,
                params.method,
                params.params,
                params.rpc_node,
                params.headers
            ),
            getServerMethodParams()
        );

        server.route({
            method: 'POST',
            path: '/call',
            options: {
                description: 'Call',
                notes: 'Perform a call action on a smart contract',
                tags: ['api'],
                response: {
                    status: {
                        200: Joi.any(),
                        400: smartContractError,
                        500: internalServerError
                    }
                },
                validate: {
                    payload: callPayload
                }
            },
            handler: async (request) => {
                const {
                    account_id,
                    private_key,
                    attached_tokens,
                    attached_gas,
                    contract,
                    method,
                    params,
                    network,
                    rpc_node,
                    headers
                } = request.payload;

                return await blockchainController.Call(
                    account_id,
                    private_key,
                    attached_tokens,
                    attached_gas,
                    contract,
                    method,
                    params,
                    network,
                    rpc_node,
                    headers
                );
            }
        });

        server.route({
            method: 'GET',
            path: '/balance/{account_id}',
            options: {
                description: 'Balance',
                notes: 'Get the balance of an account',
                tags: ['api'],
                response: {
                    status: {
                        200: Joi.any(),
                        400: smartContractError,
                        500: internalServerError
                    }
                },
                validate: {
                    params: balanceParams
                }
            },
            handler: (request) => {
                return blockchainController.GetBalance(
                    request.params.account_id
                );
            }
        });

        server.route({
            method: 'GET',
            path: '/current_block_height',
            options: {
                description: 'Current block height',
                notes: 'Get the current block height from the blockchain',
                tags: ['api'],
                response: {
                    status: {
                        200: Joi.any(),
                        400: smartContractError,
                        500: internalServerError
                    }
                }
            },
            handler: () => {
                return blockchainController.getCurrentBlockHeight();
            }
        });
    }
};
