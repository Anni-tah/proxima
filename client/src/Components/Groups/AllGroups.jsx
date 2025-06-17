import React, { useEffect, useState } from "react";

const AllGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/group-savings")
      .then((res) => res.json())
      .then((data) => {
        setGroups(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch groups:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-[#265073] text-xl">Loading groups...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.map((group, index) => (
        <div
          key={group.id}
          className="bg-white shadow-md rounded-2xl p-6 border-l-8 border-[#2D9596] hover:scale-105 transform transition-all duration-300"
        >
          <h2 className="text-xl font-bold text-[#265073] mb-2">{group.group_name}</h2>
          <p className="text-[#2D9596] text-lg font-medium">
            Total Savings:{" "}
            <span className="text-[#265073] font-bold">
              KES {group.total_savings.toLocaleString()}
            </span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Group Rank: #{index + 1}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AllGroups;
