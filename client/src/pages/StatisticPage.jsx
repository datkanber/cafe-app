import React, { useEffect, useState } from 'react';
import Header from '../components/header/Header.jsx';
import StatisticCard from '../components/statistics/StatisticCard.jsx';
import { Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { Spin } from 'antd';

const StatisticPage = () => {
    const [data, setData] = useState([]);
    const [productSales, setProductSales] = useState([]);
    const [topCustomers, setTopCustomers] = useState([]);
    const user = JSON.parse(localStorage.getItem('posUser')) || {};

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_URL +  "/api/bills/get-all")
            .then(response => response.json())
            .then(json => {
                setData(json);
                const salesMap = {};
                const customerSales = {};
                json.forEach(bill => {
                    // For product sales
                    (bill.cartItems || []).forEach(item => {
                        const { title, quantity, price } = item;
                        if (!salesMap[title]) {
                            salesMap[title] = { name: title, totalSales: 0, totalPrice: 0 };
                        }
                        salesMap[title].totalSales += quantity;
                        salesMap[title].totalPrice += price * quantity;
                    });

                    // For top customers
                    const name = bill.customerName;
                    if (!customerSales[name]) {
                        customerSales[name] = { name, totalAmount: 0 };
                    }
                    customerSales[name].totalAmount += bill.totalAmount;
                });
                setProductSales(Object.values(salesMap));
                setTopCustomers(Object.values(customerSales).sort((a, b) => b.totalAmount - a.totalAmount).slice(0, 5)); // Top 5
            })
            .catch(error => {
                console.log('fetch data failed', error);
            });
    }, []);

    const totalAmount = () => {
        return `${data.reduce((total, bill) => total + bill.totalAmount, 0).toFixed(2)}₺`;
    };

    return (
        <>
            <Header />
            <h1 className="text-4xl font-bold text-center mb-4 cursor-pointer transition-all select-none">İstatistiklerim</h1>
            {data.length > 0 ? (
                <div className="px-6 md:pb-0 pb-20">
                    <div className="statistic-section">
                        <h2 className="text-lg cursor-pointer transition-all select-none">
                            Hoş geldin <span className="text-green-700 font-bold text-xl">{user.username || 'Kullanıcı'}</span>.
                        </h2>
                        <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-10 gap-4">
                            <StatisticCard title="Toplam Müşteri" amount={data.length} img="images/user.png" />
                            <StatisticCard title="Toplam Kazanç" amount={totalAmount()} img="images/money.png" />
                            <StatisticCard title="Toplam Satış" amount={data.length} img="images/total.png" />
                            <StatisticCard title="Toplam Ürün" amount={productSales.length} img="images/product.png" />
                        </div>
                        <div className="flex justify-between gap-10 lg:flex-row flex-col items-center">
                            {/* Bar Chart for Product Sales */}
                            <div style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                    <BarChart data={productSales} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip formatter={(value, name) => {
                                            if (name === "Satılan Ürün Adedi") {
                                                return `${value} adet`;
                                            }
                                            if (name === "Toplam Gelir") {
                                                return `${value}₺`;
                                            }
                                            return value;
                                        }} />
                                        <Legend />
                                        <Bar dataKey="totalSales" fill="#8884d8" name="Satılan Ürün Adedi" />
                                        <Bar dataKey="totalPrice" fill="#82ca9d" name="Toplam Gelir" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            {/* Bar Chart for Top Customers */}
                            <div style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                    <BarChart data={topCustomers} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" />
                                        <YAxis dataKey="name" type="category" />
                                        <Tooltip formatter={(value) => `${value}₺`} />
                                        <Legend />
                                        <Bar dataKey="totalAmount" fill="#413ea0" name="Toplam Fatura Tutarı" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Spin size="large" className="absolute top-1/2 h-screen w-screen flex justify-center cursor-pointer transition-all select-none" />
            )}
        </>
    );
};

export default StatisticPage;
