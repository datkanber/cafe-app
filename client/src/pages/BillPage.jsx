import { Button, Input, Space, Spin, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import PrintBill from "../components/bills/PrintBill.jsx";
import Header from "../components/header/Header.jsx";
import { SearchOutlined } from "@ant-design/icons";
import replace from 'react-string-replace';

const BillPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [billItems, setBillItems] = useState([]);
    const [customer, setCustomer] = useState();
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "#1890ff" : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text, record) =>
            searchedColumn === dataIndex ? (
                replace(text.toString(), new RegExp(searchText, 'gi'), (match, i) => (
                    <span key={`${record._id}-${text}-${i}`} style={{ backgroundColor: "#ffc069", padding: 0 }}>
                        {match}
                    </span>
                ))
            ) : (
                text
            ),
    });

    useEffect(() => {
        const getBills = async () => {
            setIsLoading(true); // Set loading to true before fetching
            try {
                const res = await fetch(process.env.REACT_APP_SERVER_URL +  "/api/bills/get-all");
                const data = await res.json();
                setBillItems(data);
                setIsLoading(false); // Set loading to false after fetching
            } catch (error) {
                console.log(error);
                setIsLoading(false); // Ensure loading is set to false on error
            }
        };

        getBills();
    }, []);

    const columns = [
        {
            title: "Müşteri Adı",
            dataIndex: "customerName",
            key: "customerName",
            ...getColumnSearchProps("customerName"),
        },
        {
            title: "Telefon Numarası",
            dataIndex: "customerPhoneNumber",
            key: "customerPhoneNumber",
            ...getColumnSearchProps("customerPhoneNumber"),
        },
        {
            title: "Oluşturma Tarihi",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text, record) => (
                <span key={record._id + "-date"} className="cursor-pointer transition-all select-none">
                    {text.substring(0, 10)}
                </span>
            ),
        },
        {
            title: "Ödeme Yöntemi",
            dataIndex: "paymentMode",
            key: "paymentMode",
            ...getColumnSearchProps("paymentMode"),
        },
        {
            title: "Toplam Fiyat",
            dataIndex: "totalAmount",
            key: "totalAmount",
            render: (text, record) => (
                <span key={record._id + "-total"} className="cursor-pointer transition-all select-none">
                    {text}₺
                </span>
            ),
            sorter: (a, b) => a.totalAmount - b.totalAmount,
        },
        {
            title: "Actions",
            dataIndex: "action",
            key: "action",
            render: (_, record) => (
                <Button
                    key={record._id + "-action"}
                    type="link"
                    className="pl-0 cursor-pointer transition-all select-none"
                    onClick={() => {
                        setIsModalOpen(true);
                        setCustomer(record);
                    }}
                >
                    Yazdır
                </Button>
            ),
        },
    ];


    return (
        <>
            <Header />
            <h1 className="text-4xl font-bold text-center mb-4 cursor-pointer transition-all select-none">Faturalar</h1>
            {isLoading ? (
                <Spin
                    size="large"
                    className="absolute top-1/2 h-screen w-screen flex justify-center cursor-pointer transition-all select-none"
                />
            ) : (
                <div className="px-6">
                    <Table
                        dataSource={billItems}
                        columns={columns}
                        bordered
                        pagination={false}
                        scroll={{
                            x: 1000,
                            y: 300,
                        }}
                        rowKey="_id"
                    />
                </div>
            )}
            <PrintBill
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                customer={customer}
            />
        </>
    );
};
export default BillPage;