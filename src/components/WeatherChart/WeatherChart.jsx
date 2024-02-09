import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


const WeatherChart = ({ options }) => {

  console.log(options)
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
};

export default WeatherChart;
