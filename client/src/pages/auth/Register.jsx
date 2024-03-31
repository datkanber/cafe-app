import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div className='h-screen'>
            <div className='flex justify-between h-full'>
                <div className='xl:px-20 px-10 flex flex-col h-full w-full justify-center relative'>
                    <h1 className='text-center text-5xl font-bold mb-3 pb-2'>PCIS</h1>
                    <Form layout="vertical">
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
                            rules={[
                                {
                                    required: true,
                                    message: "Parola Tekrar Alanı Boş Bırakılamaz!",
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary"
                                htmlType="submit"
                                className="w-full"
                                size="Large"
                            >
                                Kaydol
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className="flex justify-center absolute left-0 bottom-10 w-full">Bir hesabınız var mı?&nbsp;
                        <Link to="/login" className="text-blue-400">Şimdi giriş yap</Link>
                    </div>
                </div>
                <div className="xl:w-4/6 min-w-[800px]">right</div>
            </div>
        </div>
    );
};

export default Register;
