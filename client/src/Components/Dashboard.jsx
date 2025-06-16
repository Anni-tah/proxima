import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const user = location.state?.user || { name: "User" };
  const firstName = user.name.split(" ")[0];

  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Sidebar */}
      <div className="w-1/4 bg-[#265073] text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Proxima</h2>
        <ul className="space-y-4">
          <li
            className={`cursor-pointer ${activeTab === "dashboard" ? "underline" : ""}`}
            onClick={() => handleTabClick("dashboard")}
          >
            Dashboard
          </li>
          <li
            className={`cursor-pointer ${activeTab === "groups" ? "underline" : ""}`}
            onClick={() => handleTabClick("groups")}
          >
            Groups
          </li>
          <li
            className={`cursor-pointer ${activeTab === "contributions" ? "underline" : ""}`}
            onClick={() => handleTabClick("contributions")}
          >
            Contributions
          </li>
          <li
            className={`cursor-pointer ${activeTab === "loans" ? "underline" : ""}`}
            onClick={() => handleTabClick("loans")}
          >
            Loans
          </li>
          <li
            className={`cursor-pointer ${activeTab === "repayments" ? "underline" : ""}`}
            onClick={() => handleTabClick("repayments")}
          >
            Repayments
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-[#ecf4d6]">
        <h1 className="text-3xl font-semibold text-[#265073] mb-4">
          Welcome, {firstName} 👋
        </h1>

        {activeTab === "dashboard" && (
          <div>
            <p className="text-lg text-[#2d9596] mb-4">
              Here's a quick overview of your activity.
            </p>
            {/* Add stats or charts later */}
          </div>
        )}

        {activeTab === "groups" && (
          <div>
            <h2 className="text-2xl font-bold text-[#2d9596] mb-4">Your Groups</h2>
            <ul className="space-y-2">
              <li className="p-4 bg-white rounded-lg shadow border">
                <h3 className="text-lg font-semibold text-[#265073]">Group Alpha</h3>
                <p className="text-sm text-gray-600">10 Members · Weekly Contributions</p>
              </li>
              <li className="p-4 bg-white rounded-lg shadow border">
                <h3 className="text-lg font-semibold text-[#265073]">Group Beta</h3>
                <p className="text-sm text-gray-600">8 Members · Monthly Contributions</p>
              </li>
            </ul>
          </div>
        )}

        {activeTab === "contributions" && (
          <p className="text-[#2d9596]">Contributions will appear here.</p>
        )}

        {activeTab === "loans" && (
          <p className="text-[#2d9596]">Loan information will appear here.</p>
        )}

        {activeTab === "repayments" && (
          <p className="text-[#2d9596]">Repayment history will appear here.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
