import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Import Actions
import { toggleAddPost, fetchChartData } from './AppActions';
import { switchLanguage } from '../../modules/Intl/IntlActions';

import Chart1 from './components/Chart1/Chart1';
import Chart2 from './components/Chart2/Chart2';
import Chart3 from './components/Chart3/Chart3';
import Chart4 from './components/Chart4/Chart4';
import Chart5 from './components/Chart5/Chart5';
import Chart6 from './components/Chart6/Chart6';
import Chart7 from './components/Chart7/Chart7';
import Chart8 from './components/Chart8/Chart8';
import Chart9 from './components/Chart9/Chart9';
import Chart10 from './components/Chart10/Chart10';
import Chart11 from './components/Chart11/Chart11';
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false , currentChart: 0};
    this.props.dispatch(fetchChartData());
  }

  componentDidMount() {
    this.setState({isMounted: true , currentChart: 0}); // eslint-disable-line
  }

  toggleAddPostSection = () => {
    this.props.dispatch(toggleAddPost());
  };

  switchChart = (nCurrentChart) => {
    this.setState({currentChart: nCurrentChart});
  };


  render() {
    return (
      <div className={styles.appContainer}>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <div>
          <Helmet
            title="MERN Starter - Blog App"
            titleTemplate="%s - Blog App"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          <Header
            switchLanguage={lang => this.props.dispatch(switchLanguage(lang))}
            intl={this.props.intl}
            toggleAddPost={this.toggleAddPostSection}
          />
          <ul className={styles.chartMenu}>
            <li><p onClick={() => this.switchChart(1)}>Chart1</p></li>
            <li><p onClick={() => this.switchChart(2)}>Chart2</p></li>
            <li><p onClick={() => this.switchChart(3)}>Chart3</p></li>
            <li><p onClick={() => this.switchChart(4)}>Chart4</p></li>
            <li><p onClick={() => this.switchChart(5)}>Chart5</p></li>
            <li><p onClick={() => this.switchChart(6)}>Chart6</p></li>
            <li><p onClick={() => this.switchChart(7)}>Chart7</p></li>
            <li><p onClick={() => this.switchChart(8)}>Chart8</p></li>
            <li><p onClick={() => this.switchChart(9)}>Chart9</p></li>
            <li><p onClick={() => this.switchChart(10)}>Chart10</p></li>
            <li><p onClick={() => this.switchChart(11)}>Chart11</p></li>
          </ul>
          { this.state.currentChart == 0 && <div className={styles.container}> {this.props.children} </div>}
          {this.state.currentChart == 1 && this.props.isChartDataLoaded && <Chart1 data={this.props.data}/>}
          {this.state.currentChart == 2 && this.props.isChartDataLoaded && <Chart2 data={this.props.data}/>}
          {this.state.currentChart == 3 && this.props.isChartDataLoaded && <Chart3 data={this.props.data}/>}
          {this.state.currentChart == 4 && this.props.isChartDataLoaded && <Chart4 data={this.props.data}/>}
          {this.state.currentChart == 5 && this.props.isChartDataLoaded && <Chart5 data={this.props.data}/>}
          {this.state.currentChart == 6 && this.props.isChartDataLoaded && <Chart6 data={this.props.data}/>}
          {this.state.currentChart == 7 && this.props.isChartDataLoaded && <Chart7 data={this.props.data}/>}
          {this.state.currentChart == 8 && this.props.isChartDataLoaded && <Chart8 data={this.props.data}/>}
          {this.state.currentChart == 9 && this.props.isChartDataLoaded && <Chart9 data={this.props.data}/>}
          {this.state.currentChart == 10 && this.props.isChartDataLoaded && <Chart10 data={this.props.data}/>}
          {this.state.currentChart == 11 && this.props.isChartDataLoaded && <Chart11 data={this.props.data}/>}
          <Footer />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
    data: store.app.chartData,
    isChartDataLoaded: store.app.isChartDataLoaded,
  };
}

export default connect(mapStateToProps)(App);
