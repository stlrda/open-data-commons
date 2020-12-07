import styled from 'styled-components'

const StyledApiItem = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  // width: 100%;
  padding-top: 3em;
  padding-bottom: 2em;
  z-index: 1;

  &:first-child {
    padding-top: 2em;
  }

  &::after {
    position: absolute;
    width: 100%;
    display: block;
    content: "";
    bottom: 0;
    border-bottom: 1px solid rgba(33,33,33, .43);
    // border-bottom: 1px solid rgba(17,23,26);
  }
  &:last-child {
    &::after {
      border-bottom: 0;
      display: none;
    }
  }

  .section-header-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1.75em;
    color: #000;
    font-weight: 400;
    font-family: ${props => props.theme.typography.fontFamilyRegular};

    &.small-title {
      font-size: 1.35em;
      margin-top: 40px;
    }
  }

  .table-container {
    display: flex; // keeps from taking up all space
    // overflow-y: auto;
    margin-top: 25px !important;

    &.expanded {
      height: initial; //100% or auto
    }
  }

  .section-header-description {}

  .subsection-header {
    margin-top: 1em;
    margin-bottom: 1em;

    .subsection-header-title {
      margin-bottom: 0;
      margin-top: 1.5em;
      font-size: .95em;
      line-height: 1em;
      text-transform: uppercase;
      color: rgba(38, 50, 56, 0.5);
    }
  }

  .required-text {
    color: ${props => props.theme.red};
    font-size: 12px;
  }

  .api-item-html-table {
    margin-bottom: 40;
    width: 100%;

    .parameter-name-column {
      display: flex;
      flex-direction:column;
      min-width: 110px;
    }
    .parameter-datatype-column {
      width: 75%;
    }
  }

  .api-item-left {
    padding-right: 40px;
    padding-left: 40px;
    width: 60%;
    overflow-x: auto;
  }

  .api-item-right {
    padding-top: 1em;
    padding-bottom: 1em;
    padding-left: 1em;
    padding-right: 1em;
    width: 40%;
    // background: ${props => props.theme.dark};
    color: #fff;
    // width: ${props => props.theme.rightColumnWidth};
    // width: calc(40% - 130px);
    z-index: 2;
    overflow-x: auto;

    .api-method-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: ${props => props.theme.darkest};
      padding: 10px;
      margin-bottom: 15px;
      border-radius: 4px;
      cursor: pointer;
    }

    .response-header {
      color: #fff;
      font-weight: 600;
      margin-bottom: 1em;
    }

    .response-visualizations {
      min-height: 4em;
    }

    .response-results {


    }
  }

  .api-responses {
    padding-bottom: 10px;
  }

  .endpoint-http-text {
    text-transform: uppercase;
    font-weight: 500;
    margin-right: 8px;
  }
  .endpoint-path-text {
    font-family: sans-serif;
    line-height: 1em;
    font-size: .93em;
    opacity: .85;
    letter-spacing: 1px;
  }
  .method-responses {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }
  .method-response-tag {
    margin-right: 6px;
    cursor: pointer;
  }
  .api-execute-button-bar {
    margin-top: .9em;
    padding-left: 25%;
    display: flex;
    flex-direction: row;
    align-items: center;
    // justify-content: center;

    &.no-params {
      padding-left: 0;
    }

    .api-execute-button {
      margin-right: 10px;
    }
  }

  @media(max-width: ${props => props.theme.breakpoints.medium}) {
    flex-direction: column;
    padding-bottom: 0;
    padding-top: 0;

    .api-item-left {
      width: 100%;
      padding: 40px;
    }
    .api-item-right {
      width: 100%;
      padding: 40px;
    }
  }
  @media(max-width: ${props => props.theme.breakpoints.small}) {
    &:first-child {
      .api-item-left {
        padding-top: 0;
      }
    }
  }
`

export const ResponseItem_Styled = styled.div`
  &.response-result-item {
    display: flex;
    flex-direction: row;
    // align-items: center;
    flex-wrap: wrap;
    margin-bottom: 5px;

    .response-result-item-index {
      margin-right: 12px;
      font-size: 1.15em;
      line-height: 1.3em;
      padding-top: calc(.1em + 5px);
      padding-bottom: calc(.1em + 5px);
    }
    .response-result-item-inner {
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      background-color: ${props => props.theme.darkest};
      padding: 10px;
      font-size: .95em;
      line-height: 1.1em;
      font-family: sans-serif;
      border-radius: 5px;
      cursor: pointer;

      &.response-item-response {
        cursor: initial;
        margin-top: 2px;
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
        border-left: 1px solid rgba(245,245,245,.9);
      }
    }
  }
`

export default StyledApiItem;

