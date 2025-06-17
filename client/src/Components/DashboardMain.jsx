import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const pieData = [
  { name: "Repaid", value: 75 },
  { name: "Outstanding", value: 25 },
];

const COLORS = ["#2D9596", "#FFBB28"];

const lineData = [
  { name: "Jan", repayments: 10000 },
  { name: "Feb", repayments: 12000 },
  { name: "Mar", repayments: 15000 },
  { name: "Apr", repayments: 9000 },
  { name: "May", repayments: 17000 },
];

const DashboardMain = () => {
  return (
    <div className="w-full bg-[#f6fefc] p-6">
      <h2 className="text-2xl font-bold text-[#265073] mb-6">Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Total Loans", value: "KES 120,000" },
          { label: "Active Loans", value: "3" },
          { label: "Outstanding", value: "KES 45,000" },
          { label: "Total Repaid", value: "KES 75,000" },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-xl shadow border border-[#CDE8E5] text-center"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-[#2D9596]">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-6 rounded-xl shadow border border-[#CDE8E5]">
          <h3 className="text-lg font-semibold text-[#265073] mb-4">Loan Repayment Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border border-[#CDE8E5]">
          <h3 className="text-lg font-semibold text-[#265073] mb-4">Monthly Repayments</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="repayments" stroke="#2D9596" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow border border-[#CDE8E5]">
        <h3 className="text-lg font-semibold text-[#265073] mb-4">Recent Activity</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>✅ Loan ID #103 fully repaid</li>
          <li>📥 Received repayment of KES 15,000 from Group B</li>
          <li>📤 Applied for new loan - KES 50,000</li>
          <li>👥 Joined new group: Financial Eagles</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardMain;
