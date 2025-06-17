import React, { useEffect, useState } from "react";

const LoanSummary = ({ userId }) => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/user-loans/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setLoans(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user loans:", err);
        setLoading(false);
      });
  }, [userId]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-[#cde8e5]">
      <h2 className="text-xl font-semibold text-[#265073] mb-4">Loan Overview</h2>

      {loading ? (
        <p className="text-gray-500 italic">Loading loans...</p>
      ) : loans.length > 0 ? (
        <ul className="space-y-4">
          {loans.map((loan) => (
            <li
              key={loan.id}
              className="p-4 bg-[#f0fdfa] rounded-lg border-l-4 border-[#2d9596] shadow-sm"
            >
              <div className="flex justify-between items-center text-sm text-[#2d9596]">
                <div>
                  <p className="font-bold">Group: {loan.group_name}</p>
                  <p>Amount: KES {loan.amount}</p>
                  <p>Remaining: KES {loan.remaining_balance}</p>
                  <p>Interest Rate: {loan.interest_rate}%</p>
                  <p>Due Date: {new Date(loan.due_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      loan.status === "cleared"
                        ? "bg-green-100 text-green-700"
                        : loan.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {loan.status}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No loans found.</p>
      )}
    </div>
  );
};

export default LoanSummary;
