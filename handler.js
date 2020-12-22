const { ApolloServer,ApolloError} = require('apollo-server-lambda');
const rp = require('request-promise');
const {typeDefs} = require('./typeDefs');
const {getTitle, getDescription, getKeywords, getImages, getType, getSiteName} = require('./scrapper');
const {getCache, setCache} = require('./cache');

const resolvers = {
    Query: {
        async getOgMetadata(parent, {url}) {
            try {
                // checking cache for data availability.
                let payload = await getCache(url);
                if (payload) return payload;

                // scraping data from url.
                const html = await rp(url);
                payload = {
                    ogTitle: getTitle(html),
                    ogDescription: getDescription(html),
                    ogImages: getImages(html),
                    ogKeywords: getKeywords(html),
                    ogType: getType(html),
                    ogSiteName: getSiteName(html),
                };

                // populating cache with data before returning response.
                await setCache(url, payload);
                return payload;
            } catch (e) {
                console.error(e);
                return new ApolloError(e.message)
            }
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    // graphql playground support added for ease of testing.
    playground: {
        endpoint: "/dev"
    }
});

exports.graphqlHandler = server.createHandler({
    // cors support added
    cors: {
        origin: '*',
        credentials: true,
    },
});
