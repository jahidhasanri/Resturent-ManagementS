import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const DonutChart = () => {
  const data = [
    { label: "Completed", value: 62, color: "#FACC15" },
    { label: "Pending", value: 30, color: "#F59E0B" },
    { label: "Cancelled", value: 8, color: "#FDE68A" },
  ];

  return (
    <PieChart
      width={200}
      height={200}
      series={[
        {
          data,
          innerRadius: 50,
          outerRadius: 80,
          label: {
            show: true,
            component: (props) => {
              const { x, y, datum } = props;
              return (
                <text
                  x={x}
                  y={y}
                  fill="white"
                  fontSize={12}
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {datum.label}
                </text>
              );
            },
          },
        },
      ]}
      margin={{ right: 5 }}
    />
  );
};

export default DonutChart;
