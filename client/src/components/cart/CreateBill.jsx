import React from 'react';
import { Form, Modal, Input, Select, Button, Card } from 'antd';

const countryCodes = [
    { code: '+90', country: 'Turkey' },
    { code: '+1', country: 'United States' },
    { code: '+44', country: 'United Kingdom' },
    // Add more country codes as needed
];

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
    const [form] = Form.useForm(); // Form.useForm hook'undan form nesnesi oluşturuldu

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Modal className='hover:shadow-lg cursor-pointer transition-all 
        select-none'
            title="Fatura Oluştur"
            open={isModalOpen}
            footer={false}
            onCancel={() => setIsModalOpen(false)}
        >
            <Form layout={'vertical'} form={form} onFinish={onFinish}> {/* form nesnesini Form bileşenine ilettik */}
                <Form.Item
                    label="Müşteri Adı"
                    name={'customerName'}
                    rules={[
                        {
                            required: true,
                            message: 'Müşteri Adı Alanı Doldurulmalıdır.',
                        },
                    ]}
                >
                    <Input placeholder="Müşteri Adı Yazınız" />
                </Form.Item>
                <Form.Item
                    label="Telefon Numarası"
                    name={'phoneNumber'}
                    rules={[
                        {
                            required: true,
                            message: 'Telefon Numarası Girmelisiniz.',
                        },
                    ]}
                >
                    <div style={{ display: 'flex', width: '100%' }}>
                        <Select
                            style={{ width: '110px', marginRight: '8px' }}
                            placeholder="Ülke Kodu"
                            onChange={(value) => form.setFieldsValue({ phoneNumber: { ...form.getFieldValue('phoneNumber'), code: value } })}
                        >
                            {countryCodes.map((item) => (
                                <Select.Option key={item.code} value={item.code}>
                                    {item.code}
                                </Select.Option>
                            ))}
                        </Select>
                        <Input
                            style={{ flexGrow: 1 }}
                            placeholder="Telefon Numaranızı Giriniz"
                            maxLength={15}
                            onChange={(e) => form.setFieldsValue({ phoneNumber: { ...form.getFieldValue('phoneNumber'), number: e.target.value } })}
                        />
                    </div>
                </Form.Item>
                <Form.Item
                    label="Ödeme Yöntemi"
                    name={'billMethod'}
                    rules={[
                        {
                            required: true,
                            message: 'Ödeme Yöntemi Seçmelisiniz.',
                        },
                    ]}
                >
                    <Select placeholder="Ödeme Yöntemi Seçiniz">
                        <Select.Option value="Nakit">Nakit</Select.Option>
                        <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
                    </Select>
                </Form.Item>
                <Card>
                    <div
                        className="flex justify-between">
                        <span>Ara Toplam</span>
                        <span>549.00tl</span>
                    </div>
                    <div
                        className="flex justify-between my-2">
                        <span>KDV Toplam %8</span>
                        <span className="text-red-600">+43.93tl</span>
                    </div>
                    <div
                        className="flex justify-between">
                        <b>Toplam</b>
                        <b>549.00tl</b>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            className="mt-4 w-full custom-button"
                            type="primary"
                            size="large"
                            onClick={() => setIsModalOpen(true)}
                            htmlType="submit"
                        >Sipariş Oluştur</Button>
                    </div>
                </Card>
            </Form>
        </Modal>
    );
};

export default CreateBill