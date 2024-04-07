import React, { useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons"
import Add from "./Add";
import Edit from "./Edit";

const Categories = ({ categories, setCategories }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <ul className="flex gap-4 md:flex-col text-xl">
      {categories.map((item) => (
        <li className="category-item" key={item._id}>
          <span>{item.title}</span>
        </li>
      ))}
      <li className="category-item2"
        onClick={() => setIsAddModalOpen(true)}>
        <PlusOutlined className="md:text-2xl" />
      </li>
      <li className="category-item3"
        onClick={() => setIsEditModalOpen(true)}>
        <EditOutlined className="md:text-2xl" />
      </li>
      <Add
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
      <Edit
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
    </ul >
  );
};

export default Categories