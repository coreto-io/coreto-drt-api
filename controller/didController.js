import { DID } from 'dids';
import { Ed25519Provider } from 'key-did-provider-ed25519';
import { getResolver } from 'key-did-resolver';
import nearApi from 'near-api-js';

import blockchainController from './blockchainController.js';
import api from '../api.js';

export default {
    createDID: async function () {
        try {
            const keyPair = nearApi.KeyPair.fromRandom('ed25519');
            const seed = Buffer.from(keyPair.secretKey.slice(0,32));

            const provider = new Ed25519Provider(seed);
            const did = new DID({ provider, resolver: getResolver() });
            await did.authenticate();

            return {
                did: did.id,
                seed: seed.toString()
            };
        }
        catch (e) {
            return api.reject(e);
        }
    },
    putDID: async function (payload) {
        try {
            const {
                caller_account_id,
                caller_private_key,
                ...callPayload
            } = payload;

            const account = await blockchainController.GetAccountByKey(
                caller_account_id,
                caller_private_key
            );

            const tx = await account.functionCall(
                process.env.CORETO_DID_REGISTRY_CONTRACT,
                'put_did',
                callPayload,
                '100000000000000',
                '0'
            );

            if (!tx.status.Failure) {
                return { hash: tx.transaction.hash };
            }
        }
        catch (e) {
            return api.reject(e);
        }
    },
    getDID: function (payload) {
        try {
            return blockchainController.View(
                process.env.CORETO_DID_REGISTRY_CONTRACT,
                'get_did',
                payload
            );
        }
        catch (e) {
            return api.reject(e);
        }
    },
    hasDID: function (payload) {
        try {
            return blockchainController.View(
                process.env.CORETO_DID_REGISTRY_CONTRACT,
                'has_did',
                payload
            );
        }
        catch (e) {
            return api.reject(e);
        }
    },
    transferDID: async function (payload) {
        try {
            const {
                caller_account_id,
                caller_private_key,
                ...callPayload
            } = payload;

            const account = await blockchainController.GetAccountByKey(
                caller_account_id,
                caller_private_key
            );

            const tx = await account.functionCall(
                process.env.CORETO_DID_REGISTRY_CONTRACT,
                'transfer_did',
                callPayload,
                '100000000000000',
                '0'
            );

            if (!tx.status.Failure) {
                return { hash: tx.transaction.hash };
            }
        }
        catch (e) {
            return api.reject(e);
        }
    }
};
