import crypto from 'crypto';

const ViewCacheExpirationInSeconds = 10;
const ViewGenerateTimeoutInSeconds = 30;

export const replyCachedValue = (h, { value, cached }) => {
    const lastModified = cached ? new Date(cached.stored) : new Date();

    return h
        .response(value)
        .header('Last-Modified', lastModified.toUTCString());
};

export const getServerMethodParams = () => {
    return {
        generateKey: (params) => {
            const hash = crypto.createHash('sha1');
            hash.update(JSON.stringify(params));
            return hash.digest('base64');
        },
        cache: {
            cache: 'near-api-cache',
            expiresIn: ViewCacheExpirationInSeconds * 1000,
            generateTimeout: ViewGenerateTimeoutInSeconds * 1000,
            getDecoratedValue: true
        }
    };
};

export default {
    replyCachedValue,
    getServerMethodParams
};
