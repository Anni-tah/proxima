import React, { useEffect, useState } from "react";

const LoanForm = ({ userId }) => {
  const [groups, setGroups] = useState([]);
  const [notInGroup, setNotInGroup] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    interest_rate: "",
    due_date: "",
    group_id: ""
  });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/user-groups/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setGroups(data);
        } else {
          setNotInGroup(true);
        }
      })
      .catch(err => {
        console.error("Error fetching groups:", err);
        setError("Failed to fetch groups.");
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevForm) => ({
      ...prevForm,
      [name]: name === "group_id" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      repaid: false,
      user_id: userId,
      status: "pending"
    };

    fetch("http://localhost:5000/loans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.error || "Loan submission failed");
          });
        }
        return res.json();
      })
      .then(() => {
        setSuccess("Loan successfully submitted!");
        setError(null);
        setFormData({
          amount: "",
          interest_rate: "",
          due_date: "",
          group_id: "",
        });
      })
      .catch((err) => {
        console.error(err);
        setSuccess(null);
        setError(err.message);
      });
  };

  if (notInGroup) {
    return (
      <div className="bg-red-50 text-red-700 border border-red-300 p-4 rounded-lg">
        <p>
          You are not part of any group. Please{" "}
          <a href="/groups" className="underline text-blue-600">
            join or register for a group
          </a>{" "}
          before applying for a loan.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl p-6 shadow-md border border-[#cde8e5]"
    >
      <h3 className="text-xl font-semibold text-[#265073] mb-4">Apply for a Loan</h3>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <div className="mb-4">
        <label className="block mb-1 text-[#265073]">Select Group</label>
        <select
          name="group_id"
          value={formData.group_id}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded border-[#cde8e5]"
        >
          <option value="">-- Select Group --</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-[#265073]">Amount</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded border-[#cde8e5]"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-[#265073]">Interest Rate (%)</label>
        <input
          type="number"
          name="interest_rate"
          value={formData.interest_rate}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded border-[#cde8e5]"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-[#265073]">Due Date</label>
        <input
          type="date"
          name="due_date"
          value={formData.due_date}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded border-[#cde8e5]"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#2d9596] hover:bg-[#217879] text-white px-4 py-2 rounded"
      >
        Apply
      </button>
    </form>
  );
};

export default LoanForm;
