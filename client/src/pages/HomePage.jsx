import { Spin } from "antd";
import { useEffect, useState } from "react";
import CartTotals from "../components/cart/CartTotals";
import Categories from "../components/categories/Categories";
import Header from "../components/header/Header";
import Products from "../components/products/Products";

const HomePage = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Start both fetch requests and wait for them to complete
                const resCategories = fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/get-all");
                const resProducts = fetch(process.env.REACT_APP_SERVER_URL + "/api/products/get-all");

                // Wait for both fetch requests to complete and then process the JSON
                const [categoriesData, productsData] = await Promise.all([resCategories, resProducts])
                    .then(responses => Promise.all(responses.map(res => {
                        if (!res.ok) {
                            throw new Error(`HTTP error! status: ${res.status}`);
                        }
                        return res.json()
                    })));

                // Assuming setCategories and setProducts are setState actions from useState
                setCategories(categoriesData.map(item => ({ ...item, value: item.title })));
                setProducts(productsData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                // Ensure setLoading is called to update the state irrespective of success or failure
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    if (loading) {
        return <Spin size="large" className="absolute top-1/2 h-screen w-screen flex justify-center" />;
    }

    return (
        <>
            <Header setSearch={setSearch} />
            <div className="home px-6 flex md:flex-row flex-col justify-between gap-10 md:pb-0 pb-24 'cursor-pointer transition-all 
                        select-none h-screen">
                <div className="categories overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10">
                    <Categories
                        categories={categories}
                        setCategories={setCategories}
                        setFiltered={setFiltered}
                        products={products} />
                </div>
                <div className="products flex-[8] min-h-[500px] max-h-[calc(100vh_-_112px)] overflow-y-auto pb-10">
                    <Products
                        categories={categories}
                        filtered={filtered}
                        products={products}
                        setProducts={setProducts}
                        search={search}
                    />
                </div>
                <div className="pb-20 cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
                    <CartTotals />
                </div>
            </div>
        </>
    );
};

export default HomePage;
