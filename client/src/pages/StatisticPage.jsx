import { useEffect, useState } from "react";
import Header from "../components/header/Header.jsx";
import StatisticCard from "../components/statistics/StatisticCard.jsx";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const StatisticPage = () => {
    const [data, setData] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        const asyncFetch = () => {
            fetch("https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json")
                .then((response) => response.json())
                .then((json) => {
                    setData(json);
                    setIsDataLoaded(true); // Veriler yüklendiğinde durumu güncelle
                })
                .catch((error) => {
                    console.log("fetch data failed", error);
                });
        };

        asyncFetch();
    }, []);

    const data2 = [
        { type: '分类一', value: 27 },
        { type: '分类二', value: 25 },
        { type: '分类三', value: 18 },
        { type: '分类四', value: 15 },
        { type: '分类五', value: 10 },
        { type: '其他', value: 5 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

    return (
        <>
            <Header />
            <div className="px-6 md:pb-0 pb-36 pt-5 cursor-pointer transition-all 
        select-none">
                <h1 className="text-4xl font-bold text-center mb-4">İstatistiklerim</h1>
                <div className="statistic-section">
                    <h2 className="text-lg">
                        Hoşgeldiniz <span className="text-black-700 font-bold text-xl">adminpcis</span>
                    </h2>
                    <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-10 gap-4 pb-10">
                        <StatisticCard
                            title={"Toplam Müşteri"}
                            amount={"10"}
                            img={"images/user.png"}
                        />
                        <StatisticCard
                            title={"Toplam Kazanç"}
                            amount={"660.96 ₺"}
                            img={"images/money.png"}
                        />
                        <StatisticCard
                            title={"Toplam Satış"}
                            amount={"6"}
                            img={"images/total.png"}
                        />
                        <StatisticCard
                            title={"Toplam Ürün"}
                            amount={"28"}
                            img={"images/product.png"}
                        />
                    </div>
                    {isDataLoaded && (
                        <div className="flex justify-between gap-10 lg:flex-row flex-col items-center md:pl-32 pr-5">
                            <div className="chart-container lg:w-1/2 lg:h-full h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data}
                                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="timePeriod" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="chart-container lg:w-1/2 lg:h-full h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={data2} dataKey="value" fill="#8884d8" label>
                                            {data2.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default StatisticPage;
