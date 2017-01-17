import React, { PropTypes } from 'react';


import styles from './Chart2.css';
import ReactHighcharts from 'react-highcharts';
import convertStringToFloat from '../chartUtils.js'

export function Chart2(props) {
  this.realData = props.data.data;
  let name = [];
  let data = [];
  let finalCombinedData = [];
  for(let i = 0; i < this.realData.length; i++) {

    if(!this.realData[i].hasOwnProperty('cra'))
      continue;
    console.log('ok');
    let tempName = this.realData[i].cra.firstName + ' ' + this.realData[i].cra.lastName;
    let index = name.indexOf(tempName);

    if(index < 0) {
      name[name.length] = tempName;
      data[data.length] = convertStringToFloat(this.realData[i].subscriptionAmount);
    } else {
      data[index] +=  convertStringToFloat(this.realData[i].subscriptionAmount);
    }
  }

  finalCombinedData = [{name: 'price', data: data}];
  console.log(name);
  const config = {
    chart: {
      type: 'bar'
    },
    title: {
      text: '<h1 style="font-size: 30px">Total Sales</h1><br><h1 style="color: #828282">BY CRA</h1>',
      align: 'left',
      y: 40
    },
    xAxis: {
      categories: name
    },
    yAxis: {
      min: 0,
      title: {
        text: ''
      }
    },
    legend: {
      reversed: true
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },
    colors: ['#2cb7ab', '#3a484b'],
    series: finalCombinedData
  }
  return (
    <div className={styles.myChart} >
      <ReactHighcharts config = {config}></ReactHighcharts>
    </div>
  );
}


Chart2.propTypes = {
  data: PropTypes.any.isRequired,
};

export default Chart2;
