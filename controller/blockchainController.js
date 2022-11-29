import fetch from 'node-fetch';
import nearApi from 'near-api-js';

import api from '../api.js';

export default {
    View: async function (recipient, method, params, rpc_node, headers) {
        try {
            const rpc = rpc_node || process.env.RPC_NODE;
            const nearRpc = new nearApi.providers.JsonRpcProvider({ url: rpc });

            const account = new nearApi.Account({
                provider: nearRpc,
                networkId: api.getNetworkFromRpcNode(rpc),
                signer: recipient,
                headers: (typeof headers !== undefined) ? headers : {}
            },
            recipient);
            return await account.viewFunction(
                recipient,
                method,
                params
            );
        }
        catch (e) {
            return api.reject(e);
        }
    },

    GetBalance: function (account_id) {
        try {
            const body = {
                jsonrpc: '2.0',
                id: 'dontcare',
                method: 'query',
                params: {
                    request_type: 'view_account',
                    finality: 'final',
                    account_id
                }
            };

            return fetch(process.env.RPC_NODE, {
                method: 'post',
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' }
            })
                .then((res) => res.json())
                .then((json) => {
                    if (json.error) {
                        return api.reject(json.error.data);
                    }

                    return nearApi.utils.format.formatNearAmount(
                        json.result.amount
                    );
                });
        }
        catch (e) {
            return api.reject(e);
        }
    },

    getCurrentBlockHeight: function () {
        try {
            const body = {
                jsonrpc: '2.0',
                id: 'dontcare',
                method: 'status',
                params: []
            };

            return fetch(process.env.RPC_NODE, {
                method: 'post',
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' }
            })
                .then((res) => res.json())
                .then((json) => {
                    if (json.error) {
                        return api.reject(json.error.data);
                    }

                    return {
                        block_height: json.result.sync_info.latest_block_height
                    };
                });
        }
        catch (e) {
            return api.reject(e);
        }
    },

    Call: async function (
        account_id,
        private_key,
        attached_tokens,
        attached_gas,
        recipient,
        method,
        params,
        network,
        rpc_node,
        headers
    ) {
        try {
            const account = await this.GetAccountByKey(
                account_id,
                private_key,
                network,
                rpc_node,
                headers
            );

            return await account.functionCall({
                contractId: recipient,
                methodName: method,
                args: params,
                gas: attached_gas,
                attachedDeposit: attached_tokens
            });
        }
        catch (e) {
            return api.reject(e);
        }
    },

    GetAccountByKey: async function (
        account_id,
        private_key,
        network,
        rpc_node,
        headers
    ) {
        try {
            network = network || process.env.NEAR_NETWORK;
            rpc_node = rpc_node || process.env.RPC_NODE;

            private_key = private_key.replace('"', '');

            const keyPair = nearApi.utils.KeyPair.fromString(private_key);
            const keyStore = new nearApi.keyStores.InMemoryKeyStore();
            keyStore.setKey(network, account_id, keyPair);

            const near = await nearApi.connect({
                networkId: network,
                deps: { keyStore },
                masterAccount: account_id,
                nodeUrl: rpc_node,
                headers: (typeof headers !== undefined) ? headers : {}
            });

            return await near.account(account_id);
        }
        catch (e) {
            return api.reject(e);
        }
    }
};
