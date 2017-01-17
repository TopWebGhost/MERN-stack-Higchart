import React, { PropTypes } from 'react';


import styles from './Chart1.css';
import ReactHighcharts from 'react-highcharts';
import convertStringToFloat from '../chartUtils.js'



export function Chart1(props) {
  this.realData = props.data.data;
  console.log(this.realData);
  let name = [];
  let data = [];
  let finalCombinedData = [];
  for(let i = 0; i < this.realData.length; i++) {
    if(!this.realData[i].hasOwnProperty('opportunityVehicle'))
      continue;
    let index = name.indexOf(this.realData[i].opportunityVehicle.name);

    if(index < 0) {
      name[name.length] = this.realData[i].opportunityVehicle.name;
      data[data.length] = convertStringToFloat(this.realData[i].subscriptionAmount);
    } else {
      data[index] +=  convertStringToFloat(this.realData[i].subscriptionAmount);
    }
  }
  for(let i = 0; i < name.length; i++) {
    finalCombinedData[i] = [name[i], data[i]];
  }

  const config = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      type: 'pie',
      height: 400,
      marginTop:100,
    },
    title: {
      text: '<h1 style="font-size: 30px">Total Sales</h1><br><h1 style="color: #828282">BY CHANNEL . REFRESHED:10:43:36 AM</h1>',
      align: 'left',
      y: 40
    },
    tooltip: {
      pointFormat: '<b>{point.y:,.2f}</b>'
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: 20,
          format: '{point.name} ({point.y:,.2f})',
          style: {
            fontWeight: 'bold',
          }
        },
        startAngle: 0,
        endAngle: 360,
        center: ['50%', '50%']
      }
    },
    colors: ['#2cb7ab', '#3a484b'],
    series: [{
      type: 'pie',
      innerSize: '60%',
      data: finalCombinedData,
    }]
  }

  ReactHighcharts.Highcharts.setOptions({
    lang: {
      thousandsSep: ','
    }
  });

  return (
      <div className={styles.myChart}>
        <ReactHighcharts config = {config}></ReactHighcharts>
      </div>
  );
}


Chart1.propTypes = {
  data: PropTypes.any.isRequired,
};

export default Chart1;
