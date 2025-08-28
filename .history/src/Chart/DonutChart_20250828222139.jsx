import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const DonutChart = () => {
  const data = [
    { label: "Completed", value: 62, color: "#FACC15" }, // হলুদ
    { label: "Pending", value: 30, color: "#F59E0B" },   // কমলা
    { label: "Cancelled", value: 8, color: "#FDE68A" },  // হালকা হলুদ
  ];

  return (
    <PieChart
      series={[
        {
          
          label: {
            show: true,
            color: "#ffffff !important", 
          },
        },
      ]}
      width={200}
      height={200}
      margin={{ right: 5 }}
    />
  );
};

export default DonutChart;
