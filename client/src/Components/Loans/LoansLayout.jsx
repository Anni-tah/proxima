import React, { useEffect, useState } from "react";
import LoanSummary from "./LoansSummary";
import LoanForm from "./LoanForm";

function LoanDashboardLayout({ userId }) {
  const [stats, setStats] = useState({
    total_active: 0,
    outstanding_balance: 0,
    total_paid: 0,
  });

  useEffect(() => {
    fetch(`http://localhost:5000/user-loan-summary/${userId}`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Failed to load loan stats", err));
  }, [userId]);

  return (
    <div className="bg-[#f6fefc] min-h-screen py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-[#265073] mb-10">
        Your Loan Dashboard
      </h1>

      {/* KPI Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white p-5 rounded-xl shadow text-center border border-[#CDE8E5]">
          <p className="text-sm text-gray-500">Total Active Loans</p>
          <p className="text-2xl font-bold text-[#2D9596]">
            KES {stats.total_active.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow text-center border border-[#CDE8E5]">
          <p className="text-sm text-gray-500">Outstanding Balance</p>
          <p className="text-2xl font-bold text-[#2D9596]">
            KES {stats.outstanding_balance.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow text-center border border-[#CDE8E5]">
          <p className="text-sm text-gray-500">Total Paid</p>
          <p className="text-2xl font-bold text-[#2D9596]">
            KES {stats.total_paid.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <section>
          <h2 className="text-xl font-semibold text-[#265073] mb-3">
            Your Loan Summary
          </h2>
          <LoanSummary userId={userId} />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#265073] mb-3">
            Apply for a New Loan
          </h2>
          <LoanForm userId={userId} />
        </section>
      </div>
    </div>
  );
}

export default LoanDashboardLayout;
