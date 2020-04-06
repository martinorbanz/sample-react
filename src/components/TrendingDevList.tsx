import React, { Component } from 'react';
import styled, { StyledComponent, DefaultTheme } from 'styled-components';
import { TrendingDevContext, DevInfo, ITrendingDevData } from '../contexts/TrendingDevContext'
import { coloured } from './styled/custom-themes';
import { DevParamSwitcher } from './DevParamSwitcher';
import { SingleDevDisplay } from './SingleDevDisplay';

/**
 * Builds a list of SingleDevDisplay objects by mapping 
 * the root state's listData array as soon as it is ready.
 * Also contains the DevParamSwitcher toolbar for selections.
 */

export class TrendingDevList extends Component<ITrendingDevData> {

  DevListStyles: StyledComponent<"div", DefaultTheme, {}, never>;

  constructor(props: Readonly<ITrendingDevData>) {
    super(props);

    this.DevListStyles = styled.div`
      background-color: ${props => props.theme.colors.mainBG};
      color: #666;
      border-radius: 1rem;
      margin: 2em;
      padding: 2rem;
      box-sizing: border-box;
      width: 75%;
      max-width: 768px;

      h2 {
        font-weight: ${props => props.theme === coloured ? '400' : '300'}
      }

      .single-dev-display:first-of-type {
        margin-top: 10px;
      }
      
      .single-dev-display:last-of-type {
        margin-bottom: 0;
      }

      .hint {
        font-size: smaller;
        text-align: right;
      }

      @media screen and (max-width: 768px) {
        border-radius: 0;
        margin: 0;
        width: 100%;
      }
    `;
  }


  render() {
    return (
      <this.DevListStyles>
        <TrendingDevContext.Consumer>
          {state => (
            <section className="trending-dev-list">
              <h2>These are GitHub's trending Devs for: {state.language}</h2>
              {/* the troolbar ... */}
              <DevParamSwitcher {...state} />
              <p className="hint">
              {state.loading
                  ? ''
                  : 'click a name for details'}
              </p>
              {/* ... and listed devs */}
              <div>
                {/* display developer infos if available */}
                {state.loading
                  ? <p>loading...</p>
                  : state.listData.map((item: DevInfo, index: number) => {
                    return (
                      <SingleDevDisplay
                        key={index}
                        id={`dev-${index}`}
                        theme={state.theme}
                        {...item}
                      />
                    );
                  })
                }
              </div>
            </section>
          )}
        </TrendingDevContext.Consumer>
      </this.DevListStyles>
    );
  }
}
TrendingDevList.contextType = TrendingDevContext;