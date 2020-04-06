import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    
    fonts: {
      general: string
      heading: string
      text: string
    }

    colors: {
      bodyBG: string
      main: string
      mainBG: string
      dev: string
      devBG: string
      devBorder: string
      devInfoKey: string
    }

    avatar: {
      maxSize: string
      borderStyle: string
      borderRadius: string
      filter: string
    }

    shadows: {
      box: string
    }
  }
}