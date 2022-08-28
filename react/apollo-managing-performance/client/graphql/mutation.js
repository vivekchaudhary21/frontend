import { gql } from '@apollo/client';

const TOGGLE_SPEAKER_FAVORITE = gql`
  mutation ToggleSpeakerFavorite($speakerId: Int!) {
    toggleSpeakerFavorite(speakerId: $speakerId) {
      id
      favorite
      first
      last
    }
  }
`;

const DELETE_SPEAKER = gql`
  mutation DeleteSpeaker($speakerId: Int!) {
    deleteSpeaker(speakerId: $speakerId) {
      id
      favorite
      first
      last
    }
  }
`;

const ADD_SPEAKER = gql`
  mutation AddSpeaker($speaker: SpeakerInput!) {
    addSpeaker(speaker: $speaker) {
      id
      favorite
      first
      last
    }
  }
`;

export { TOGGLE_SPEAKER_FAVORITE, DELETE_SPEAKER, ADD_SPEAKER };
