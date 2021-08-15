let AWS = require('aws-sdk');
let region = "us-east-1";

let client = new AWS.SecretsManager({
    region: region
});

/**
 *
 * @returns {Promise<unknown>}
 */
function retrieveSecret(secretName) {
    return new Promise((resolve, reject) => {
        let secret;
        let decodedBinarySecret;

        client.getSecretValue({SecretId: secretName}, (err, data) => {
            if (err) {
                reject(err);
            } else {
                // Decrypts secret using the associated KMS CMK.
                // Depending on whether the secret is a string or binary, one of these fields will be populated.
                if ('SecretString' in data) {
                    secret = data.SecretString;
                } else {
                    let buff = new Buffer(data.SecretBinary, 'base64');
                    decodedBinarySecret = buff.toString('ascii');
                }

                resolve({
                    secret,
                    decodedBinarySecret,
                })
            }
        });
    });
}

/**
 *
 * @returns {Promise<string>}
 */
module.exports.getMongodbUri = async () => {
    const { secret } = await retrieveSecret('app-test-user');

    const dbData = JSON.parse(secret);

    let uri = `mongodb://${dbData.username}:${dbData.password}@${dbData.host}:${dbData.port}/projects`;

    if (dbData.ssl === true) {
        uri += `?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`
    }

    return uri;
};

/**
 *
 * @returns {Promise<string>}
 */
module.exports.getMongodbPem = async () => {
    const { secret } = await retrieveSecret('documentdb-cluster-1-pem');

    return secret;
};