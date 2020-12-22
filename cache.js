const {DynamoDB} = require('aws-sdk');
const dynamoDbClient = new DynamoDB.DocumentClient();
const md5 = require('md5');
const CACHE_TABLE = process.env.CACHE_TABLE;
const TTL = process.env.TTL;

/*
* get cache by using md5 hash of url as id.
*/
const getCache = async (url) => {
    const params = {
        TableName: CACHE_TABLE,
        Key: {
            id: md5(url)
        },
    };
    try {
        const {Item} = await dynamoDbClient.get(params).promise();
        return Item
    } catch (e) {
        console.error(e);
    }
};

/*
* set cache by using md5 hash of url as id.
* cache set to expire based on ttl value.
*/
const setCache = async (url, payload) => {
    const params = {
        TableName: CACHE_TABLE,
        Item: {
            id: md5(url),
            ...payload,
            ttl: Math.floor(Date.now() / 1000) + Number(TTL)
        },
    };
    try {
        await dynamoDbClient.put(params).promise();
    } catch (e) {
        console.error(e);
    }

};

module.exports = {
  getCache,
  setCache
};
