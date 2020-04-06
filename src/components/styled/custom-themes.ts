import {DefaultTheme} from 'styled-components';

/**
 * Theme definitions to be used with styled-components 
 * and ThemeProvider
 */

const ci = {
  color1: '#062035',
  color2: '#e4833e',
  mainText: '#666' 
}

export const coloured: DefaultTheme = {
  fonts: {
    general: 'Lato, Roboto, Helvetica, Arial, sans-serif',
    heading: 'Lato, Roboto, Helvetica, Arial, sans-serif',
    text: 'Lato, Roboto, Helvetica, Arial, sans-serif'
  },
  colors: {
    bodyBG: ci.color1,
    main: ci.mainText,
    mainBG: 'aliceblue',
    dev: 'white',
    devBG: ci.color2,
    devBorder: ci.color2,
    devInfoKey: ci.color2
  },
  avatar: {
    maxSize: '3em',
    borderStyle: 'none',
    borderRadius: '50%',
    filter: 'none'
  },
  shadows: {
    box: 'none'
  }
}

export const grayscale: DefaultTheme = {
  fonts: {
    general: 'Lora, Georgia, Times New Roman, serif',
    heading: 'Lato, Source Sans Pro, Ubuntu, sans-serif', 
    text: 'Lora, Georgia, Times New Roman, serif'
  },
  colors: {
    bodyBG: ci.color1,
    main: ci.mainText,
    mainBG: '#fdfdfd',
    dev: '#333',
    devBG: 'white',
    devBorder: 'none',
    devInfoKey: ci.mainText
  },
  avatar: {
    maxSize: '3em',
    borderStyle: 'none',
    borderRadius: '3px',
    filter: 'grayscale(1)'
  },
  shadows: {
    box: '4px 4px 10px #666'
  }
}
