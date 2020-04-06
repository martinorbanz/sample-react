import React, { Component } from 'react';
import styled, { DefaultTheme, StyledComponent } from 'styled-components';
import { coloured } from './styled/custom-themes'
import { TrendingDevContext, DevInfo } from '../contexts/TrendingDevContext';

/**
 * The idividual developers' information display.
 * An instance sets itself as the activeDisplay (root state) 
 * when clicked and unfolds once the activeDisplay matches itself.
 */

export class SingleDevDisplay extends Component<DevInfo> {

  DevDisplayStyles: StyledComponent<"article", DefaultTheme, {}, never>;

  constructor(props: Readonly<DevInfo>) {
    super(props);
    
    this.DevDisplayStyles = styled.article`
      border: ${props => props.theme.colors.devBorder} 3px solid;
      border-radius: ${props => props.theme === coloured ? '8px' : '4px'};
      box-sizing: border-box;
      padding: 0;
      margin-bottom: 5px;
      font-family: ${props => props.theme.fonts.general};
      color: ${props => props.theme.colors.dev};
      background: ${props => props.theme.colors.devBG};
      overflow: hidden;
      box-shadow: ${props => props.theme.shadows.box };

      a, a:active, a:visited {
        color: inherit
      }
      
      .dev-header {
        padding-left: 1rem;
        padding-right: 1rem;
        font-family: ${props => props.theme.fonts.heading};
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .dev-header h3 {
        font-weight: ${props => props.theme === coloured ? '400' : '300'};
      }
      
      .dev-header img {
        max-width: 3em;
        max-height: 3em;
        border-radius: ${props => props.theme.avatar.borderRadius};
        user-select: none;
        filter: ${props => props.theme.avatar.filter};
      }
      
      .dev-details {
        padding: .1px 1rem;
        color: ${props => props.theme.colors.main};
        background: ${props => props.theme.colors.mainBG};
      }

      .key {
        color: ${props => props.theme.colors.devInfoKey};
      }
   `;
  }


  render() {
    return (
      <TrendingDevContext.Consumer>
        {({ activeDisplay, switchActiveDisplay }) => (
          // * onClick is assigned directly to the styled component 
          // * to make everything clickable, rather than doing this 
          // * up the hierarchy in TrendingDevList.
          <this.DevDisplayStyles
            className="single-dev-display"
            onClick={switchActiveDisplay}
            id={this.props.id}>
            {(
              <div>
                {/* Header with user name and avatar image} */}
                <div className="dev-header">
                  <h3>{this.props.username}</h3>
                  {
                    // * the avatar is only shown on selection
                    activeDisplay && activeDisplay.id === this.props.id
                      ? <div><img alt="avatar" src={this.props.avatar} /></div>
                      : ''
                  }
                </div>
                {
                  // * unfold/fold on selection/deselection
                  activeDisplay && activeDisplay.id === this.props.id
                    ? <div className="dev-details">
                      <p>
                        <span className="key">name:</span> {this.props.name}<br />
                        <span className="key">type:</span> {this.props.type ? this.props.type : 'n/a'}<br />
                      </p>
                      <p>
                        <span className="key">repo:</span> <a href={this.props.repo.url} target="_blank" rel="noopener noreferrer">{this.props.repo.name}</a><br />
                        {this.props.repo.description}
                      </p>
                    </div>
                    : ''
                }
              </div>
            )}
          </this.DevDisplayStyles>)}
      </TrendingDevContext.Consumer>
    );
  }
}