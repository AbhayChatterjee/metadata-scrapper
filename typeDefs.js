const { gql } = require('apollo-server-lambda');

exports.typeDefs = gql`
  "Response schema for the scrapper" 
  type Response {
    "Url title or the site title"
    ogTitle: String
    "Url description or the site description"
    ogDescription: String
    "Keyword(s) present in the metadata for the url"
    ogKeywords: [String]
    "Image(s) present in the og metadata for the url"
    ogImages: [String]
    "Type of url: website, article, etc"
    ogType: String
    "Name of the website the url belongs to."
    ogSiteName: String
  } 

  type Query {
    getOgMetadata(url: String): Response! 
  }
`;
