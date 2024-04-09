import { Modal, Form, Table, Input, Button, message } from 'antd'
import React, { useState } from "react";

const Edit = ({
    isEditModalOpen,
    setIsEditModalOpen,
    categories,
    setCategories,
}) => {
    const [editingRow, setEditingRow] = useState({});

    const onFinish = (values) => {
        console.log(values);
        try {
            fetch("http://localhost:5000/api/categories/update-category", {
                method: "PUT",
                body: JSON.stringify({ ...values, categoryId: editingRow._id }),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            });
            message.success("Kategori başarıyla güncellenmiştir.");
            setCategories(categories.map((item) => {
                if (item._id === editingRow._id) {
                    return { ...item, title: values.title };
                }
                return item;
            })
            );
        } catch (error) {
            message.success("Kategori güncellenememiştir.");
            console.log(error);
        }
    };

    const deleteCategory = (id) => {
        if (window.confirm("Emin misiniz")) {
            try {
                fetch("http://localhost:5000/api/categories/delete-category", {
                    method: "DELETE",
                    body: JSON.stringify({ categoryId: id }),
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                });
                message.success("Kategori başarıyla silinmiştir.")
                setCategories(categories.filter((item) => item._id !== id));
            } catch (error) {
                message.success("Kategori silinememiştir.")
                console.log(error);
            }
        }
    };
    console.log(editingRow);
    const columns = [
        {
            title: "Category Title",
            dataIndex: "title",
            render: (_, record) => {
                if (record._id === editingRow._id) {
                    return (
                        <Form.Item className='mb-0' name="title">
                            <Input defaultValue={record.title} />
                        </Form.Item>
                    );
                } else {
                    return <p>{record.title}</p>;
                }
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (_, record) => {
                return (
                    <div>
                        <Button type="link" onClick={() => setEditingRow(record)} className="pl-0">
                            Düzenle
                        </Button>
                        <Button type="link" htmlType="submit" className='text-gray-500'>
                            Kaydet
                        </Button>
                        <Button type="link" danger onClick={() => deleteCategory(record._id)}>
                            Sil
                        </Button>
                    </div>
                )
            },
        },
    ];

    return (
        <Modal
            open={isEditModalOpen}
            title="Kategori İşlemleri"
            footer={false}
            onCancel={() => setIsEditModalOpen(false)}
            className='cursor-pointer transition-all 
            select-none'
        >
            <Form onFinish={onFinish}>
                <Table
                    bordered
                    dataSource={categories}
                    columns={columns}
                    rowKey={"_id"}
                />
            </Form>
        </Modal>
    );
};

export default Edit