import { UserInputError } from 'apollo-server';
import axios from 'axios';
import { Speaker, SpeakerInput } from '../../interfaces';

const resolvers = {
  // Query Resolvers
  Query: {
    speakers: async () => {
      const response = await axios.get('http://localhost:5000/speakers');
      return {
        datalist: response.data,
      };
    },
  },

  // Mutation Resolvers
  Mutation: {
    toggleSpeakerFavorite: async (
      _: any,
      args: { speakerId: number }
    ): Promise<Speaker | null> => {
      const response = await axios.get(
        `http://localhost:5000/speakers/${args.speakerId}`
      );
      const speaker: Speaker = response.data;
      speaker.favorite = !speaker.favorite;

      await axios.put(
        `http://localhost:5000/speakers/${args.speakerId}`,
        speaker
      );

      return speaker;
    },
    addSpeaker: async (
      _: any,
      args: { speaker: SpeakerInput }
    ): Promise<Speaker | null> => {
      const { first, last, favorite } = args.speaker;

      const { data: speakersData } = await axios.get(
        'http://localhost:5000/speakers'
      );

      const foundSpeaker = speakersData.find(
        (speaker: Speaker) => speaker.last === last && speaker.first === first
      );

      if (foundSpeaker) {
        throw new UserInputError('user already exits');
      }

      const resp = await axios.post('http://localhost:5000/speakers', {
        first,
        last,
        favorite,
      });

      return resp.data;
    },
    deleteSpeaker: async (
      _: any,
      args: { speakerId: number }
    ): Promise<Speaker | null> => {
      const url = `http://localhost:5000/speakers/${args.speakerId}`;
      const resp = await axios.get(url);
      await axios.delete(url);
      return resp.data;
    },
  },
};

export { resolvers };
