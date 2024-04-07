import { Button } from "antd";
import {
    ClearOutlined,
    PlusCircleOutlined,
    MinusCircleOutlined
} from "@ant-design/icons"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteCart } from "../../redux/cartSlice";


const CartTotals = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch()


    return (
        <div className='cart h-full max-h-[calc(100vh_-_88px)] flex flex-col cursor-pointer transition-all 
        select-none'>
            <h2 className="text-center py-4 text-white font-bold tracking-wide transition duration-300 bg-gradient-to-r category-item">
                Sepetteki Ürünler
            </h2>
            <ul className='cart-items px-2 flex-col gap-y-3 py-2 overflow-y-auto'>
                {cart.cartItems.map((item) => (
                    <li className='cart-item flex justify-between' key={item._id}>
                        <div className="flex items-center">
                            <img src={item.img}
                                alt=""
                                className="w-11 h-13 object-contain cursor-pointer"
                                onClick={() => dispatch(deleteCart(item))} />
                            <div className="flex flex-col ml-2" style={{ flexShrink: 1, maxWidth: '250px', overflowWrap: 'break-word' }}>
                                <b>{item.title}</b>
                                <span>{item.price}₺ x {item.quantity}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-1">
                            <Button
                                type="primary"
                                size="small"
                                className="w-full flex items-center plus_icon
                        justify-center !rounded-full"
                                icon={<PlusCircleOutlined />}
                            />
                            <span className="font-bold">{item.quantity}</span>
                            <Button
                                type="primary"
                                size="small"
                                className="w-full flex items-center minus_icon
                        justify-center !rounded-full"
                                icon={<MinusCircleOutlined />}
                            />
                        </div>
                    </li>
                ))}
            </ul>
            <div className='cart-totals mt-auto'>
                <div className="border-t border-b">
                    <div className="flex justify-between p-2">
                        <b>Ara Toplam</b>
                        <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
                    </div>
                    <div className="flex justify-between p-2">
                        <b>KDV %{cart.tax}</b>
                        <span className="text-red-700">
                            {(cart.total * cart.tax) / 100 > 0
                                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                                : 0}
                            ₺
                        </span>
                    </div>
                </div>
                <div className="border-b mt-4">
                    <div className="flex justify-between p-2">
                        <b className="text-xl text-green-600">Genel Toplam</b>
                        <span className="text-xl">{cart.total + (cart.total * cart.tax) / 100 > 0 ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2) : 0}₺</span>
                    </div>
                </div>
                <div className="py-4 px-2">
                    <Button type="primary" size="large" className="w-full category-item">
                        Sipariş Oluştur</Button>
                    <Button type="danger" size="large" className="w-full custom-danger-button
                    mt-2 flex items-center justify-center" icon={<ClearOutlined />}
                    >
                        Temizle</Button>
                </div>
            </div>
        </div>
    );
};

export default CartTotals