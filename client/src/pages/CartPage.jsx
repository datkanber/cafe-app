import { Button, Card, Input, message, Popconfirm, Space, Spin, Table } from "antd";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateBill from "../components/cart/CreateBill.jsx";
import Header from "../components/header/Header.jsx";
import { PlusCircleOutlined, MinusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { deleteCart, increase, decrease } from "../redux/cartSlice.js";
import replace from 'react-string-replace';

const CartPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 250); // Simulated fetch delay for initial load
        return () => clearTimeout(timer);
    }, []);

    const handleIncrease = async (record) => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 250)); // Simulate operation delay
        dispatch(increase(record));
        setIsLoading(false);
    };

    const handleDecrease = async (record) => {
        if (record.quantity > 1 || window.confirm("Ürün Silinsin Mi?")) {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 250)); // Simulate operation delay
            dispatch(decrease(record));
            message.success("Ürün Sepetten Silindi.");
            setIsLoading(false);
        }
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };

    // Column search props
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input ref={searchInput} placeholder={`Search ${dataIndex}`} value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: "block" }} />
                <Space>
                    <Button type="primary" onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />} size="small" style={{ width: 90 }}>Search</Button>
                    <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small"
                        style={{ width: 90 }}>Reset</Button>
                    <Button type="link" size="small" onClick={() => {
                        confirm({ closeDropdown: false });
                        setSearchText(selectedKeys[0]);
                        setSearchedColumn(dataIndex);
                    }}>Filter</Button>
                    <Button type="link" size="small" onClick={() => { close(); }}>Close</Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (<SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />),
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text, record, index) => searchedColumn === dataIndex ? (
            replace(text.toString(), new RegExp(searchText, 'gi'), (match, i) => (
                <span key={`${record.id}-${dataIndex}-${i}`} style={{ backgroundColor: "#ffc069", padding: 0 }}>
                    {match}
                </span>
            ))
        ) : (text)
    });

    const columns = [
        {
            title: "Ürün Görseli", dataIndex: "img", key: "img", width: "125px",
            render: (text) => <img src={text} alt="" className="w-full h-20 object-cover" />
        },
        { title: "Ürün Adı", dataIndex: "title", key: "title", ...getColumnSearchProps("title") },
        { title: "Kategori", dataIndex: "category", key: "category", ...getColumnSearchProps("category") },
        {
            title: "Ürün Fiyatı", dataIndex: "price", key: "price", render: (text) => <span>{text.toFixed(2)}₺</span>,
            sorter: (a, b) => a.price - b.price
        },
        {
            title: "Ürün Adeti", dataIndex: "quantity", key: "quantity",
            render: (text, record) => (
                <div className="flex items-center">
                    <Button type="primary" size="small" className="w-full flex items-center justify-center !rounded-full"
                        icon={<PlusCircleOutlined />} onClick={() => handleIncrease(record)} />
                    <span className="font-bold w-6 inline-block text-center quantity">{record.quantity}</span>
                    <Button type="primary" size="small" className="w-full flex items-center justify-center !rounded-full"
                        icon={<MinusCircleOutlined />} onClick={() => handleDecrease(record)} />
                </div>
            )
        },
        { title: "Toplam Fiyat", render: (text, record) => <span>{(record.quantity * record.price).toFixed(2)}₺</span> },
        {
            title: "Actions", render: (_, record) => (
                <Popconfirm title="Silmek için emin misiniz?" onConfirm={() => {
                    dispatch(deleteCart(record));
                    message.success("Ürün Sepetten Silindi.");
                }} okText="Evet" cancelText="Hayır">
                    <Button type="link" danger key={`delete-${record.id}`}>Sil</Button>
                </Popconfirm>
            )
        }
    ];

    return (
        <>
            <Header />
            <Spin spinning={isLoading} tip="loading...">
                <div className="px-6">
                    <Table dataSource={cart.cartItems} columns={columns} bordered pagination={false}
                        scroll={{ x: 1200, y: 300 }} rowKey="_id" />
                    <div className="cart-total flex justify-end mt-4">
                        <Card className="w-72">
                            <div className="flex justify-between">
                                <span>Ara Toplam</span>
                                <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
                            </div>
                            <div className="flex justify-between my-2">
                                <span>KDV %{cart.tax}</span>
                                <span className="text-red-600">{(cart.total * cart.tax) / 100 > 0 ? `+${((cart.total * cart.tax) / 100).toFixed(2)}` : 0}₺</span>
                            </div>
                            <div className="flex justify-between">
                                <b>Genel Toplam</b>
                                <b>{cart.total + (cart.total * cart.tax) / 100 > 0 ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2) : 0}₺</b>
                            </div>
                            <Button className="mt-4 w-full" type="primary" size="large" onClick={() => setIsModalOpen(true)}
                                disabled={cart.cartItems.length === 0}>Sipariş Oluştur</Button>
                        </Card>
                    </div>
                </div>
            </Spin>
            <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </>
    );
};

export default CartPage;
