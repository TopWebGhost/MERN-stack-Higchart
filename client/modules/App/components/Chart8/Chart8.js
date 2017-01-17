import React, { PropTypes } from 'react';


import styles from './Chart8.css';
import ReactHighcharts from 'react-highcharts';
import ReactHighmaps from 'react-highcharts/bundle/ReactHighmaps';
import mapData from './MapData.js';
import convertStringToFloat from '../chartUtils.js'

export function Chart8(props) {
  let data1 = [{code: 'US', z: 1032}, {code: 'gb', z:342},{code: 'BR', z: 200}, {code: 'AZ', z:342},{code: 'AT', z: 103}];

  this.realData = props.data.data;
  let name = [];
  let data = [];
  let finalCombinedData = [];
  for (let i = 0; i < this.realData.length; i++) {
    console.log(i);

    if (!this.realData[i].hasOwnProperty('account'))
      continue;
    let tempData = this.realData[i].account;
    if (tempData == null || !tempData.hasOwnProperty('subscriberContact'))
      continue;
    tempData = this.realData[i].account.subscriberContact;
    if (tempData == null || !tempData.hasOwnProperty('nationality'))
      continue;

    //console.log(this.realData[i].account.subscriberContact.nationality['name']);
    tempData = this.realData[i].account.subscriberContact.nationality;
    //console.log(tempData.name);
    let index = name.indexOf(tempData.code);

    if (index < 0) {
      name[name.length] = tempData.code;
      data[data.length] = convertStringToFloat(this.realData[i].subscriptionAmount);
    } else {
      data[index] += convertStringToFloat(this.realData[i].subscriptionAmount);
    }
  }

    console.log(name);
  console.log(data);
  for(let i=0; i < name.length; i++) {
    finalCombinedData[i] = {'code' : name[i].toUpperCase(), 'z': data[i]};
  }
console.log(finalCombinedData);
  console.log(data1);
  const config = {
    chart: {
      spacingBottom: 20,

    },
    title: {
      text: '<h1 style="font-size: 30px">Number of Accounts with Closed won Sales</h1><br><h1 style="color: #828282">BY COUNTRY . REFRESHED:10:43:36 AM</h1>',
      align: 'left',
      y: 40
    },

    legend: {
      enabled: true
    },

    plotOptions: {
      map: {
        allAreas: true,
        joinBy: ['iso-a2', 'code'],
        dataLabels: {
          enabled: true,
          color: 'white',
          style: {
            fontWeight: 'bold'
          }
        },
        mapData: mapData,
        tooltip: {
          headerFormat: '',
          pointFormat: '{point.name}: '
        }
      }
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom'
      }
    },
    series: [{
      name: 'Countries',
      color: '#E0E0E0',
      enableMouseTracking: false
    }, {
      type: 'mapbubble',
      mapData: mapData,
      name: '',
      joinBy: ['iso-a2', 'code'],
      data: finalCombinedData,
      minSize: 4,
      maxSize: '12%',
      tooltip: {
        pointFormat: '{point.code}: {point.z} '
      }
    }]
  }

  return (
    <div className={styles.myChart}>
      <ReactHighmaps config={config}></ReactHighmaps>
    </div>
  );

}

Chart8.propTypes = {
  data: PropTypes.any.isRequired,
};
export default Chart8;
