import React from 'react';
import {coloured} from '../components/styled/custom-themes';
import { DefaultTheme } from 'styled-components';


/**
 * Type for the .repo subobject of the data sets
 * retrieved from the web API
 */
export type RepoDescription = {
  name: string,
  description: string,
  url: string
}

/**
 * Type for the whole data sets
 * retrieved from the web API
 */
export type DevInfo = {
  id?: string,
  name: string,
  username: string,
  type: string,
  url: string,
  avatar: string,
  repo: RepoDescription,
  theme: DefaultTheme,
}

/**
 * Interface for the default context and root state
 */
export interface ITrendingDevData {
  themes: string[],
  theme: DefaultTheme,
  languages: string[],
  language: string,
  loading: boolean,
  listData: DevInfo[],
  times: string[],
  timespan: string,
  activeDisplay: HTMLElement | null,
  switchLanguage: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  switchTimespan: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  switchTheme: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  switchActiveDisplay: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

/**
 * The default context, providing the values of the root state
 */
export const trendingDevData: ITrendingDevData = {
  themes: ['coloured', 'grayscale'],
  theme: coloured,
  languages: ['Ruby', 'JavaScript', 'Python'],
  language: 'Ruby',
  loading: true,
  listData: [],
  times: ['monthly', 'weekly', 'daily'],
  timespan: 'monthly',
  activeDisplay: null,
  switchLanguage: () => { },
  switchTimespan: () => { },
  switchTheme: () => { },
  switchActiveDisplay: () => { }
}

export const TrendingDevContext = React.createContext(trendingDevData);