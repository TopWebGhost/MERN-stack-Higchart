import React, { PropTypes } from 'react';


import styles from './Chart4.css';
import ReactHighcharts from 'react-highcharts';
import convertStringToFloat from '../chartUtils.js'

export function Chart4(props) {
  this.realData = props.data.data;
  let name = ['Broker', 'No Broker'];
  let data = [0 ,0];
  let finalCombinedData = [];
  for(let i = 0; i < this.realData.length; i++) {
    if (this.realData[i].hasOwnProperty('broker')) {
      data[0] += convertStringToFloat(this.realData[i].subscriptionAmount);
    } else {
      data[1] += convertStringToFloat(this.realData[i].subscriptionAmount);
    }
  }
  for(let i = 0; i < name.length; i++) {
    finalCombinedData[i] = [name[i], data[i]];
  }
  console.log(finalCombinedData);
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
      text: '<h1 style="font-size: 30px">Amount</h1><br><h1 style="color: #828282">BY BROKER OR NO BROKER</h1>',
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


Chart4.propTypes = {
  data: PropTypes.any.isRequired,
};

export default Chart4;
