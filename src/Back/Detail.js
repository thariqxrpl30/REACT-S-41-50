import React, {useState} from 'react';
import useGet from "../Hook/useGet";
import { link } from "../Axios/link";
import { useForm } from "react-hook-form";

const Detail = () => {
    let no = 1;
    //untuk filter tanggal
    let today = new Date().toISOString().slice(0, 10);

    const [awal, setAwal] = useState('2022-03-01');
    const [akhir, setAkhir] = useState(today);

    const [isi] = useGet(`/detail/${awal}/${akhir}`);


    //untuk useForm / react hook form
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();

    //function untuk filter tanggal
    function cari(data) {
        setAwal(data.tawal);
        setAkhir(data.takhir);
    }

    return (
        <div>
            <div className="row">
                <h3 className="display-4">DETAIL PEMESANAN</h3>
            </div>

            <div className="row mt-2">
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
                <div className="">
                    <table className='table mt-3 w-80'>
                        <thead>
                            <tr>
                            </tr>
                                <th>No</th>
                                <th>Faktur</th>
                                <th>Tanggal Order</th>
                                <th>Menu</th>
                                <th>Harga</th>
                                <th>Jumlah</th>
                                <th>Total</th>
                        </thead>

                        <tbody>
                            { isi.map( (val, index)=>(
                                <tr key={index}>
                                    <td>{no++}</td>
                                    <td>{val.idorder}</td>
                                    <td>{val.tglorder}</td>
                                    <td>{val.menu}</td>
                                    <td>Rp. {val.harga}</td>
                                    <td>Rp. {val.jumlah}</td>
                                    <td>Rp. {val.harga * val.jumlah}</td>
                                </tr>
                            ) )} 
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Detail;
