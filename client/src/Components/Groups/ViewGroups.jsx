import React, { useEffect, useState } from "react";
import GroupSavingsChart from "./GroupSavingsChart";
import CreateGroupForm from "./CreateGroupsForm";
import JoinGroups from "./JoinGroup";
import { Users, PlusCircle, BarChart2, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

function ViewGroups({ userId }) {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/user-groups/${userId}`)
      .then((res) => res.json())
      .then((data) => setGroups(data))
      .catch((err) => console.error("Error fetching user groups:", err));
  }, [userId]);

  const handleGroupCreated = (newGroup) => {
    setGroups((prevGroups) => [...prevGroups, newGroup]);
  };

  // Animation variant
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
    }),
  };

  return (
    <div className="bg-[#f6fefc] min-h-screen py-10 px-4">
      <motion.h1
        className="text-3xl font-bold text-center text-[#265073] mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Group Dashboard
      </motion.h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Your Groups */}
        <motion.div
          className="bg-white border border-[#CDE8E5] rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.01] transition duration-300 p-6"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <h2 className="text-xl font-bold text-[#265073] mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#2D9596]" />
            Your Groups
          </h2>
          {groups.length > 0 ? (
            <ul className="space-y-3">
              {groups.map((group) => (
                <li
                  key={group.id}
                  className="flex justify-between items-center text-[#2D9596] bg-[#ECF4D6] px-4 py-2 rounded-xl shadow hover:bg-[#9AD0C2] transition"
                >
                  <span className="font-medium">{group.name}</span>
                  <span className="text-xs text-gray-500">#{group.id}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">You haven’t joined any groups yet.</p>
          )}
        </motion.div>

        {/* Card 2: Join Groups */}
        <motion.div
          className="bg-white border border-[#CDE8E5] rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.01] transition duration-300 p-6"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <h2 className="text-xl font-bold text-[#265073] mb-4 flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-[#2D9596]" />
            Explore & Join Groups
          </h2>
          <JoinGroups userId={userId} />
        </motion.div>

        {/* Card 3: Group Savings Chart */}
        <motion.div
          className="bg-white border border-[#CDE8E5] rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.01] transition duration-300 p-6"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <h2 className="text-xl font-bold text-[#265073] mb-4 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-[#2D9596]" />
            Group Savings Overview
          </h2>
          <GroupSavingsChart />
        </motion.div>

        {/* Card 4: Create Group */}
        <motion.div
          className="bg-white border border-[#CDE8E5] rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.01] transition duration-300 p-6"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <h2 className="text-xl font-bold text-[#265073] mb-4 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-[#2D9596]" />
            Create New Group
          </h2>
          <CreateGroupForm userId={userId} onGroupCreate={handleGroupCreated} />
        </motion.div>
      </div>
    </div>
  );
}

export default ViewGroups;
