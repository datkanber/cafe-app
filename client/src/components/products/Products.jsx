import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "./Add";
import { useNavigate } from "react-router-dom";

const Products = ({ categories, filtered, products, setProducts, search }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/products/get-all");
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.log(error);
            }
        };
        getProducts();
    }, [setProducts]); // Including setProducts in the dependency array


    return (
        <div className="products-wrapper grid grid-cols-card gap-4">
            {filtered.filter((product) => product.title.toLowerCase().includes(search)).map((item) => (
                <ProductItem item={item} key={item._id} />
            ))}

            <div
                className="product-item border hover:shadow-lg cursor-pointer transition-all select-none flex justify-center min-h-[180px] category-item2"
                onClick={() => setIsAddModalOpen(true)}
            >
                <PlusOutlined className="text-white md:text-2xl" />
            </div>
            <div className="product-item border hover:shadow-lg cursor-pointer transition-all select-none category-item3
            flex justify-center items-center hover:opacity-90 min-h-[180px]" onClick={() => navigate("/products")}>
                <EditOutlined className="text-white md:text-2xl" />
            </div>
            <Add
                isAddModalOpen={isAddModalOpen}
                setIsAddModalOpen={setIsAddModalOpen}
                categories={categories}
                products={products}
                setProducts={setProducts}
            />
        </div>
    );
};

export default Products;
