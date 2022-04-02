import React, {useState} from 'react';
import useGet from "../Hook/useGet";
import { useForm } from "react-hook-form";
import Modal from 'react-modal';
import { link } from "../Axios/link";


Modal.setAppElement('#root');
const Order = () => {
    let no = 1;
    //untuk filter tanggal
    let today = new Date().toISOString().slice(0, 10);

    const [awal, setAwal] = useState('2022-03-01');
    const [akhir, setAkhir] = useState(today);

    //untuk mengisi modal apakah true atau false
    const [mopen, setMopen] = useState(false);

    //untuk form modal
    const [total, setTotal] = useState(0);
    const [pelanggan, setPelanggan] = useState('');

    //untuk update pembayaran order
    const [idorder, setIdorder] = useState('');

    //untuk useForm / react hook form
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();

    const [isi] = useGet(`/order/${awal}/${akhir}`);

    //function untuk filter tanggal
    function cari(data) {
        setAwal(data.tawal);
        setAkhir(data.takhir);
    }

    //function untuk filter modal sehingga tak perlu ngambil ke api
    function filterData(id) {
        const data = isi.filter( (val)=>(val.idorder === id) );
        
        setPelanggan(data[0].pelanggan);
        setTotal(data[0].total);
        setIdorder(data[0].idorder);
        setMopen(true);
    }

    //memasukkan ke dalam form modal
    function isiForm() {
        setValue("total", total);
    }

    async function simpan(data) {
        //pengambilan data dr form setelah disubmit
        let hasil = {
            bayar:data.bayar,
            kembali:data.bayar - data.total,
            status:1
        }
        const res = await link.put("/order/"+idorder, hasil);
        setMopen(false);
    }


    return (
        <div>
            <Modal isOpen={mopen} onAfterOpen={isiForm} onRequestClose={ ()=>setMopen(false) } style={ { overlay: {background:'transparent !important'}, content: {
                background: '#f1f1f1',
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '10px',
                width: '50%',
            } } }>
                <h2 className='fw-normal'>Payment Of {pelanggan}</h2>
                <div className="row">
                    <div className="col">
                    <form onSubmit={handleSubmit(simpan)}>
                        <div className="mb-3">
                            <label htmlFor="total" className="form-label">
                                Total
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                {...register("total", { required: null })}
                            />
                        
                        </div>
                        <div className="mb-3">
                            <label htmlFor="bayar" className="form-label">
                                Bayar
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Nominal bayar"
                                {...register("bayar", { required: true, min:total })}
                            />
                            {errors.bayar && <span>Pembayaran kurang !</span>}
                        </div>
                        <div className="mb-4">
                            <input type="submit" className="btn btn-primary me-2" name="submit" value="Bayar" />
                            <input type="submit" className="btn btn-secondary " name="submit" value="Batal" onClick={ ()=>setMopen(false) } />
                        </div>
                    </form>
                    </div>
                </div>
                
            </Modal>

            <div className="row">
                <h2 className="display-4">DATA ORDER</h2>
            </div>

            <div className="row">
                <div className="col-4">
                    <form onSubmit={handleSubmit(cari)}>
                        <div className="mb-3">
                        <label htmlFor="tawal" className="form-label">
                            Tanggal Awal
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            name="tawal"
                            {...register("tawal")}
                        />
                        </div>

                        <div className="mb-3">
                        <label htmlFor="takhir" className="form-label">
                            Tanggal Akhir
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            name="takhir"
                            {...register("takhir")}
                        />
                        </div>

                        <div className="mb-2">
                            <input type="submit" className="btn btn-primary mb-3" name="submit"  />
                        </div>
                    </form>
                </div>
            </div>

            <div className="row">
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Faktur</th>
                                <th>Pelanggan</th>
                                <th>Tanggal Order</th>
                                <th>Total</th>
                                <th>Bayar</th>
                                <th>Kembali</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                isi.map( (val, index)=>(
                                    <tr key={index}>
                                        <td>{no++}</td>
                                        <td>{val.idorder}</td>
                                        <td>{val.pelanggan}</td>
                                        <td>{val.tglorder}</td>
                                        <td>{val.total}</td>
                                        <td>{val.bayar}</td>
                                        <td>{val.kembali}</td>
                                        <td>{
                                            val.status===0 ? <button onClick={ ()=>filterData(val.idorder) } className='btn btn-danger'>Belum Bayar</button> : <p>Lunas</p>
                                        }</td>
                                    </tr>
                                ) )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Order;
