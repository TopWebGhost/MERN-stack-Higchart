import React, { PropTypes } from 'react';


import styles from './Chart7.css';
import ReactHighcharts from 'react-highcharts';
import convertStringToFloat from '../chartUtils.js'

function getDummyDate () {
  const dummySalesDate = 2012;
  return dummySalesDate;
}
function exractDate(data) {
  let tempDate = new Date(data);
  return tempDate.getMonth() + 1;
}

export function Chart7(props) {
  this.realData = props.data.data;

  let name = [];
  let finalCombinedData = [];
  let date = [];

  for(let i = 0; i < this.realData.length; i++) {
    let index = name.indexOf(this.realData[i].opportunityVehicle.name);

    if(index < 0) {
      name[name.length] = this.realData[i].opportunityVehicle.name;
    }
  }

  for(let i = 0; i < this.realData.length; i++) {
    if(!this.realData[i].hasOwnProperty('salesDate')) {
      continue;
    }
    let tempDate = exractDate(this.realData[i].salesDate);
    let index = date.indexOf(tempDate);
    if(index < 0) {
      date[date.length] = tempDate;
    }
  }
  date.sort();

  for(let i = 0; i < name.length; i++) {
    let data = [];
    for(let j = 0; j < date.length; j++) {
      data[j] = 0;
    }
    for(let j = 0; j < this.realData.length; j++) {
      if(this.realData[j].opportunityVehicle.name == name[i]) {
        if(!this.realData[j].hasOwnProperty('salesDate')) {
          continue;
        }
        let tempDate = exractDate(this.realData[j].salesDate);
        let index = date.indexOf(tempDate);

        data[index] += convertStringToFloat(this.realData[j].subscriptionAmount);

      }

    }

    finalCombinedData[i] = {name: name[i], data: data};
  }


  const config = {
    chart: {
      type: 'column'
    },
    title: {
      text: '<h1 style="font-size: 30px">Yearly Sales</h1><br><h1 style="color: #828282">BY SALES REPORT YEAR, CHANNEL . REFRESHED:10:43:36 AM</h1>',
      align: 'left',

    },
    xAxis: {
      categories: date
    },
    yAxis: {
      min: 0,
      title: {
        text: ''
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold',
          color: 'gray'
        }
      }
    },
    legend: {
      align: 'left',
      x: 0,
      verticalAlign: 'top',
      y: 35,
      backgroundColor: 'white',
      shadow: false
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
          color: 'white'
        }
      }
    },
    colors: ['#2cb7ab', '#3a484b'],
    series: finalCombinedData
  }
  return (
    <div className={styles.myChart}>
      <ReactHighcharts  config = {config}></ReactHighcharts>
    </div>
  );
}



Chart7.propTypes = {
  data: PropTypes.any.isRequired,
};

export default Chart7;
