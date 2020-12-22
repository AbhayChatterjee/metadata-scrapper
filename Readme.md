# Metadata Scrapper

A simple metadata scrapper using **Serverless** and **Apollo GraphQL server**.

Scraps the open graph properties from the provided url (fall back to raw meta tags to get values).

Uses **AWS Lambda** & **API Gateway** for deployment and **DynamoDB** as a simple cache (default ttl: 300 seconds)  


### Next Steps

- Could be extended to create a metadata crawler to index websites.
- A standalone tool to provide SEO insights, by adding a React js / Angular based web dashboard.

### Prerequisites

- NodeJs.
- AWS CLI (For Deployment).    

### Setup

- Clone the repository to your dev environment

- Install dependencies
```bash
    npm install
```

- Run tests using Jest
```bash
    npm run test
```

- Deploy to AWS
```bash
    npm run deploy
```

- Use graphql playground or postman to run queries to the scrapper.
```graphql
{
    getOgMetadata(url: "http://example.com") {
        ogTitle
        ogDescription
        ogKeywords
        ogImages
        ogType
        ogSiteName
    }
}
```
