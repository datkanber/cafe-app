import {
    SearchOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    CopyOutlined,
    UserOutlined,
    PieChartOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { Input, Badge, message } from 'antd';
import * as React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";



const Header = ({ setSearch }) => {
    const cart = useSelector((state) => state.cart);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const logOut = () => {
        if (window.confirm("Çıkış yapmak istediğinize emin misiniz ?")) {
            localStorage.removeItem("posUser");
            navigate("/login");
            message.success("Çıkış işlemi başarılı.");
        }
    };

    return (
        <div className='border-b mb-6 shadow-lg cursor-pointer transition-all select-none'>
            <header className='py-3 px-6 flex justify-between items-center gap-10'>
                <div className="logo">
                    <img src="https://www.pcis.com.tr/data/_images/logo2.png" alt="logo" />
                </div>
                <div className="header-search flex-1 flex justify-center" onClick={() => {
                    pathname !== "/" && navigate("/")
                }}
                >
                    <Input
                        size="large"
                        placeholder="Ürün ara"
                        prefix={<SearchOutlined />}
                        className='rounded-full max-w-[800px]'
                        id="productSearch"
                        name="productSearch"
                        onChange={(e) => setSearch(e.target.value.toLowerCase())}
                    />
                </div>
                <div className="menu-links flex justify-between items-center gap-9 md:static 
                fixed z-50 bottom-0 md:w-auto w-screen md:bg-transparent bg-white left-0 
                md:border-t-0 border-t md:px-0 px-4 py-1">
                    <Link to="/" className={`menu-link ${pathname === "/" ? "active" : ""}`}>
                        <HomeOutlined className='md:text-2xl text-xl block' />
                        <span className='md:text-xs text-[10x] text-center'>
                            Ana Sayfa
                        </span>
                    </Link>
                    <Badge count={cart.cartItems.length} offset={[0, 0]} className='md:flex hidden'>
                        <Link to="/cart" className={`menu-link ${pathname === "/cart" ? "active" : ""}`}>
                            <ShoppingCartOutlined className='md:text-2xl text-xl block' />
                            <span className='md:text-xs text-[10x] text-center'>
                                Sepet
                            </span>
                        </Link>
                    </Badge>
                    <Link to="/bills" className={`menu-link ${pathname === "/bills" ? "active" : ""}`}>
                        <CopyOutlined className='md:text-2xl text-xl block' />
                        <span className='md:text-xs text-[10x] text-center'>
                            Faturalar
                        </span>
                    </Link>
                    <Link to="/customers" className={`menu-link ${pathname === "/customers" ? "active" : ""}`}>
                        <UserOutlined className='md:text-2xl text-xl block' />
                        <span className='md:text-xs text-[10x] text-center'>
                            Müşteriler
                        </span>
                    </Link>
                    <Link to="/statistic" className={`menu-link ${pathname === "/statistic" ? "active" : ""}`}>
                        <PieChartOutlined className='md:text-2xl text-xl block' />
                        <span className='md:text-xs text-[10x] text-center'>
                            İstatistikler
                        </span>
                    </Link>
                    <div onClick={logOut}>
                        <Link to="/" className={`menu-link2 ${pathname === "/" ? "active" : ""}`}>
                            <LogoutOutlined className='md:text-2xl text-xl block' />
                            <span className='md:text-xs text-[10px] text-center'>
                                Çıkış
                            </span>
                        </Link>
                    </div>
                </div>
                <Badge count={cart.cartItems.length} offset={[0, 0]} className='md:hidden flex'>
                    <Link to="/cart" className={`menu-link ${pathname === "/cart" ? "active" : ""}`}>
                        <ShoppingCartOutlined className='text-xl block' />
                        <span className='md:text-xs text-[10x] text-center'>
                            Sepet
                        </span>
                    </Link>
                </Badge>
            </header>
        </div>
    );
};
export default Header;