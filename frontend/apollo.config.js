module.exports = {
  client: {
    service: {
      name: 'backend',
      url: 'http://localhost:4000/graphql',
    },
    includes: ['./src/**/*.tsx'],
    tagName: 'gql',
  }
};