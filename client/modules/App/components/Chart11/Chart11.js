import React, { PropTypes } from 'react';


import styles from './Chart11.css';
import ReactHighcharts from 'react-highcharts';
import highchartsMore from 'highcharts-more'
import convertStringToFloat from '../chartUtils.js'

export function Chart11(props) {
  this.realData = props.data.data;
  let name = [];
  let data = [];
  let finalCombinedData = [];
  for(let i = 0; i < this.realData.length; i++) {

    console.log('ok');
    let tempName = this.realData[i].opportunityStatus.name;
    let index = name.indexOf(tempName);

    if(index < 0) {
      name[name.length] = tempName;
      data[data.length] = convertStringToFloat(this.realData[i].subscriptionAmount);
    } else {
      data[index] +=  convertStringToFloat(this.realData[i].subscriptionAmount);
    }
  }

  for(let i = 0; i < data.length; i++) {
    finalCombinedData[i] = [data[i] / 2 * (-1), data[i] / 2];
  }
  highchartsMore(ReactHighcharts.Highcharts);
  const config = {
    chart: {
      type: 'columnrange',
      inverted: true
    },

    title: {
      text: '<h1 style="font-size: 30px">Sales Funnel</h1><br><h1 style="color: #828282">BY STAGE  REFRESHED: 10:38:32 AM</h1><br><h2 style="color: #828282; margin-left: 50px;">Amount by Opportunity Referral Broker Account: Account Name and Project</h2>',
      align: 'left',
      y: 40
    },

    xAxis: {
      categories: name,
    },

    yAxis: {
      title: {
        enabled: false,
      },
      gridLineWidth: 0,
      labels: {
        enabled: false,
      }
    },

    tooltip: {
      enabled: false,
    },

    plotOptions: {
      columnrange: {
        dataLabels: {
          enabled: true,
          useHTML: true,
          formatter: function () {
            if (this.y === this.point.low) {
              return '<p style="text-align: center; width: ' + (this.point.plotLow - this.point.plotHigh) + 'px">' + this.point.high * 2 + '</p>';
            }
          }
        }
      }
    },

    legend: {
      enabled: false
    },

    series: [{
      name: 'Temperatures',
      data:finalCombinedData
    }]

  }
  return (
    <div className={styles.myChart} >
      <ReactHighcharts config = {config}></ReactHighcharts>
    </div>
  );
}


Chart11.propTypes = {
  data: PropTypes.any.isRequired,
};

export default Chart11;
