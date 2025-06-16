import React from "react";
import { Bell, UserCircle2 } from "lucide-react";

export default function TopMenu({ user }) {
  const firstName = user?.name?.split(" ")[0] || "User";

  return (
    <div className="w-full px-6 py-4 bg-white border-b shadow-sm flex items-center justify-between">
      <h1 className="text-xl font-semibold text-[#265073]">Dashboard</h1>

      <div className="flex items-center space-x-6">
        <Bell className="text-[#2d9596] hover:text-[#1e7f80] cursor-pointer" />
        <div className="flex items-center space-x-2 cursor-pointer">
          <UserCircle2 className="text-[#265073]" />
          <span className="text-[#265073] font-medium">{firstName}</span>
        </div>
      </div>
    </div>
  );
}
