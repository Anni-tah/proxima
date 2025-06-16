import React from "react";
import {
  Home,
  Users,
  CreditCard,
  DollarSign,
  Repeat,
  UserCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", icon: <Home size={20} />, key: "dashboard" },
    { label: "Groups", icon: <Users size={20} />, key: "groups" },
    { label: "Loans", icon: <CreditCard size={20} />, key: "loans" },
    { label: "Repayments", icon: <DollarSign size={20} />, key: "repayments" },
    { label: "Transactions", icon: <Repeat size={20} />, key: "transactions" },
    { label: "Users", icon: <UserCircle2 size={20} />, key: "users" }, // Optional for admin
  ];

  return (
    <div className="w-64 h-screen bg-[#265073] text-white p-6">
      <h2 className="text-2xl font-bold mb-8">Proxima</h2>
      <ul className="space-y-6">
        {menuItems.map(({ label, icon, key }) => (
          <li
            key={key}
            className={`flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-[#2d9596] transition ${
              activeTab === key ? "bg-[#2d9596]" : ""
            }`}
            onClick={() => setActiveTab(key)}
          >
            <span>{icon}</span>
            <span className="text-md">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
