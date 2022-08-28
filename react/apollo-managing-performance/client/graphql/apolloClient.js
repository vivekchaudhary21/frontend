import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';

const currentThemeVar = makeVar('dark');
const checkBoxListVar = makeVar([]);

const cacheOptions = {
  typePolicies: {
    Speaker: {
      fields: {
        fullName: {
          read: function (_, { readField }) {
            return `${readField('first')} ${readField('last')}`;
          },
        },
        checkBoxColumn: {
          read: function (_, { readField }) {
            const id = readField('id');
            const selectedSpeakersIds = checkBoxListVar();
            return selectedSpeakersIds
              ? selectedSpeakersIds.includes(id)
              : false;
          },
        },
      },
    },
  },
};

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(cacheOptions),
});

export { apolloClient, currentThemeVar, checkBoxListVar };
