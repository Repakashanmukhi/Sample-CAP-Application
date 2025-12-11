const cds = require('@sap/cds');

// Register OData V2 adapter
cds.on('bootstrap', (app) => {
    const odataV2Proxy = require('@sap/cds-odata-v2-adapter-proxy');
    odataV2Proxy(app); // This will adapt your service to OData V2
});

module.exports = cds.server;
