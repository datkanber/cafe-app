import { Button, Carousel, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const res = await fetch(process.env.REACT_APP_SERVER_URL +  "/api/auth/register", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            });
            if (res.status === 200) {
                message.success("Kayıt işlemi başarılı.");
                navigate("/login");
                setLoading(false);
            }
        } catch (error) {
            message.error("Bir şeyler yanlış gitti.");
            console.log(error);
        }
    };

    return (
        <div className='h-screen hover:shadow-lg cursor-pointer transition-all 
        select-none'>
            <div className='flex justify-between h-full font-bold'>
                <div className='xl:px-20 px-10 flex flex-col h-full w-full justify-center relative'>
                    <div className="logo  flex justify-center pb-11">
                        <img src="https://www.https://www.burakkanber.dev.com.tr/data/_images/logo2.png" alt="logo" />
                    </div>
                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            label="Kullanıcı Adı"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Kullanıcı Adı Alanı Boş Bırakılamaz!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
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
                        <Form.Item
                            label="Parola Tekrar"
                            name="passwordAgain"
                            dependencies={["password"]}
                            rules={[
                                {
                                    required: true,
                                    message: "Parola Tekrar Alanı Boş Bırakılamaz!",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("password") === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error(
                                            "Şifreler aynı olmalıdır"));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary"
                                htmlType="submit"
                                className="w-full font-medium custom-button"
                                size="large"
                                loading={loading}
                            >
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className="flex justify-center absolute left-0 bottom-10 w-full">Bir hesabınız var mı?&nbsp;
                        <Link to="/login" className="text-blue-800 font-bold">Şimdi giriş yap</Link>
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

export default Register;
