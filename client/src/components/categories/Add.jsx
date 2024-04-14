import React from 'react'
import { Form, Modal, Input, Button, message } from 'antd';

const Add = ({
    isAddModalOpen,
    setIsAddModalOpen,
    categories,
    setCategories
}) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        try {
            fetch("http://localhost:5001/api/categories/add-category", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            });
            message.success("Kategori başarıyla eklendi.");
            form.resetFields();
            setCategories([...categories, {
                _id: Math.random(),
                title: values.title,
            }]);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal
            title="Yeni Kategori Ekle"
            open={isAddModalOpen}
            onCancel={() => setIsAddModalOpen(false)}
            footer={false}
            className='cursor-pointer transition-all 
            select-none'
        >
            <Form layout="vertical" onFinish={onFinish} form={form}>
                <Form.Item
                    className="font-bold"
                    name="title"
                    label="Kategori Ekle"
                    rules={[{ required: true, message: "Lütfen kategori adı giriniz" }]}>
                    <Input />
                </Form.Item>
                <Form.Item className="flex justify-end mb-0">
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="large"
                        className="w-full custom-button custom-button:hover"
                    >Oluştur
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default Add