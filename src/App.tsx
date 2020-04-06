import React from 'react';
import {coloured, grayscale} from './components/styled/custom-themes';
import { ITrendingDevData, TrendingDevContext, trendingDevData } from './contexts/TrendingDevContext';
import { TrendingDevList } from './components/TrendingDevList';
import { ThemeProvider } from 'styled-components';

/**
 * The App class handles the origin of truth 
 * and state changes as usual, and also gets 
 * the remote data. Availability of fetch() 
 * is expected.
 * 
 * Theming data is passed to children via props.
 * 
 * For demo purposes everything is kept straightforward
 * and only one context is used.
 */
export class App extends React.Component {

  state: ITrendingDevData;

  constructor(props: Readonly<{}>) {
    super(props);
    this.switchActiveDisplay = this.switchActiveDisplay.bind(this);
    this.switchLanguage = this.switchLanguage.bind(this);
    this.switchTimespan = this.switchTimespan.bind(this);
    
    /**
     * Init state combining all static properties from trendingDevData 
     * with method implementations defined in this class.
     */
    this.state = {
      themes: trendingDevData.themes,
      theme: trendingDevData.theme,
      languages: trendingDevData.languages,
      language: trendingDevData.language,
      listData: trendingDevData.listData,
      loading: trendingDevData.loading,
      times: trendingDevData.times,
      timespan: trendingDevData.timespan,
      activeDisplay: null,
      switchActiveDisplay: this.switchActiveDisplay,
      switchLanguage: this.switchLanguage,
      switchTheme: this.switchTheme,
      switchTimespan: this.switchTimespan
    };
  }

  componentDidMount() {
    this.fetchData(this.state.language, this.state.timespan);
  }
  
  /**
   * Parses and fetches the query for developer infos 
   * in the passed programming language and time span
   * (selectable in the ui).
   * Display states are reset before fetching.
   * 
   * @param language 
   * @param timespan 
   */
  fetchData(language: string, timespan: string) {
    this.setState({
      loading: true,
      activeDisplay: null
    });
    try {
      fetch(`http://localhost:5000/trending-devs?language=${language}&since=${timespan}`)
        .then(
          (response) => {
            return response.json();
          }
        )
        .then(
          (result) => {
            this.setState({
              loading: false,
              listData: result,
              language: language,
              timespan: timespan
            })
          },
          (reason) => {
            alert(reason);
          }
        )
        .catch((error) => {
          alert(error);
        })
    } catch (error) {
      console.log(error);
    }
  }
  
  /**
   * Fetches data upon selection of a programming language.
   * 
   * @param event
   */
  switchLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let select: HTMLSelectElement = event.currentTarget as HTMLSelectElement,
        language: string = select.selectedOptions[0].value;

    this.fetchData(language, this.state.timespan); 
  }
  
  /**
   * Fetches data upon selection of a trending time span.
   * 
   * @param event
   */
  switchTimespan = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const select: HTMLSelectElement = event.currentTarget as HTMLSelectElement,
          timespan: string = select.selectedOptions[0].value;
    
    this.fetchData(this.state.language, timespan);
  }
  
  /**
   * Switches the app color scheme throughout styled components.
   * 
   * @param event
   */
  switchTheme = (event: React.ChangeEvent<HTMLSelectElement>) => {

    // * the dictionary object is typed as any in regard to readability in this demo
    const dictionary: any = {
      coloured: coloured,
      grayscale: grayscale
    }

    const select: HTMLSelectElement = event.currentTarget as HTMLSelectElement;
    
    let themeName: string;
    
    // * read the theme from dictionary to state by using the 
    // * selected option's value string as property name
    for (let prop in dictionary) {
      themeName = select.selectedOptions[0].value
      if (dictionary.hasOwnProperty(prop) && prop === themeName) {
        this.setState({theme: dictionary[themeName]});
      }
    }
  }

  /**
   * Sets the state for the currently selected/deselected 
   * SingleDevDisplay instance, causing it to unfold/fold
   * 
   * @param event
   */
  switchActiveDisplay = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    this.state.activeDisplay !== event.currentTarget
    ? this.setState({activeDisplay: event.currentTarget})
    : this.setState({activeDisplay: null});
  }

  render() {
    return (
      <ThemeProvider theme={this.state.theme}>
      <TrendingDevContext.Provider value={this.state}>
        <TrendingDevList {...this.state}></TrendingDevList>
      </TrendingDevContext.Provider>
      </ThemeProvider>
    );
  }
}

export default App;
