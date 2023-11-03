import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import PropTypes from 'prop-types';

const BarChartGraph = ({ graphData }) => {
  return (
    <>
      <ResponsiveContainer width='100%' aspect={4.0 / 1.0}>
        <BarChart
          data={graphData.dataPoints}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='title' />
          <YAxis />
          <Tooltip />
          <Legend />
          {graphData.keys.map((key, i) => {
            return <Bar dataKey={key.key} fill={key.color} key={i} />;
          })}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

BarChartGraph.propTypes = {
  graphData: PropTypes.object.isRequired,
};

export default BarChartGraph;
