import styled from 'styled-components'

const StyledApiItem = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  // width: 100%;
  padding-bottom: 5em;
  padding-top: 3.5em;
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
    border-bottom: 1px solid rgba(10,10,10, .7);
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
    font-size: 1.5em;
    color: #000;
    font-weight: 400;
    font-family: ${props => props.theme.typography.fontFamilyRegular};

    &.small-title {
      font-size: 1.3em;
      margin-top: 40px;
    }
  }

  .table-container {
    display: flex; // keeps from taking up all space
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
    // flex: 4;
    width: 40%;
    background: ${props => props.theme.dark};
    color: #fff;
    // width: ${props => props.theme.rightColumnWidth};
    // width: calc(40% - 130px);
    z-index: 2;
    overflow-x: auto;
    // border-bottom: 1px solid rgba(16,16,16, .4);

    .response-header {
      color: #fff;
      font-weight: 600;
      margin-bottom: 1em;
    }

    .response-visualizations {
      min-height: 4em;
    }
  }
  .api-responses {
    padding-bottom: 10px;
  }

  .api-method-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #11171A;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 4px;
    cursor: pointer;
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

export default StyledApiItem;

