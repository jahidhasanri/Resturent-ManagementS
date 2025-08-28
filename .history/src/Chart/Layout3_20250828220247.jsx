import React from "react";
import Chart from "react-apexcharts";

const La = () => {
  // Spark charts (small stats)
  const spark1 = {
    options: {
      chart: { sparkline: { enabled: true } },
      colors: ["#008FFB"],
    },
    series: [45, 52, 38, 24, 33, 26, 21],
  };

  const spark2 = {
    options: {
      chart: { sparkline: { enabled: true } },
      colors: ["#00E396"],
    },
    series: [12, 24, 18, 33, 21, 45, 32],
  };

  const spark3 = {
    options: {
      chart: { sparkline: { enabled: true } },
      colors: ["#FEB019"],
    },
    series: [32, 45, 28, 53, 34, 23, 41],
  };

  // Bar chart
  const barChart = {
    options: {
      chart: { id: "bar" },
      xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    },
    series: [{ name: "Sales", data: [30, 40, 35, 50, 49, 60] }],
  };

  // Donut chart
  const donutChart = {
    options: {
      labels: ["New", "Returning", "Inactive"],
      colors: ["#3B82F6", "#10B981", "#F43F5E"],
    },
    series: [62, 26, 12],
  };

  // Area chart
  const areaChart = {
    options: {
      chart: { id: "area" },
      xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    },
    series: [{ name: "Revenue", data: [10, 41, 35, 51, 49, 62] }],
  };

  // Line chart
  const lineChart = {
    options: {
      chart: { id: "line" },
      xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    },
    series: [{ name: "Users", data: [20, 30, 45, 50, 49, 60] }],
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      {/* Spark Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 rounded-xl p-4">
          <Chart options={spark1.options} series={[{ data: spark1.series }]} type="line" height={100} />
        </div>
        <div className="bg-gray-800 rounded-xl p-4">
          <Chart options={spark2.options} series={[{ data: spark2.series }]} type="line" height={100} />
        </div>
        <div className="bg-gray-800 rounded-xl p-4">
          <Chart options={spark3.options} series={[{ data: spark3.series }]} type="line" height={100} />
        </div>
      </div>

      {/* Bar + Donut */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 rounded-xl p-4">
          <Chart options={barChart.options} series={barChart.series} type="bar" height={300} />
        </div>
        <div className="bg-gray-800 rounded-xl p-4">
          <Chart options={donutChart.options} series={donutChart.series} type="donut" height={300} />
        </div>
      </div>

      {/* Area + Line */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 rounded-xl p-4">
          <Chart options={areaChart.options} series={areaChart.series} type="area" height={300} />
        </div>
        <div className="bg-gray-800 rounded-xl p-4">
          <Chart options={lineChart.options} series={lineChart.series} type="line" height={300} />
        </div>
      </div>
    </div>
  );
};

export default Layout3;
