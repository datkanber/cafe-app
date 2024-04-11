import { Button, Carousel, Checkbox, Form, Input, message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            });

            const user = await res.json();

            if (res.status === 200) {
                localStorage.setItem(
                    "posUser",
                    JSON.stringify({
                        username: user.username,
                        email: user.email,
                    })
                );
                message.success("Giriş işlemi başarılı.");
                navigate("/");
            } else if (res.status === 404) {
                message.error("Kullanıcı bulunamadı!");
            } else if (res.status === 403) {
                message.error("Şifre yanlış!");
            }
            setLoading(false);
        } catch (error) {
            message.error("Kullanıcı bulunamadı");
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <div className='h-screen hover:shadow-lg cursor-pointer transition-all 
        select-none'>
            <div className='flex justify-between h-full'>
                <div className='xl:px-20 px-10 flex flex-col h-full w-full justify-center relative'>
                    <div className="logo  flex justify-center pb-11">
                        <img src="https://www.pcis.com.tr/data/_images/logo2.png" alt="logo" />
                    </div>
                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                        initialValues={{
                            remember: false,
                        }}
                    >
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
                                className="w-full font-medium custom-button"
                                size="large"
                                loading={loading}
                            >
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className="flex justify-center absolute left-0 bottom-10 w-full">Henüz hesabınız yok mu?&nbsp;
                        <Link to="/register" className="text-blue-800 font-bold">Şimdi kaydol</Link>
                    </div>
                </div>
                <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-gradient h-full">
                    <div className="w-full h-full flex items-center">
                        <div className="w-full">
                            <Carousel className="!h-full px-6" autoplay>
                                <AuthCarousel img="/images/admin.svg" title="Responsive"
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
