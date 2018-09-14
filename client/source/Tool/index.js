import React, { Component } from 'react';
import { select, selectAll } from 'd3';
import ReactJson from 'react-json-view'
// modules of the viz
import Context from './modules/context';
import Focus from './modules/focus';
import Alignment from './modules/alignment';

import './style.scss'

const body = document.body;
const html = document.documentElement;

const height = Math.max(
  body.scrollHeight,
  body.offsetHeight,
  html.clientHeight,
  html.scrollHeight,
  html.offsetHeight
);

export default class Tool extends Component {
  constructor(props) {
    super(props);
    this.contextChart;
    this.focusChart;
    this.alignmentChart;
    this.clickOnRect = this.clickOnRect.bind(this);
    this.state = { secOnSelection: [], typeSelection: null, posSelection: null };
  }

  clickOnRect(position, type, seqs) {
    this.setState({
      posSelection: position,
      typeSelection: type,
      secOnSelection: seqs
    });
  }

  generateViz(gData, entropyData) {
    this.contextChart = new Context('#brush-container');
    this.focusChart = new Focus('#overview-container');
    this.alignmentChart = new Alignment('#alignment-container', this.clickOnRect);

    this.contextChart.render(entropyData);
    this.focusChart.render(entropyData);
    this.alignmentChart.render(gData);
  }

  componentWillUnmount() {
    this.contextChart.unmountViz();
    this.focusChart.unmountViz();
    this.alignmentChart.unmountViz();
    selectAll('svg').remove();
  }

  componentDidMount() {
    this.generateViz(this.props.data[0], this.props.data[1]);
  }

  render() {
    return (
      <div id="main-container">
        <div className="context-main">
          <h4 className="subheadings">Sequence overview</h4>
          <div id="brush-container" />
        </div>
        <div className="focus-main">
          <h4 className="subheadings">Filtered range</h4>
          <div id="overview-container" />
        </div>
        <div className="alignment-main">
          <div id="alignment-container" />
        </div>
        <div className="alignment-selection">
          <ReactJson
            src={this.state.secOnSelection}
            collapsed={false}
            displayDataTypes={false}
            iconStyle="square"
            name={this.state.typeSelection ? `${this.state.typeSelection}_${this.state.posSelection}` : 'selected'}
          />
        </div>
      </div>
    );
  }
}
