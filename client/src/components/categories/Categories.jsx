import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons"
import { Modal, Form, Input, Button } from "antd";
import "./style.css";

const Categories = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <ul className="flex gap-4 md:flex-col text-xl">
      <li className="category-item">
        <span className="drop-shadow">Software</span>
      </li>
      <li className="category-item">
        <span className="drop-shadow">SAP</span>
      </li>
      <li className="category-item">
        <span className="drop-shadow">IOT</span>
      </li>
      <li className="category-item">
        <span className="drop-shadow">ABAP</span>
      </li>
      <li className="category-item">
        <span className="drop-shadow">Python</span>
      </li>
      <li className="category-item">
        <span className="drop-shadow">JavaScript</span>
      </li>
      <li className="category-item">
        <span className="drop-shadow">React</span>
      </li>
      <li className="category-item">
        <span className="drop-shadow">Fiori</span>
      </li>
      <li className="category-item2" onClick={() => setIsAddModalOpen(true)}>
        <PlusOutlined className="md:text-2xl" />
      </li>
      <Modal title="Yeni Kategori Ekle"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={false}
      >
        <Form layout="vertical">
          <Form.Item label="Kategori Ekle" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item className="flex justify-end">
            <Button type="primary" size="large" className="w-full custom-button custom-button:hover">Oluştur</Button> 
          </Form.Item>
        </Form>
      </Modal>
    </ul>
  )
}

export default Categories