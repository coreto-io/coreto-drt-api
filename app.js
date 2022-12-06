
import CatboxMemory from '@hapi/catbox-memory';
import Hapi from '@hapi/hapi';

import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import * as HapiSwagger from 'hapi-swagger';

import 'dotenv/config';

import ledgerRoutes from './routes/ledgerRoutes.js';
import didRoutes from './routes/didRoutes.js';
import blockchainRoutes from './routes/blockchainRoutes.js';

import api from './api.js';

const init = async () => {
    const server = Hapi.server({
        port: process.env.SERVER_PORT,
        host: process.env.SERVER_HOST,
        cache: [
            {
                name: 'near-api-cache',
                provider: {
                    constructor: CatboxMemory
                }
            }
        ]
    });

    const swaggerOptions = {
        info: {
            title: 'Coreto DRT API Documentation',
            // eslint-disable-next-line max-len
            description: 'An API used to interact with the Coreto DRT',
            version: process.env.APP_VERSION
        }
    };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    server.route({
        method: 'GET',
        path: '/',
        handler: () => {
            return api.notify(
                'Welcome to Coreto DRT API! '
            );
        }
    });

    server.route({
        method: 'GET',
        path: '/about',
        handler: () => {
            return 'Coreto DRT API';
        }
    });

    await server.register(blockchainRoutes);

    await server.register(
        ledgerRoutes,
        { routes: { prefix: '/drt' } }
    );

    await server.register(
        didRoutes,
        { routes: { prefix: '/did' } }
    );

    await server.start();
    // eslint-disable-next-line no-console
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    // eslint-disable-next-line no-console
    console.log(err);
    process.exit(1);
});

init();
