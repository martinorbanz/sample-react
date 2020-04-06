import React, { Component } from "react";
import styled, { StyledComponent, DefaultTheme } from 'styled-components';
import { TrendingDevContext, ITrendingDevData } from '../contexts/TrendingDevContext'

/**
 * Contains and handles the dropdown menus for selecting
 * the programmig language and trending time to be displayed 
 * as well the color scheme.
 */

export class DevParamSwitcher extends Component<ITrendingDevData> {

  ToolbarStyles: StyledComponent<"div", DefaultTheme, {}, never>;

  constructor(props: Readonly<ITrendingDevData>) {
    super(props);

    this.ToolbarStyles = styled.div`
    div.toolbar {
      display: flex;
      justify-content: space-around;

      label {
        font-family: ${props => props.theme.fonts.text};
        font-size: smaller;
      }
    }
  `;
  }

  render() {
    // * All JSX variables are destructured from the state object passed down 
    // * from TrendingDevContext.
    // * HTMLSelectElements are populated by mapping the languages, 
    // * times and themes arrays from ITrendingDevData to Option elements.
    return (
      <this.ToolbarStyles>
        <TrendingDevContext.Consumer>
          {({ languages,
            switchLanguage,
            times,
            switchTimespan,
            themes,
            switchTheme
          }) => (
              <div className="toolbar">
                {/* language selection  */}
                <div>
                  <label htmlFor="select-language">Prog. language:</label><br />
                  <select name="select-language" onChange={switchLanguage}>
                    {languages.map((lang, index) => (
                      <option
                        key={index}
                        value={lang}
                      >{lang}</option>
                    ))}
                  </select>
                </div>
                {/* trending time selection */}
                <div>
                  <label htmlFor="select-timespan">Time span:</label><br />
                  <select name="select-timespan" onChange={switchTimespan}>
                    {times.map((time, index) => (
                      <option
                        key={index}
                        value={time.toLowerCase()}
                      >{time}</option>
                    ))}
                  </select>
                </div>
                {/* color scheme selection */}
                <div>
                  <label htmlFor="select-timespan">Display theme:</label><br />
                  <select name="select-timespan" onChange={switchTheme}>
                    {themes.map((theme, index) => (
                      <option
                        key={index}
                        value={theme.toLowerCase()}
                      >{theme}</option>
                    ))}
                  </select>
                </div>
              </div>
            )
          }
        </TrendingDevContext.Consumer>
      </this.ToolbarStyles>
    );
  }
}