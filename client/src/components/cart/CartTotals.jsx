import { Button } from "antd";
import {
    ClearOutlined,
    PlusCircleOutlined,
    MinusCircleOutlined
} from "@ant-design/icons"

const CartTotals = () => {
    return (
        <div className='cart h-full max-h-[calc(100vh_-_88px)] flex flex-col cursor-pointer transition-all 
        select-none'>
            <h2 className="text-center py-4 text-white font-bold tracking-wide transition duration-300 rounded-b-full bg-gradient-to-r from-blue-800 to-blue-600 hover:from-blue-600 hover:to-blue-400">
                Sepetteki Ürünler
            </h2>
            <ul className='cart-items px-2 flex-col gap-y-3 py-2 overflow-y-auto'>
                <li className='cart-item flex justify-between'>
                    <div className="flex items-center">
                        <img src="https://productimages.hepsiburada.net/s/76/550/110000018390364.jpg/format:webp"
                            alt=""
                            className="w-11 h-13 object-cover" />
                        <div className="flex flex-col ml-2" style={{ flexShrink: 1, maxWidth: '250px', overflowWrap: 'break-word' }}>
                            <b>Gameforce GF-8010 Cold 4X120MM Rainbow Fanlı Oyuncu Kasası</b>
                            <span>1.499,90₺ x 3</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <Button
                            type="primary"
                            size="small"
                            className="w-full flex items-center 
                            justify-center !rounded-full"
                            icon={<PlusCircleOutlined />}
                        />
                        <span className="">1</span>
                        <Button
                            type="primary"
                            size="small"
                            className="w-full flex items-center 
                            justify-center !rounded-full"
                            icon={<MinusCircleOutlined />}
                        />
                    </div>
                </li>
                <li className='cart-item flex justify-between'>
                    <div className="flex items-center">
                        <img src="https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg"
                            alt=""
                            className="w-11 h-13 object-cover" />
                        <div className="flex flex-col ml-2" style={{ flexShrink: 1, maxWidth: '250px', overflowWrap: 'break-word' }}>
                            <b>Computer i9 X Pro PCIS Version Boosted GPU</b>
                            <span>129.999₺ x 2</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <Button
                            type="primary"
                            size="small"
                            className="w-full flex items-center 
                            justify-center !rounded-full"
                            icon={<PlusCircleOutlined />}
                        />
                        <span className="">1</span>
                        <Button
                            type="primary"
                            size="small"
                            className="w-full flex items-center 
                            justify-center !rounded-full"
                            icon={<MinusCircleOutlined />}
                        />
                    </div>
                </li><li className='cart-item flex justify-between'>
                    <div className="flex items-center">
                        <img src="https://productimages.hepsiburada.net/s/393/550/110000417330440.jpg/format:webp"
                            alt=""
                            className="w-11 h-13 object-cover" />
                        <div className="flex flex-col ml-2" style={{ flexShrink: 1, maxWidth: '250px', overflowWrap: 'break-word' }}>
                            <b>OEM 512 MB PC133 Mhz Sd Ram</b>
                            <span>1.229,79₺ x 2</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <Button
                            type="primary"
                            size="small"
                            className="w-full flex items-center 
                            justify-center !rounded-full"
                            icon={<PlusCircleOutlined />}
                        />
                        <span className="">1</span>
                        <Button
                            type="primary"
                            size="small"
                            className="w-full flex items-center 
                            justify-center !rounded-full"
                            icon={<MinusCircleOutlined />}
                        />
                    </div>
                </li>
            </ul>
            <div className='cart-totals mt-auto'>
                <div className="border-t border-b">
                    <div className="flex justify-between p-2">
                        <b>Ara Toplam</b>
                        <span>1.432.433₺</span>
                    </div>
                    <div className="flex justify-between p-2">
                        <b>KDV %8</b>
                        <span className="text-red-700">+7.92₺</span>
                    </div>
                </div>
                <div className="border-b mt-4">
                    <div className="flex justify-between p-2">
                        <b className="text-xl text-green-500">Genel Toplam</b>
                        <span className="text-xl">172.859,58₺</span>
                    </div>
                </div>
                <div className="py-4 px-2">
                    <Button type="primary" size="large" className="w-full custom-button custom-button:hover">
                        Sipariş Oluştur</Button>
                    <Button type="primary" size="large" className="w-full custom-danger-button
                    mt-2 flex items-center justify-center custom-danger-button:hover" icon={<ClearOutlined />}
                        >
                        Temizle</Button>
                </div>
            </div>
        </div>
    );
};

export default CartTotals