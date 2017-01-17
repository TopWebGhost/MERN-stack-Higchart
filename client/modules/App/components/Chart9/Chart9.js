import React, { Component, PropTypes } from 'react';


import styles from './Chart9.css';
import ReactHighcharts from 'react-highcharts';
import convertStringToFloat from '../chartUtils.js'

function exractDate(data) {
  let tempDate = new Date(data);
  return tempDate.getFullYear();
}

export class Chart9 extends Component {
  constructor(props) {
    super(props);
    this.state = { chartData: [] , filterIndex: 0, dates: [], name: []};
  }
  componentDidMount() {
    this.initData();
  }
  initData = () => {
    this.realData = this.props.data.data;
    let projectName = [];
    let categoryName = [];
    let name = [];
    let finalChartData = [];
    let date = [];
//build name
    for(let i = 0; i < this.realData.length; i++) {
      if(!this.realData[i].hasOwnProperty('project') || this.realData[i].project == null) {
        continue;
      }
      let index = projectName.indexOf(this.realData[i].project);
      if(index < 0) {
        projectName[projectName.length] = this.realData[i].project;
      }
    }

//build date
    for(let i = 0; i < this.realData.length; i++) {
      if(!this.realData[i].hasOwnProperty('salesDate') || this.realData[i].salesDate == null) {
        continue;
      }
      let index = date.indexOf(exractDate(this.realData[i].salesDate));
      if(index < 0) {
        date[date.length] = exractDate(this.realData[i].salesDate);
      }
    }

//build chart

    for(let k = 0; k < date.length + 1; k++) {
      let finalCombinedData = [];
      for (let j = 0; j < projectName.length; j ++) {
        let data = [];
        name = [];
        console.log('-----project----- : ', projectName[j]);
        for(let i = 0; i < this.realData.length; i++) {

          if(!this.realData[i].hasOwnProperty('account') || this.realData[i].account == null) {
            continue;
          }
          if(k != 0 && (!this.realData[i].hasOwnProperty('salesDate') || this.realData[i].salesDate == null))
            continue;
          if(k != 0 && this.realData[i].hasOwnProperty('salesDate') && this.realData[i].salesDate != null) {
            if(exractDate(this.realData[i].salesDate) != date[k - 1])
              continue;
          }
          let index = name.indexOf(this.realData[i].account);
          if(index < 0) {
            index = name.length;
            name[index] = this.realData[i].account;
            data[index] = 0;
          }
          if(this.realData[i].hasOwnProperty('project') && this.realData[i].project == projectName[j])
            data[index] += convertStringToFloat(this.realData[i].subscriptionAmount);

          console.log(data[index]);
        }
        finalCombinedData[j] = {name: projectName[j], data:data};
      }
      if(k == 0 )
        categoryName = name;
      finalChartData[k] = finalCombinedData;
    }

    this.setState({chartData: finalChartData, dates: date, name: categoryName});
  }

  filter = (i) => {
    this.setState({filterIndex: i});
  }
  buildFilterList = () => {
    let results = [];
    for(let i = 0; i < this.state.dates.length; i++) {
      results.push(<li><input type='radio' name="filter" onClick={() => this.filter(i+1)}/><p>{this.state.dates[i]}</p></li>);
    }
    return results;
  }

  render() {
    let tempData = this.state.chartData;
    console.log("pre:", tempData, this.state.filterIndex);
    console.log("ok",tempData[this.state.filterIndex]);

    const config = {
      chart: {
        type: 'bar'
      },
      title: {
        text: '<h1 style="font-size: 30px">REP Sales</h1><br><h1 style="color: #828282">BY INVESTORS, PROJECT . REFRESHED: 10/17/2016. 10:38:32 AM</h1>',
        align: 'left',
        y: 40
      },
      xAxis: {
        categories: this.state.name
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        }
      },
      legend: {
        reversed: true,
      },
      plotOptions: {
        series: {
          stacking: 'normal'
        }
      },
      series: this.state.chartData[this.state.filterIndex]
    }

    return (
      <div className={styles.myChart} >
        <ReactHighcharts config = {config}></ReactHighcharts>
        <div className={styles.selectReport}>
          <p>Sales Report Year</p>
          <ul>
            <li><input type="radio"  name="filter" onClick={() => this.filter(0)}/><p>Select All</p></li>
            {this.buildFilterList()}
          </ul>
        </div>
      </div>
    );
  }
}


Chart9.propTypes = {
  data: PropTypes.any.isRequired,
};

export default Chart9;
