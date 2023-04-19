const dialogflow = require('@google-cloud/dialogflow');
const fs = require('fs');

const CREDENTIALS = {
    "type": "service_account",
    "project_id": "chat-bot-aphy",
    "private_key_id": "c8da1ea58278e57a61c8e9ea2be003547f805343",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCubpa7eQa+do8Y\nnzJxVjAyCJusvfv4dVEJ+8YlkdbBXRfmomOoLo24Sue8B27jrBq5ldHiAshE2ecb\nysNvoYTPmzWUqCobBqs8NnqBbsd7oeOtTi2Jr+mXP3InLfY4AzqhKiwgFAVLJyUO\n5cyP+sFO1zZDnJMp3HNlyDCqkBVO54Dr/6c5Oez7eOZrGGA7SB859NwJbQ5QT+kC\nyBCKM5zOQZfgkabdeJr10WSpoPlz7VRYXMUnxyArhOz9jhf7XLcNX8FR3DE/7A+v\nsQr7LBReJdQRO+3ZBhnFbUPzzniQnQRCzpJ0fe+5UXuC/xxlCIPXfXLHB3iLJOww\n6gpEg077AgMBAAECggEAFQLrPeqRM7t89zP4qTWpmTf3kJz9+hV09+U6dBIXiAlF\nChoWM7m6hoWMroCdYegRprieT0GTNX/4r8dX4rLWba+Til72BiANMQlFmSEVVGt8\nInHKrc2L2hU2v0jGYkQ5Tr/mus0j6hlCry2322wS1wK43aIXCVwtu7Kb8h+9rAL8\nqDzGmDvatCc8ocrK86wqQUL6tDqGSO8aHWs+YsV8xYgo5C3DesD5dDxWJUhKUmcn\n7Q854OKoeMlplZfUqKxYva1zgeYWot0eQcOgF0q8AwCeZ6B6Wiap28X3CI6NwCPe\nGrLItXZfYAIjvkrUWaQxxG7WLiVTj56dlzpzyE/F4QKBgQDZYMvh6PbNIw17H2mO\nRzuLG2tHKUtkM1OP0gIQBoFRk46v+wdO9neNX1hUrsj1wCRY3KbTc5X4hU8lK0HA\nh6LaHUSCwDxKksMvIsKRCUWB2YwgLO0+T/pjZzhobtGTEeQhd2lWbdcPiToykavA\nUzSghSlAl1H/jnyCVVJn+SVv6wKBgQDNbG9xvtQG6GMXjc/k/so4xsdekqyoQsCP\nTqvqEtQRCpwgn9oxZ2qW+A54DgFwMh8DzK3naOBEXceezKnxdZ4UhO91zfcYJFd7\nyelTL1jiFYCL9u+S95qtgDrBQdpfOCCYNm8k8118IlXhMMIrAw4dsaCAajQ2RdfG\nDntVoXTpMQKBgQC8LSQx63cC/A4mgHnjFd0AvfqvPpsqIZh7zwPEFa2LDd6ejwOz\non653kjb/favbubIGjM8pzmzSsvJ1Fl2LrSWdnGhcoJ+1++pdUDTRyBpmQbJr7qs\nj5WkyW02UoCP/RPsuK9yh2F97IB52ErDEgRj1QJyDMyKGzHDrdLJeQ+kgwKBgHfB\nZV7MPtMgGtSaab44AzACQiwSGfGlqJhi5rn47ARbSRWD2zG99le4mMbIc3Iy5f3T\nDva/Hy779OnQqqoHRXb04JyuzAQY+59A4HMMQSbcHip6dMQa8OOAw7/yYhnsoKPb\n6AOElNVPNv2m7SsiBtKswMLcJ0AUi2v8+U28aGmhAoGAf9Cy7hwIwUmuN/tlq5Jn\nSl0wtAHJ3PvJdToGpTCJJnyyt+DYh9LMlqCdd9sFUR+iIBPLONV6eYiRqDtqGevK\nDCOLTTJMMuMv9IQlmaPHmjMLy548xhKXDYZSj317zqnbQAcXxdYmuflZNCvwV0CI\nR7jGJz9LKi4umLKbC0qgM7o=\n-----END PRIVATE KEY-----\n",
    "client_email": "ictac-bot@chat-bot-aphy.iam.gserviceaccount.com",
    "client_id": "103023898115847215892",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/ictac-bot%40chat-bot-aphy.iam.gserviceaccount.com"
  }
  ;

const PROJECID = CREDENTIALS.project_id;

const CONFIGURATION = {
    credentials: {
        private_key: CREDENTIALS.private_key,
        client_email: CREDENTIALS.client_email
    }
}

const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);

const detectIntent = async (languageCode, queryText, sessionId) => {

    let sessionPath = sessionClient.projectAgentSessionPath(PROJECID, sessionId);

    let request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: queryText,
                languageCode: languageCode,
            },
        },
    };

    console.log(request);

    try {
        const responses = await sessionClient.detectIntent(request);
        const result = responses[0].queryResult;
        return {
            status: 1,
            text: result.fulfillmentText,
            parameters: responses[0].queryResult.parameters
        };
    } catch (error) {
        console.log(`Error at dialogflow-api.js detectIntent --> ${error}`);
        return {
            status: 0,
            text: 'Error at dialogflow detect intent.'
        };
    }
};

module.exports = {
    detectIntent
};