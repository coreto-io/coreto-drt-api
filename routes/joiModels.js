import Joi from 'joi';

// Generic models
export const smartContractError = Joi.object({
    error: Joi.string().description(
        'The error resulted from the smart contract'
    ),
    type: Joi.string().description(
        // eslint-disable-next-line max-len
        'The error type resulted from the smart contract'
    )
}).label('Smart contract error response');

export const internalServerError = Joi.object({
    error: Joi.string().description(
        'The error resulted from the server'
    ),
    statusCode: Joi.number().description(
        'The error status code resulted from the server'
    ),
    message: Joi.string().description(
        'The error message resulted from the server'
    )
}).label('Internal server error response');

export const transactionResponse = Joi.object({
    hash: Joi.string().description(
        'The hash of the completed transaction'
    )
}).label('Transaction response');

// Ledger models
export const getUserActionsPayload = Joi.object({
    source_label: Joi
        .string()
        .required()
        .description(
            // eslint-disable-next-line max-len
            'The label of the source that submitted the actions'
        ),
    account_did: Joi
        .string()
        .required()
        .description('The DID of the user')
}).label('Get user actions payload');

export const saveActionPayload = Joi.object({
    caller_account_id: Joi
        .string()
        .required()
        .description('The NEAR account ID of the caller'),
    caller_private_key: Joi
        .string()
        .required()
        .description('The NEAR private key of the caller'),
    account_did: Joi
        .string()
        .required()
        .description('The DID of the account'),
    action_date: Joi
        .date()
        .timestamp('unix')
        .raw()
        .required()
        .description(
            'The unix timestamp of the action'
        ),
    action_type: Joi
        .string()
        .required()
        .description('The type of the action'),
    trust: Joi
        .number()
        .required()
        .description(
            'The trust variation value of the action'
        ),
    performance: Joi
        .number()
        .required()
        .description(
            'The performance variation value of the action'
        ),
    identifier: Joi.alternatives(
        Joi.string(),
        Joi.number()
    ).description(
        // eslint-disable-next-line max-len
        'The identifier of the action used by the source to recognize the action'
    )
}).label('Save action payload');

export const saveActionsBatchPayload = Joi.object({
    caller_account_id: Joi
        .string()
        .required()
        .description('The NEAR account ID of the caller'),
    caller_private_key: Joi
        .string()
        .required()
        .description('The NEAR private key of the caller'),
    batch: Joi.array().items(
        Joi.object({
            account_did: Joi
                .string()
                .required()
                .description('The DID of the account'),
            action_date: Joi
                .date()
                .timestamp('unix')
                .raw()
                .required()
                .description(
                    'The unix timestamp of the action'
                ),
            action_type: Joi
                .string()
                .required()
                .description('The type of the action'),
            trust: Joi
                .number()
                .required()
                .description(
                    // eslint-disable-next-line max-len
                    'The trust variation value of the action'
                ),
            performance: Joi
                .number()
                .required()
                .description(
                    // eslint-disable-next-line max-len
                    'The performance variation value of the action'
                ),
            identifier: Joi.alternatives(
                Joi.string(),
                Joi.number()
            ).description(
                // eslint-disable-next-line max-len
                'The identifier of the action used by the source to recognize the action'
            )
        }).label('Save actions batch item')
    ).required()
}).label('Save actions batch payload');

export const getSourceActionTypesPayload = Joi.object({
    source: Joi
        .string()
        .required()
        .description('The NEAR account ID of the source')
}).label('Get source action types payload');

// DID models
export const createDIDResponse = Joi.object({
    did: Joi.string().description('The DID generated'),
    seed: Joi.string().description(
        'The seed used to generate the DID'
    )
}).label('Create DID response');

export const putDIDPayload = Joi.object({
    caller_account_id: Joi
        .string()
        .required()
        .description('The NEAR account ID of the caller'),
    caller_private_key: Joi
        .string()
        .required()
        .description('The NEAR private key of the caller'),
    account_id: Joi
        .string()
        .required()
        .description(
            'The NEAR account ID of the DID owner'
        ),
    did: Joi
        .string()
        .required()
        .description('The DID to be added')
}).label('Put DID payload');

export const transferDIDPayload = Joi.object({
    caller_account_id: Joi
        .string()
        .required()
        .description('The NEAR account ID of the caller'),
    caller_private_key: Joi
        .string()
        .required()
        .description('The NEAR private key of the caller'),
    old_account_id: Joi
        .string()
        .required()
        .description(
            'The NEAR account ID of the DID owner'
        ),
    new_account_id: Joi
        .string()
        .required()
        .description(
            'The NEAR account ID of the new DID owner'
        )
}).label('Transfer DID payload');

export const getHasDIDPayload = Joi.object({
    account_id: Joi
        .string()
        .required()
        .description('The NEAR account ID of the DID owner')
}).label('Get/Has DID payload');

// Blockchain models

export const viewPayload = Joi.object({
    contract: Joi
        .string()
        .required()
        .description('The NEAR account ID of contract'),
    method: Joi
        .string()
        .required()
        .description('The method name to call'),
    params: Joi
        .object()
        .required()
        .description('The payload to send to the method')
}).label('View payload');

export const callPayload = Joi.object({
    account_id: Joi
        .string()
        .required()
        .description(
            // eslint-disable-next-line max-len
            'The NEAR account ID that will be performing the call'
        ),
    private_key: Joi
        .string()
        .required()
        .description('The private key of the account id'),
    contract: Joi
        .string()
        .required()
        .description('The NEAR account ID of contract'),
    method: Joi
        .string()
        .required()
        .description('The method name to call'),
    params: Joi
        .object()
        .required()
        .description('The payload to send to the method'),
    attached_gas: Joi
        .string()
        .required()
        .description(
            // eslint-disable-next-line max-len
            'The amount of gas you will be attaching to the call in TGas'
        ),
    attached_tokens: Joi
        .string()
        .required()
        .description(
            // eslint-disable-next-line max-len
            'The amount of tokens to be sent to the contract you are calling in yoctoNEAR (10^-24 NEAR)'
        )
}).label('Call payload');

export const balanceParams = Joi.object({
    account_id: Joi
        .string()
        .required()
        .description('The NEAR account ID of the user')
}).label('Balance params');

export default {
    smartContractError,
    internalServerError,
    transactionResponse,
    getUserActionsPayload,
    saveActionPayload,
    saveActionsBatchPayload,
    getSourceActionTypesPayload,
    createDIDResponse,
    putDIDPayload,
    transferDIDPayload,
    getHasDIDPayload,
    viewPayload,
    callPayload,
    balanceParams
};
