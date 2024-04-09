import React from 'react';
import { Form, Modal, Input, Select, Button, Card, message } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const countryCodes = [
    { code: '+90', country: 'Turkey' },
    { code: '+1', country: 'United States' },
    { code: '+44', country: 'United Kingdom' },
];

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
    const [form] = Form.useForm();
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onFinish = async (values) => {
        try {
            const res = await fetch("http://localhost:5000/api/bills/add-bill", {
                method: "POST",
                body: JSON.stringify({
                    ...values,
                    subTotal: cart.total,
                    tax: ((cart.total * cart.tax) / 100).toFixed(2),
                    totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
                    cartItems: cart.cartItems,
                }),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            });
            if (res.status === 200) {
                message.success("Fatura başarıyla oluştu");
                dispatch(reset());
                navigate("/bills");
            }
        } catch (error) {
            message.danger("Fatura oluşmadı");
            console.log(error);
        }
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
                    name={'customerPhoneNumber'}
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
                    name={'paymentMode'}
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
                            disabled={cart.cartItems.length === 0}
                        >Sipariş Oluştur</Button>
                    </div>
                </Card>
            </Form>
        </Modal>
    );
};

export default CreateBill