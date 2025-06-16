import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import TopMenu from "./TopMenu";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const location = useLocation();
  const user = location.state?.user || { name: "User" };
  const firstName = user.name.split(" ")[0];

  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen flex font-sans bg-[#ecf4d6]">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        <TopMenu />
        <div className="p-8">
          <h1 className="text-3xl font-semibold text-[#265073] mb-6">
            Welcome, {firstName} 👋
          </h1>

          {/* Render tab content */}
          {activeTab === "dashboard" && (
            <p className="text-lg text-[#2d9596]">Overview of your activity.</p>
          )}
          {activeTab === "groups" && <p>Your groups go here.</p>}
          {activeTab === "loans" && <p>Loan section.</p>}
          {activeTab === "repayments" && <p>Repayment history.</p>}
          {activeTab === "transactions" && <p>Transactions data.</p>}
          {activeTab === "users" && <p>Admin-only users list.</p>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
