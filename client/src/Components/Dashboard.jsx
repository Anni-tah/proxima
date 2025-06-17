import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import TopMenu from "./TopMenu";
import Sidebar from "./Sidebar";
import ViewGroups from "./Groups/ViewGroups";
import AllGroups from "./Groups/AllGroups";
import { motion } from "framer-motion";
import LoanDashboardLayout from "./Loans/LoansLayout";
import RepaymentHistory from "./RepaymentHistory";
import DashboardMain from "./DashboardMain";

const Dashboard = () => {
  const location = useLocation();
  const user = location.state?.user || { name: "User", id: null };
  const [activeTab, setActiveTab] = useState("dashboard");

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex font-sans bg-[#f0f9f8] text-gray-800">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        <TopMenu user={user} />

        <motion.div
          className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10"
          initial="hidden"
          animate="visible"
          variants={contentVariants}
          transition={{ duration: 0.6 }}
        >
          {activeTab === "dashboard" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
            <DashboardMain/>
            </motion.div>
          )}

          {activeTab === "groups" && <ViewGroups userId={user.id} />}

          {activeTab === "loans" && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={contentVariants}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <LoanDashboardLayout userId={user.id} />
            </motion.div>
          )}

          {activeTab === "repayments" && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={contentVariants}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <RepaymentHistory userId={user.id} />
            </motion.div>
          )}

          {activeTab === "transactions" && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={contentVariants}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <p className="text-lg">Transactions data.</p>
            </motion.div>
          )}

          {activeTab === "users" && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={contentVariants}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <h2 className="text-2xl font-bold text-[#265073] mb-6">All Groups</h2>
              <AllGroups />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
