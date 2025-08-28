import React from "react";
import Chart from "react-apexcharts";

const Layout3 = () => {
  const commonOptions = {
    chart: { toolbar: { show: false }, foreColor: "#CBD5E1" }, // text color (gray-300)
    grid: { borderColor: "#334155" }, // grid line dark
    tooltip: {
      theme: "dark", // tooltip dark
    },
    legend: {
      labels: { colors: "#E2E8F0" }, // legend text
    },
    xaxis: {
      labels: { style: { colors: "#E2E8F0" } },
      axisBorder: { color: "#475569" },
      axisTicks: { color: "#475569" },
    },
    yaxis: {
      labels: { style: { colors: "#E2E8F0" } },
    },
  };

  // Bar chart
  const barChart = {
    options: {
      ...commonOptions,
      xaxis: { ...commonOptions.xaxis, categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
      colors: ["#3B82F6"],
    },
    series: [{ name: "Sales", data: [30, 40, 35, 50, 49, 60] }],
  };

  // Donut chart
  const donutChart = {
    options: {
      ...commonOptions,
      labels: ["New", "Returning", "Inactive"],
      colors: ["#3B82F6", "#10B981", "#F43F5E"],
      legend: {
        position: "bottom",
        labels: { colors: "#E2E8F0" },
      },
    },
    series: [62, 26, 12],
  };

  // Area chart
  const areaChart = {
    options: {
      ...commonOptions,
      xaxis: { ...commonOptions.xaxis, categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
      colors: ["#8B5CF6"],
    },
    series: [{ name: "Revenue", data: [10, 41, 35, 51, 49, 62] }],
  };

  // Line chart
  const lineChart = {
    options: {
      ...commonOptions,
      xaxis: { ...commonOptions.xaxis, categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
      colors: ["#F97316"],
    },
    series: [{ name: "Users", data: [20, 30, 45, 50, 49, 60] }],
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white mt-10">
     

      {/* Bar + Donut */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 rounded-xl p-4 shadow">
          <h3 className="text-lg font-semibold mb-2">Sales Overview</h3>
          <Chart options={barChart.options} series={barChart.series} type="bar" height={300} />
        </div>
        <div className="bg-gray-800 rounded-xl p-4 shadow">
          <h3 className="text-lg font-semibold mb-2">Users Breakdown</h3>
          <Chart options={donutChart.options} series={donutChart.series} type="donut" height={300} />
        </div>
      </div>

      {/* Area + Line */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 rounded-xl p-4 shadow">
          <h3 className="text-lg font-semibold mb-2">Monthly Revenue</h3>
          <Chart options={areaChart.options} series={areaChart.series} type="area" height={300} />
        </div>
        <div className="bg-gray-800 rounded-xl p-4 shadow">
          <h3 className="text-lg font-semibold mb-2">Active Users</h3>
          <Chart options={lineChart.options} series={lineChart.series} type="line" height={300} />
        </div>
      </div>
    </div>
  );
};

export default Layout3;
