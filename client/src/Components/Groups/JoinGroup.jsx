import React, { useEffect, useState } from "react";

function JoinGroups({ userId }) {
  const [allGroups, setAllGroups] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5); // Show 5 groups initially

  useEffect(() => {
    // Fetch all groups
    fetch("http://localhost:5000/groups")
      .then((res) => res.json())
      .then(setAllGroups)
      .catch((err) => console.error("Error fetching all groups:", err));

    // Fetch groups the user already joined
    fetch(`http://localhost:5000/user-groups/${userId}`)
      .then((res) => res.json())
      .then(setUserGroups)
      .catch((err) => console.error("Error fetching user groups:", err));
  }, [userId]);

  const userGroupIds = new Set(userGroups.map((group) => group.id));

  const handleJoin = async (groupId) => {
    const response = await fetch("http://localhost:5000/groupmembers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        group_id: groupId,
        role: "member",
        is_signatory: false,
      }),
    });

    if (response.ok) {
      alert("Successfully joined the group!");
      setUserGroups((prev) => [...prev, { id: groupId }]);
    } else {
      alert("Failed to join the group.");
    }
  };

  const visibleGroups = allGroups.slice(0, visibleCount);

  return (
    <div>
      {visibleGroups.length > 0 ? (
        <ul className="space-y-2">
          {visibleGroups.map((group) => (
            <li
              key={group.id}
              className="flex justify-between items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
            >
              <span className="text-[#2D9596] font-medium">{group.name}</span>
              {userGroupIds.has(group.id) ? (
                <span className="text-sm text-gray-500">Joined</span>
              ) : (
                <button
                  onClick={() => handleJoin(group.id)}
                  className="text-sm text-white bg-[#2D9596] px-3 py-1 rounded-md hover:bg-[#1d6b6b]"
                >
                  Join
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No groups available to join.</p>
      )}

      {visibleCount < allGroups.length && (
        <div className="text-center mt-4">
          <button
            onClick={() => setVisibleCount((prev) => prev + 5)}
            className="bg-[#265073] text-white px-4 py-2 rounded hover:bg-[#1d3f4f] transition"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}

export default JoinGroups;
