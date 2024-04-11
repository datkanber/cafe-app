import React, { useEffect, useState } from 'react';
import Header from '../components/header/Header.jsx';
import StatisticCard from '../components/statistics/StatisticCard.jsx';
import { Tooltip, ResponsiveContainer, PieChart, Pie, Legend, Cell, Text } from 'recharts';
import { Spin } from 'antd';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

// Custom label component
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, value }) => {
    const radius = outerRadius + 10;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const label = `${name}: ${value}₺`;

    // Only display label if there's enough space
    if (radius * midAngle * RADIAN > label.length * 7) {
        return (
            <Text x={x} y={y} fill="#333" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {label}
            </Text>
        );
    }
    return null;
};

const StatisticPage = () => {
    const [data, setData] = useState([]);
    const [productSales, setProductSales] = useState([]);
    const user = JSON.parse(localStorage.getItem('posUser')) || {};

    useEffect(() => {
        fetch('http://localhost:5000/api/bills/get-all')
            .then(response => response.json())
            .then(json => {
                setData(json);
                const salesMap = {};
                json.forEach(bill => {
                    // Make sure to use the correct property name: 'cartItems'
                    (bill.cartItems || []).forEach(item => {
                        const { title, quantity, price } = item;
                        if (!salesMap[title]) {
                            salesMap[title] = { name: title, totalSales: 0, totalPrice: 0 };
                        }
                        salesMap[title].totalSales += quantity;
                        salesMap[title].totalPrice += price * quantity;
                    });
                });
                setProductSales(Object.values(salesMap));
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
                            <div style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie
                                            dataKey="totalPrice"
                                            nameKey="name"
                                            data={productSales}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={100}
                                            fill="#8884d8"
                                            label={renderCustomizedLabel} // Use the custom label
                                            labelLine={false}
                                        >
                                            {productSales.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => `${value}₺`} />
                                        <Legend />
                                    </PieChart>
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
