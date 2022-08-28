import { gql } from 'apollo-server';

const typeDefs = gql`
  directive @upper on FIELD_DEFINITION

  type Speaker {
    id: ID!
    twitterHandle: String
    company: String
    bio: String
    first: String
    last: String
    favorite: Boolean
  }

  type SpeakerResults {
    datalist: [Speaker]
  }

  type Query {
    speakers: SpeakerResults
  }

  input SpeakerInput {
    first: String
    last: String
    favorite: Boolean
  }

  type Mutation {
    toggleSpeakerFavorite(speakerId: Int!): Speaker
    addSpeaker(speaker: SpeakerInput!): Speaker
    deleteSpeaker(speakerId: Int!): Speaker
  }
`;

export { typeDefs };
