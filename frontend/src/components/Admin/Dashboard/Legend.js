import React from 'react';
import { Chart } from 'react-google-charts';
// import '../Assets/css/Legend.css';

const Charts = () => {
  // Data for the charts
  const barData = [
    ['Day', 'Page Views', 'Unique Views'],
    ['Sun', 1050, 600],
    ['Mon', 1370, 910],
    ['Tue', 660, 400],
    ['Wed', 1030, 540],
    ['Thu', 1000, 480],
    ['Fri', 1170, 960],
    ['Sat', 660, 320],
  ];

  const pieData = [
    ['Country', 'Page Hits'],
    ['USA', 7242],
    ['Canada', 4563],
    ['Mexico', 1345],
    ['Sweden', 946],
    ['Germany', 2150],
  ];

  // Options for the charts
  const barOptions = {
    backgroundColor: 'transparent',
    colors: ['cornflowerblue', 'tomato'],
    fontName: 'Open Sans',
    chartArea: {
      left: 50,
      top: 10,
      width: '100%',
      height: '70%',
    },
    bar: {
      groupWidth: '80%',
    },
    hAxis: {
      textStyle: {
        fontSize: 11,
      },
    },
    vAxis: {
      minValue: 0,
      maxValue: 1500,
      baselineColor: '#DDD',
      gridlines: {
        color: '#DDD',
        count: 4,
      },
      textStyle: {
        fontSize: 11,
      },
    },
    legend: {
      position: 'bottom',
      textStyle: {
        fontSize: 12,
      },
    },
    animation: {
      duration: 1200,
      easing: 'out',
      startup: true,
    },
  };

  const pieOptions = {
    backgroundColor: 'transparent',
    pieHole: 0.4,
    colors: [
      'cornflowerblue',
      'olivedrab',
      'orange',
      'tomato',
      'crimson',
      'purple',
      'turquoise',
      'forestgreen',
      'navy',
      'gray',
    ],
    pieSliceText: 'value',
    tooltip: {
      text: 'percentage',
    },
    fontName: 'Open Sans',
    chartArea: {
      width: '100%',
      height: '94%',
    },
    legend: {
      textStyle: {
        fontSize: 13,
      },
    },
  };

  return (
    <main>
      <h5>Daily Page Hits</h5>
      <div className="chart-container">
        <div className="bar-chart">
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="100%"
            data={barData}
            options={barOptions}
          />
        </div>
      </div>
      <h5>Page Hits per Country</h5>
      <div className="chart-container">
        <div className="pie-chart">
          <Chart
            chartType="PieChart"
            width="100%"
            height="100%"
            data={pieData}
            options={pieOptions}
          />
        </div>
      </div>

    </main>
  );
};

export default Charts;