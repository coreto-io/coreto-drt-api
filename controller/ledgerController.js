import blockchainController from './blockchainController.js';
import api from '../api.js';

export default {
    getUserActions: function (payload) {
        try {
            return blockchainController.View(
                process.env.CORETO_TP_LEDGER_CONTRACT,
                'get_user_actions',
                payload
            );
        }
        catch (e) {
            return api.reject(e);
        }
    },

    getUserTrustActions: function (payload) {
        try {
            return blockchainController.View(
                process.env.CORETO_TP_LEDGER_CONTRACT,
                'get_user_trust_actions',
                payload
            );
        }
        catch (e) {
            return api.reject(e);
        }
    },

    getUserPerformanceActions: function (payload) {
        try {
            return blockchainController.View(
                process.env.CORETO_TP_LEDGER_CONTRACT,
                'get_user_performance_actions',
                payload
            );
        }
        catch (e) {
            return api.reject(e);
        }
    },

    getSourceActionTypes: function (payload) {
        try {
            return blockchainController.View(
                process.env.CORETO_TP_LEDGER_CONTRACT,
                'get_source_action_types',
                payload
            );
        }
        catch (e) {
            return api.reject(e);
        }
    },

    saveActionsBatch: async function (payload) {
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
                process.env.CORETO_TP_LEDGER_CONTRACT,
                'save_actions_batch',
                callPayload,
                '300000000000000',
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

    saveAction: async function (payload) {
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
                process.env.CORETO_TP_LEDGER_CONTRACT,
                'save_action',
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
