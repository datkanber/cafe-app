import { Modal } from 'antd';


const PrintBill = ({ isModalOpen, setIsModalOpen }) => {
    return (
        <Modal
            title="Fatura Yazdır"
            open={isModalOpen}
            footer={false}
            onCancel={() => setIsModalOpen(false)}
            width={800}
        >
            <section className='py-20 bg-slate-300'>
                <div className='max-w-5xl mx-auto bg-white px-6'>
                    <article className='overflow-hidden'>
                        <div className="logo my-6">
                            <img src="https://www.pcis.com.tr/data/_images/logo2.png" alt="logo" />
                        </div>
                        <div className="bill-details">
                            <div className='grid grid-cols-4 gap-12'>
                                <div className='text-md text-slate-500'>
                                    <p className='font-bold text-slate-700'>Fatura Detayı:</p>
                                    PCIS
                                    <p>Street 123</p>
                                    <p>Kartal</p>
                                    <p>Evreka Sit.</p>
                                </div>
                                <div className='text-md text-slate-500'>
                                    <p className='font-bold text-slate-700'>Fatura:</p>
                                    Bilgi İşlem ve Danışmanlık Hiz. Ltd. Şti.
                                    <p>Street 123</p>
                                    <p>Kartal</p>
                                    <p>CA 0000</p>
                                </div>
                                <div className='text-md text-slate-500'>
                                    <div>
                                        <p className='font-bold text-slate-700'>Fatura Numarası:</p>
                                        00034
                                    </div>
                                    <div>
                                        <p className='font-bold text-slate-700 mt-2'>Veriliş Tarihi:</p>
                                        <p>2024-03-26</p>
                                    </div>
                                </div>
                                <div className='text-md text-slate-500'>
                                    <div>
                                        <p className='font-bold text-slate-700'>Şartlar:</p>
                                        10 Gün
                                    </div>
                                    <div>
                                        <p className='font-bold text-slate-700'>Vade</p>
                                        <p>2024-11-26</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='bill-table-area mt-8'>
                            <table className='min-w-full divide-y divide-slate-500
                         overflow-hidden'>
                                <thead>
                                    <tr> 
                                        <th scope="col" className='py-3.5 pl-4 
                                    text-left text-sm font-normal text-slate-700
                                     sm:pl-6 md:pl-0 sm:table-cell hidden'>Görsel</th>
                                        <th scope="col" className='py-3.5 pl-4 
                                    text-left text-sm font-normal text-slate-700
                                     sm:pl-6 md:pl-0 sm:table-cell hidden'>Başlık</th>
                                        <th scope="col" className='py-3.5 pl-4 
                                    text-left text-sm font-normal text-slate-700
                                     sm:pl-6 md:pl-0 sm:table-cell hidden'>Fiyat</th>
                                        <th scope="col" className='py-3.5 pl-4 text-center
                                     text-sm font-normal text-slate-700
                                     sm:pl-6 md:pl-0 sm:table-cell hidden'>Adet</th>
                                        <th scope="col" className='py-3.5 pl-4 
                                    text-end text-sm font-normal text-slate-700
                                     sm:pl-6 md:pl-0 sm:table-cell hidden'>Toplam</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='border-b border-t border-slate-200'>
                                        <td className='py-4'>
                                            <img src="https://cdn.thewirecutter.com/wp-content/media/2023/06/bestlaptops-2048px-9765.jpg" alt="" className='w-14 h-12 object-scale-down' />
                                        </td>
                                        <td className='py-4'>
                                            <span className='font-medium'>Computer i9 GPU Powered Emparite</span>
                                        </td>
                                        <td className='py-4 text-left'>
                                            <span>129.999₺</span>
                                        </td>
                                        <td className='py-4 pr-1 text-center'>
                                            <span>2</span>
                                        </td>
                                        <td className='py-4 pr-1 text-end'>
                                            <span>259.990₺</span>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr className='border-b border-t border-slate-200'>
                                        <td className='py-4'>
                                            <img src="https://cdn.thewirecutter.com/wp-content/media/2023/06/bestlaptops-2048px-9765.jpg" alt="" className='w-14 h-12 object-scale-down' />
                                        </td>
                                        <td className='py-4'>
                                            <span className='font-medium'>Computer i9 GPU Powered Emparite</span>
                                        </td>
                                        <td className='py-4 pr-3 text-left'>
                                            <span>129.999₺</span>
                                        </td>
                                        <td className='py-4 pr-1 text-center'>
                                            <span>2</span>
                                        </td>
                                        <td className='py-4 pr-1 text-end'>
                                            <span>259.990₺</span>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr className='border-b border-t border-slate-200'>
                                        <td className='py-4 pr-3'>
                                            <img src="https://cdn.thewirecutter.com/wp-content/media/2023/06/bestlaptops-2048px-9765.jpg" alt="" className='w-14 h-12 object-scale-down' />
                                        </td>
                                        <td className='py-4 pr-3'>
                                            <span className='font-medium'>Computer i9 GPU Powered Emparite</span>
                                        </td>
                                        <td className='py-4 pr-3 text-left'>
                                            <span>129.999₺</span>
                                        </td>
                                        <td className='py-4 pr-1 text-center'>
                                            <span>2</span>
                                        </td>
                                        <td className='py-4 pr-1 text-end'>
                                            <span>259.990₺</span>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr className='border-b border-t border-slate-200'>
                                        <td className='py-4 pr-3'>
                                            <img src="https://cdn.thewirecutter.com/wp-content/media/2023/06/bestlaptops-2048px-9765.jpg" alt="" className='w-14 h-12 object-scale-down' />
                                        </td>
                                        <td className='py-4 pr-3'>
                                            <span className='font-medium'>Computer i9 GPU Powered Emparite</span>
                                        </td>
                                        <td className='py-4 pr-3 text-left'>
                                            <span>129.999₺</span>
                                        </td>
                                        <td className='py-4 pr-1 text-center'>
                                            <span>2</span>
                                        </td>
                                        <td className='py-4 pr-1 text-end'>
                                            <span>259.990₺</span>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th className='text-right pt-6 pr-3' colSpan="4" scope='row'>
                                            <span className='font-normal text-slate-700'>
                                                Ara Toplam
                                            </span>
                                        </th>
                                        <th className='text-right pt-6' scope='row'>
                                            <span className='font-normal text-slate-700'>
                                                1,039,992.00₺
                                            </span>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className='text-right pt-6 pr-3' colSpan="4" scope='row'>
                                            <span className='font-normal text-slate-700'>
                                                KDV
                                            </span>
                                        </th>
                                        <th className='text-right pt-6' scope='row'>
                                            <span className='font-normal text-red-600'>
                                                +83,199.36₺
                                            </span>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className='text-right pt-6 pr-3' colSpan="4" scope='row'>
                                            <span className='font-normal text-slate-700'>
                                                Ara Toplam
                                            </span>
                                        </th>
                                        <th className='text-right pt-6' scope='row'>
                                            <span className='font-normal text-slate-700'>
                                                1,039,992.00₺
                                            </span>
                                        </th>
                                    </tr>
                                </tfoot>
                            </table>
                            <div className='py-9'>
                                <div className='pt-2 border-b border-t border-slate-200'>
                                    <p className='text-sm font-light text-slate-700'>
                                        Ödeme koşulları 14 gündür. Paketlenmemiş Borçların Geç
                                        Ödenmesi Yasası 0000'e göre, serbest çalışanların bu süreden
                                        sonra borçların ödenmemesi durumunda 00.00 gecikme ücreti
                                        talep etme hakkına sahip olduklarını ve bu noktada bu ücrete
                                        ek olarak yeni bir fatura sunulacağını lütfen unutmayın.
                                        Revize faturanın 15 gün içinde ödenmemesi durumunda, vadesi
                                        geçmiş hesaba ek faiz ve %8 yasal oran artı %0,5 banka tabanı
                                        olmak üzere toplamda %88.5 uygulanacaktır. Taraflar Kanun hükümleri
                                        dışında sözleşme yapamazlar.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        </Modal >
    );
};

export default PrintBill;