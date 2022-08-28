export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  addSpeaker?: Maybe<Speaker>;
  toggleSpeakerFavorite?: Maybe<Speaker>;
};


export type MutationAddSpeakerArgs = {
  speaker: SpeakerInput;
};


export type MutationToggleSpeakerFavoriteArgs = {
  speakerId: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  speakers?: Maybe<SpeakerResults>;
};

export type Speaker = {
  __typename?: 'Speaker';
  bio?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  favorite?: Maybe<Scalars['Boolean']>;
  first?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  last?: Maybe<Scalars['String']>;
  twitterHandle?: Maybe<Scalars['String']>;
};

export type SpeakerInput = {
  favorite?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['String']>;
};

export type SpeakerResults = {
  __typename?: 'SpeakerResults';
  datalist?: Maybe<Array<Maybe<Speaker>>>;
};
