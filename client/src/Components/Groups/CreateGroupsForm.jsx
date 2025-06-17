import React, { useState } from "react";

const CreateGroupForm = ({ userId, onGroupCreate }) => {
  const [formData, setFormData] = useState({
    name: "",
    signatory_count: "",
    interest_rate: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage({ type: "", text: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      creator_id: userId,
    };

    try {
      const response = await fetch("/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to create group");

      const newGroup = await response.json();
      setMessage({ type: "success", text: "Group created successfully!" });
      setFormData({ name: "", signatory_count: "", interest_rate: "" });

      if (onGroupCreate) onGroupCreate(newGroup);
    } catch (error) {
      setMessage({ type: "error", text: "Error creating group. Try again." });
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md mx-auto border border-[#9ad0c2] mt-4">
      <h2 className="text-2xl font-bold text-[#265073] mb-4">Create a Group</h2>

      {message.text && (
        <p className={`mb-2 ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
          {message.text}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[#265073] font-medium">Group Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            required
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md border-[#9ad0c2] focus:outline-none focus:ring-2 focus:ring-[#2d9596]"
          />
        </div>

        <div>
          <label className="block text-[#265073] font-medium">Signatory Count</label>
          <input
            type="number"
            name="signatory_count"
            value={formData.signatory_count}
            required
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md border-[#9ad0c2] focus:outline-none focus:ring-2 focus:ring-[#2d9596]"
          />
        </div>

        <div>
          <label className="block text-[#265073] font-medium">Interest Rate (%)</label>
          <input
            type="number"
            step="0.01"
            name="interest_rate"
            value={formData.interest_rate}
            required
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md border-[#9ad0c2] focus:outline-none focus:ring-2 focus:ring-[#2d9596]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#2d9596] text-white py-2 px-4 rounded-lg hover:bg-[#1c7d80] transition"
        >
          Create Group
        </button>
      </form>
    </div>
  );
};

export default CreateGroupForm;
