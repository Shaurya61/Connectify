"use client";

import { useState } from "react";
import { User } from "@prisma/client";
import UserBox from "./UserBox";

interface UserListProps {
  items: User[];
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  const [search, setSearch] = useState<string>("");

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Filter users based on search input
  const filteredItems = items.filter((item) => {
    if (!item.name) return false;
    return item.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <aside
      className="
        fixed
        inset-y-0
        pb-20
        lg:pb-0
        lg:left-20
        lg:w-80
        lg:block
        overflow-y-auto
        border-r
        border-gray-200
        block
        w-full
        left-0
      "
    >
      <div className="px-5">
        <div className="flex-col">
          <div
            className="
            text-2xl
            font-bold
            text-neutral-800
            py-4
          "
          >
            People
          </div>
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search User"
              className="
                w-full
                px-4
                py-2
                border
                rounded
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-600
                focus:border-transparent
              "
            />
          </div>
        </div>
        {filteredItems.map((item) => (
          <UserBox key={item.id} data={item} />
        ))}
      </div>
    </aside>
  );
};

export default UserList;
