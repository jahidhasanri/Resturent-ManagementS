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
            formatter: (datum) => datum.label, // লেবেল টেক্সট
            style: {
              fill: "#ffffff", // white color
              fontSize: 12,
              fontWeight: 600,
            },
          },
        },
      ]}
      margin={{ right: 5 }}
    />
  );
};

export default DonutChart;
