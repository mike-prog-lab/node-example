let AWS = require('aws-sdk');
let region = "us-east-1";
let secretName = "app-test-user";
let secret;
let decodedBinarySecret;

let client = new AWS.SecretsManager({
    region: region
});

module.exports.getMongodbUri = () => {
    return new Promise((resolve, reject) => {
        client.getSecretValue({SecretId: secretName}, (err, data) => {
            if (err) {
                reject(err);
                if (err.code === 'DecryptionFailureException')
                    // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
                    // Deal with the exception here, and/or rethrow at your discretion.
                    throw err;
                else if (err.code === 'InternalServiceErrorException')
                    // An error occurred on the server side.
                    // Deal with the exception here, and/or rethrow at your discretion.
                    throw err;
                else if (err.code === 'InvalidParameterException')
                    // You provided an invalid value for a parameter.
                    // Deal with the exception here, and/or rethrow at your discretion.
                    throw err;
                else if (err.code === 'InvalidRequestException')
                    // You provided a parameter value that is not valid for the current state of the resource.
                    // Deal with the exception here, and/or rethrow at your discretion.
                    throw err;
                else if (err.code === 'ResourceNotFoundException')
                    // We can't find the resource that you asked for.
                    // Deal with the exception here, and/or rethrow at your discretion.
                    throw err;
            } else {
                // Decrypts secret using the associated KMS CMK.
                // Depending on whether the secret is a string or binary, one of these fields will be populated.
                if ('SecretString' in data) {
                    secret = data.SecretString;
                } else {
                    let buff = new Buffer(data.SecretBinary, 'base64');
                    decodedBinarySecret = buff.toString('ascii');
                }

                const dbData = JSON.parse(secret);

                console.log(dbData);
                let uri = `mongodb://${dbData.username}:${dbData.password}@${dbData.host}:${dbData.port}/projects`;

                if (dbData.ssl === true) {
                    uri += `?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`
                }

                resolve({
                    uri,
                });
            }
        });
    })
};