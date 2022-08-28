import React from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';

import Toolbar from './Toolbar';
import { GET_SPEAKERS, currentThemeVar } from '../graphql';
import SpeakerItem from './SpeakerItem';

const IndexPage = () => {
  const currentTheme = useReactiveVar(currentThemeVar);
  const { loading, error, data } = useQuery(GET_SPEAKERS);

  if (loading) return <div className=''>Loading...</div>;
  if (error === true) return <div className='col-sm6'>Error</div>;

  return (
    <>
      <Toolbar />
      <div className='container show-fav'>
        <div className='row'>
          <div
            className={currentTheme === 'dark' ? 'fav-list dark' : 'fav-list'}
          >
            {data.speakers.datalist.map(
              ({ id, first, last, favorite, fullName, checkBoxColumn }) => {
                return (
                  <SpeakerItem
                    key={id}
                    speakerRec={{
                      id,
                      first,
                      last,
                      favorite,
                      fullName,
                      checkBoxColumn,
                    }}
                  ></SpeakerItem>
                );
              }
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
