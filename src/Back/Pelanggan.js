import React from 'react';
import useGet from "../Hook/useGet";
import useDelete from "../Hook/useDelete";

const Pelanggan = () => {
    let no = 1;
    const [isi] = useGet('/pelanggan');
    const {hapus, pesan} = useDelete('/pelanggan/');


    return (
        <div>
            <div className="row">
                <h2 className="display-4">DATA PELANGGAN</h2>
            </div>

            <div className="row mt-2">
                <p className="alert alert-dark" role="alert">
                {pesan}
                </p>
            </div>

            <div className="row">
                <table className="table mt-4">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Pelanggan</th>
                            <th>Alamat</th>
                            <th>Telepon</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            isi.map( (val, index)=>(
                                <tr key={index}>
                                    <td>{no++}</td>
                                    <td>{val.pelanggan}</td>
                                    <td>{val.alamat}</td>
                                    <td>{val.telp}</td>
                                    <td>
                                        <button onClick={() => hapus(val.idpelanggan)} className="btn btn-danger"> Delete</button>
                                    </td>
                                </tr>
                            ) )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Pelanggan;
