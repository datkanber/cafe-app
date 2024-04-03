import { Form, Input, Button, Carousel, Checkbox } from "antd";
import { Link } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";

const Login = () => {
    return (
        <div className='h-screen hover:shadow-lg cursor-pointer transition-all 
        select-none'>
            <div className='flex justify-between h-full'>
                <div className='xl:px-20 px-10 flex flex-col h-full w-full justify-center relative'>
                    <div className="logo  flex justify-center pb-11">
                        <img src="https://www.pcis.com.tr/data/_images/logo2.png" alt="logo" />
                    </div>
                    <Form layout="vertical font-medium">
                        <Form.Item
                            label="E-mail"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "E-mail Alanı Boş Bırakılamaz!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Parola"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Parola Alanı Boş Bırakılamaz!",
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item name={"remember"} valuePropName="checked">
                            <div className="flex justify-between items-center">
                                <Checkbox>Remember me</Checkbox>
                                <Link>Forgot Password?</Link>
                            </div>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary"
                                htmlType="submit"
                                className="w-full font-medium"
                                size="Large"
                            >
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className="flex justify-center absolute left-0 bottom-10 w-full">Henüz hesabınız yok mu?&nbsp;
                        <Link to="/register" className="text-blue-800 font-bold">Şimdi kaydol</Link>
                    </div>
                </div>
                <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-gradient2 h-full">
                    <div className="w-full h-full flex items-center">
                        <div className="w-full">
                            <Carousel className="!h-full px-6" autoplay>
                                <AuthCarousel img="/images/responsive.svg" title="Responsive"
                                    desc="Tüm Cihaz Boyutlarıyla Uyumluluk" />
                                <AuthCarousel img="/images/statistic.svg" title="İstatistikler"
                                    desc="Detaylı İstatistikler" />
                                <AuthCarousel img="/images/customer.svg" title="Müşteri Memnuniyeti"
                                    desc="Deneyim Sonunda Üründen Memnun Müşteriler" />
                                <AuthCarousel img="/images/responsive.svg" title="Yönetici Paneli"
                                    desc="Tek Yerden Yönetim" />
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
