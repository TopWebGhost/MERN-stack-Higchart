import React, { PropTypes } from 'react';


import styles from './Chart5.css';
import ReactHighcharts from 'react-highcharts';
import convertStringToFloat from '../chartUtils.js'



export function Chart5(props) {
  this.realData = props.data.data;
  let name = [];
  let data = [];
  let finalCombinedData = [];
  for(let i = 0; i < this.realData.length; i++) {
    console.log(i);

    if(!this.realData[i].hasOwnProperty('account'))
      continue;
    let tempData = this.realData[i].account;
    if(tempData == null || !tempData.hasOwnProperty('subscriberContact'))
      continue;
    tempData = this.realData[i].account.subscriberContact;
    if(tempData == null || !tempData.hasOwnProperty('nationality'))
      continue;

    //console.log(this.realData[i].account.subscriberContact.nationality['name']);
    tempData = this.realData[i].account.subscriberContact.nationality;
    //console.log(tempData.name);
    let index = name.indexOf(tempData.name);

    if(index < 0) {
      name[name.length] = tempData.name;
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
      text: '<h1 style="font-size: 30px">Sales by Country</h1><br><h1 style="color: #828282">STAGES 2 TO 6 . REFRESHED: 10:43:36 AM</h1>',
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
    colors: ['#2cb7ab', '#3a484b', '#889193', '#f96563', '#f1c633', '#fcc0c0', '#616c6e', '#8fd4ea', '#f96563', '#53384e', '#fb976c', '#a46c99', '#020202', '#f1c634'],
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


Chart5.propTypes = {
  data: PropTypes.any.isRequired,
};

export default Chart5;
