import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const DonutChart = () => {
  const data = [
    { label: "New", value: 62, color: "#FACC15" },      // হলুদ
    { label: "Returning", value: 26, color: "#F59E0B" }, // কমলা
    { label: "Inactive", value: 12, color: "#FDE68A" },  // হালকা হলুদ
  ];

  return (
    <PieChart
      series={[
        {
          data,
          innerRadius: 50,
          outerRadius: 80,
        },
      ]}
      width={200}
      height={200}
      margin={{ right: 5 }}
    />
  );
};

export default DonutChart;
