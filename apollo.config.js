module.exports = {
  client: {
    includes: ['./src/**/*.tsx'],
    tagName: 'gql',
    service: {
      name: 'd-ver-backend',
      url: 'http://localhost:4000/graphql',
    },
  },
};
