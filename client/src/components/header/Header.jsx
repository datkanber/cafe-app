import {
    SearchOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    CopyOutlined,
    UserOutlined,
    PieChartOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { Input, Badge } from 'antd';
import * as React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className='border-b mb-6'>
            <header className='py-3 px-6 flex justify-between items-center gap-10'>
                <div className="logo">
                    <img src="https://www.pcis.com.tr/data/_images/logo2.png" alt="logo" />
                </div>
                <div className="header-search flex-1 flex justify-center">
                    <Input
                        size="large"
                        placeholder="Ürün ara"
                        prefix={<SearchOutlined />}
                        className='rounded-full max-w-[800px]'
                    />
                </div>
                <div className="menu-links flex justify-between items-center gap-9 md:static 
                fixed z-50 bottom-0 md:w-auto w-screen md:bg-transparent bg-white left-0 
                md:border-t-0 border-t md:px-0 px-4 py-1">
                    <Link
                        to={"/"} className='menu-link flex flex-col hover:text-[#40a9ff] trasition-all'>
                        <HomeOutlined className='md:text-2xl text-xl block' />
                        <span className='md:text-xs text-[10x] text-center'>
                            Ana Sayfa
                        </span>
                    </Link>
                    <Badge count={5} offset={[0, 0]} className='md:flex hidden'>
                        <Link
                            to={"/cart"}
                            className='menu-link flex flex-col hover:text-[#40a9ff] trasition-all'
                        >
                            <ShoppingCartOutlined className='md:text-2xl text-xl block' />
                            <span className='md:text-xs text-[10x] text-center'>
                                Sepet
                            </span>
                        </Link>
                    </Badge>
                    <Link to={"/bills"} className='menu-link flex flex-col hover:text-[#40a9ff] trasition-all'>
                        <CopyOutlined className='md:text-2xl text-xl block' />
                        <span className='md:text-xs text-[10x] text-center'>
                            Faturalar
                        </span>
                    </Link>
                    <Link to={"/"} className='menu-link flex flex-col hover:text-[#40a9ff] trasition-all'>
                        <UserOutlined className='md:text-2xl text-xl block' />
                        <span className='md:text-xs text-[10x] text-center'>
                            Müşteriler
                        </span>
                    </Link>
                    <Link to={"/"} className='menu-link flex flex-col hover:text-[#40a9ff] trasition-all'>
                        <PieChartOutlined className='md:text-2xl text-xl block' />
                        <span className='md:text-xs text-[10x] text-center'>
                            İstatistikler
                        </span>
                    </Link>
                    <Link to={"/"} className='menu-link flex flex-col hover:text-[#40a9ff] trasition-all'>
                        <LogoutOutlined className='md:text-2xl text-xl block' />
                        <span className='md:text-xs text-[10x] text-center'>
                            Çıkış
                        </span>
                    </Link>
                </div>
                <Badge count={5} offset={[0, 0]} className='md:hidden flex'>
                    <Link to={"/"} className='menu-link flex flex-col hover:text-[#40a9ff] trasition-all'>
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