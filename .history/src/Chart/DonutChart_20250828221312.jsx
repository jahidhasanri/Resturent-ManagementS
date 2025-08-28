import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const DonutChart = () => {
  const data = [
    { label: "Completed Orders", value: 62, color: "#FACC15" },      // হলুদ
    { label: "Pending Orders", value: 30, color: "#F59E0B" }, // কমলা
    { label: "Cancelled Orders", value: 8, color: "#FDE68A" },  // হালকা হলুদ
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
