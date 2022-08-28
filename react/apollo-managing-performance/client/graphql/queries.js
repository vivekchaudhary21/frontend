import { gql } from '@apollo/client';

const GET_SPEAKERS = gql`
  query Speakers {
    speakers {
      datalist {
        id
        favorite
        first
        last
        fullName @client
        checkBoxColumn @client
      }
    }
  }
`;

export { GET_SPEAKERS };
