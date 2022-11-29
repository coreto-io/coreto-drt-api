export default {
    reject: (err) => {
        return {
            error: typeof err === 'string' ? err : err.message,
            type: typeof err === 'string' ? err : err.type
        };
    },
    notify: (message) => {
        return { text: message };
    },
    getNetworkFromRpcNode(rpc_node) {
        return rpc_node.replace('https://rpc.', '').replace('.near.org', '');
    }
};
