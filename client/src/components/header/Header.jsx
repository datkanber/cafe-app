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


const Header = () => {
    return (
        <div className='border-b mb-6'>
            <header className='py-4 px-6 flex justify-between items-center gap-10'>
                <div className="logo">
                    <a href="/">
                        <h2 className='text-2xl font-bold
                    md:text-4xl'>PCIS</h2>
                    </a>
                </div>
                <div className="header-search flex-1 flex justify-center">
                    <Input
                        size="large"
                        placeholder="Ürün ara"
                        prefix={<SearchOutlined />}
                        className='rounded-full max-w-[800px]'
                    />
                </div>
                <div className="menu-links flex justify-between items-center gap-7 md:static 
                fixed bottom-0 md:w-auto w-screen md:bg-transparent bg-white left-0 
                md:border-t-0 border-t md:px-0 px-4 py-1">
                    <a href={"/"} className='menu-link flex flex-col hover:text-[#40a9ff] trasition-all'>
                        <HomeOutlined className='md:text-2xl text-xl' />
                        <span className='md:text-xs text-[10x]'>
                            Ana Sayfa
                        </span>
                    </a>
                    <Badge count={5} offset={[0, 0]} className='md:flex hidden'>
                        <a href={"/"} className='menu-link flex flex-col hover:text-[#40a9ff] trasition-all'>
                            <ShoppingCartOutlined className='md:text-2xl text-xl' />
                            <span className='md:text-xs text-[10x]'>
                                Sepet
                            </span>
                        </a>
                    </Badge>
                    <a href={"/"} className='menu-link flex flex-col hover:text-[#40a9ff] trasition-all'>
                        <CopyOutlined className='md:text-2xl text-xl' />
                        <span className='md:text-xs text-[10x]'>
                            Faturalar
                        </span>
                    </a>
                    <a href={"/"} className='menu-link flex flex-col hover:text-[#40a9ff] trasition-all'>
                        <UserOutlined className='md:text-2xl text-xl' />
                        <span className='md:text-xs text-[10x]'>
                            Müşteriler
                        </span>
                    </a>
                    <a href={"/"} className='menu-link flex flex-col hover:text-[#40a9ff] trasition-all'>
                        <PieChartOutlined className='md:text-2xl text-xl' />
                        <span className='md:text-xs text-[10x]'>
                            İstatistikler
                        </span>
                    </a>
                    <a href={"/"} className='menu-link flex flex-col hover:text-[#40a9ff] trasition-all'>
                        <LogoutOutlined className='md:text-2xl text-xl' />
                        <span className='md:text-xs text-[10x]'>
                            Çıkış
                        </span>
                    </a>
                </div>
                <Badge count={5} offset={[0, 0]} className='md:hidden flex'>
                    <a href={"/"} className='menu-link flex flex-col hover:text-[#40a9ff] trasition-all'>
                        <ShoppingCartOutlined className='text-xl' />
                        <span className='md:text-xs text-[10x]'>
                            Sepet
                        </span>
                    </a>
                </Badge>
            </header>
        </div>
    );
};
export default Header;