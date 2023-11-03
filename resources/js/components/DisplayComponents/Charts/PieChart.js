import React from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

const PieChartGraph = ({ graphData }) => {
  let renderLabel = function (entry) {
    return entry.name;
  };

  return (
    <>
      <ResponsiveContainer width='100%' aspect={4.0 / 1.0}>
        <PieChart>
          <Pie
            data={graphData.data}
            dataKey={graphData.dataKey}
            nameKey={graphData.nameKey}
            isAnimationActive={false}
            cx='50%'
            cy='50%'
            outerRadius={60}
            fill='#0096b4'
            label={renderLabel}
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

PieChartGraph.propTypes = {
  graphData: PropTypes.object.isRequired,
};

export default PieChartGraph;
