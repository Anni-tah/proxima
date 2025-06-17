import React, { useEffect, useState } from "react";

const RepaymentHistory = ({ userId }) => {
  const [repayments, setRepayments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/user-repayment-history/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setRepayments(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching repayment history:", error);
        setLoading(false);
      });
  }, [userId]);

  const getUniqueValues = (key) => [
    ...new Set(repayments.map((r) => r[key]).filter(Boolean)),
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.toLowerCase();

    const result = repayments.filter((r) => {
      const matchesText =
        r.group_name?.toLowerCase().includes(query) ||
        r.loan_status?.toLowerCase().includes(query) ||
        r.repayment_date?.toLowerCase().includes(query);

      const matchesGroup = selectedGroup ? r.group_name === selectedGroup : true;
      const matchesStatus = selectedStatus ? r.loan_status === selectedStatus : true;

      const repaymentDate = new Date(r.repayment_date);
      const afterStart = startDate ? repaymentDate >= new Date(startDate) : true;
      const beforeEnd = endDate ? repaymentDate <= new Date(endDate) : true;

      return matchesText && matchesGroup && matchesStatus && afterStart && beforeEnd;
    });

    setFiltered(result);
  };

  const handleReset = () => {
    setSearch("");
    setSelectedGroup("");
    setSelectedStatus("");
    setStartDate("");
    setEndDate("");
    setFiltered(repayments);
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading repayment history...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-[#cde8e5] mt-6">
      <h2 className="text-xl font-semibold text-[#265073] mb-4">Repayment History</h2>

      {/* Search and Filter Form */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by keyword"
          className="w-full px-4 py-2 border border-[#cde8e5] rounded"
        />

        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="w-full px-4 py-2 border border-[#cde8e5] rounded"
        >
          <option value="">All Groups</option>
          {getUniqueValues("group_name").map((g, i) => (
            <option key={i} value={g}>{g}</option>
          ))}
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="w-full px-4 py-2 border border-[#cde8e5] rounded"
        >
          <option value="">All Statuses</option>
          {getUniqueValues("loan_status").map((s, i) => (
            <option key={i} value={s}>{s}</option>
          ))}
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full px-4 py-2 border border-[#cde8e5] rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full px-4 py-2 border border-[#cde8e5] rounded"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-[#2d9596] text-white px-4 py-2 rounded shadow w-full"
          >
            Filter
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="text-[#2d9596] underline text-sm"
          >
            Reset
          </button>
        </div>
      </form>

      {filtered.length > 0 ? (
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="text-[#2d9596] border-b">
              <th className="py-2 px-3">Date</th>
              <th className="py-2 px-3">Group</th>
              <th className="py-2 px-3">Loan Amount</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3">Repaid Amount</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((repayment) => (
              <tr key={repayment.repayment_id} className="border-t hover:bg-[#f0fdfa]">
                <td className="py-2 px-3">{repayment.repayment_date}</td>
                <td className="py-2 px-3">{repayment.group_name || "N/A"}</td>
                <td className="py-2 px-3">KES {repayment.loan_amount}</td>
                <td className="py-2 px-3 capitalize">{repayment.loan_status}</td>
                <td className="py-2 px-3 text-[#2d9596] font-medium">
                  KES {repayment.repayment_amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No matching repayments found.</p>
      )}
    </div>
  );
};

export default RepaymentHistory;
