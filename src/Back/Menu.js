import React, { useState, useEffect } from "react";
import useGet from "../Hook/useGet";
import useDelete from "../Hook/useDelete";
import { useForm } from "react-hook-form";
import { link } from "../Axios/link";

const Menu = () => {
  let no = 1;
  const [isi] = useGet("/menu");
  const { hapus, pesan, setPesan } = useDelete("/menu/");
  //untuk useForm / react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  //utk usestate
  const [kategori, setKategori] = useState([]);
  const [gambar, setGambar] = useState([]);
  const [idkategori, setIdkategori] = useState([]);
  //utk pilihan button submit/edit :
  const [pilihan, setPilihan] = useState(true);
  const [idmenu, setIdmenu] = useState([]);

  //menggunakan cleanup
  useEffect(() => {
    let ambil = true;
    async function fetchData() {
      const res = await link.get("/kategori");
      if (ambil) {
        setKategori(res.data);
      }
    }

    fetchData();
    return () => {
      ambil = false;
    };
  }, [kategori]);

  //function untuk simpan/insert data data
  function simpan(data) {
    // console.log(data);
    // console.log(data.gambar[0]);

    const formData = new FormData();
    formData.append("idkategori", data.idkategori);
    formData.append("menu", data.menu);
    formData.append("gambar", data.gambar[0]);
    formData.append("harga", data.harga);

    if (pilihan) {
        link.post("/menu", formData).then((res) => setPesan(res.data.pesan));
        setPilihan(true);
    } else {
        link.post("/menu/" + idmenu, formData).then((res) => setPesan(res.data.pesan));
        setPilihan(true);
    }

    reset();
  }

  //function untuk showdata
  async function showData(id) {
      const res = await link.get('/menu/' + id);
      console.log(res.data);

      setValue("menu", res.data[0].menu);
      setGambar(<img src={res.data[0].gambar} className="img-thumbnail" />);
      setValue("harga", res.data[0].harga);
      setIdkategori(res.data[0].idkategori);
      setIdmenu(res.data[0].idmenu);
      setPilihan(false);
  }

  let title, button;
  //judul form
  if (pilihan) {
    title = "Add Data";
  } else {
    title = "Edit Data";
  }

  //pilihan button
  if (pilihan) {
    button = "Add"
  } else {
    button = "Save Change"
  }

  return (
    <div>
      <div className="row">
        <h2 className="display-4">DATA MENU</h2>
      </div>

      <div className="row">
        <div className="col-4">
          <h4>{title}</h4>

          <form onSubmit={handleSubmit(simpan)}>
            <div className="mb-3">
              <label htmlFor="menu" className="form-label">
                Kategori
              </label>
              <br />
              <select
                name="idkategori"
                className="form-select"
                {...register("idkategori", { required: true })}
              >
                {kategori.map((val, index) => val.idkategori===idkategori ? (
                    <option key={index} selected value={val.idkategori}>{val.kategori}</option>
                ) : (
                    <option key={index} value={val.idkategori}>{val.kategori}</option>
                ) )}
              </select>
              {errors.kategori && (
                <span>
                  <em>*Kategori is required!</em>
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="menu" className="form-label">
                Menu
              </label>
              <input
                type="text"
                className="form-control"
                name="menu"
                {...register("menu", { required: true })}
              />
              {errors.menu && (
                <span>
                  <em>*Menu is required!</em>
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="gambar" className="form-label">
                Gambar
              </label>
              <input
                type="file"
                className="form-control"
                name="gambar"
                {...register("gambar", { required: null })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="harga" className="form-label">
                Harga
              </label>
              <input
                type="number"
                className="form-control"
                name="harga"
                {...register("harga", { required: true })}
              />
              {errors.harga && (
                <span>
                  <em>*Harga is required!</em>
                </span>
              )}
            </div>
            <div className="mb-2">
              <input type="submit" className="btn btn-primary" name="submit" value={button} />
            </div>
          </form>
        </div>

        <div className="col-4">
            {gambar}
        </div>
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
              <th>Kategori</th>
              <th>Menu</th>
              <th>Gambar</th>
              <th>Harga</th>
              <th>Delete</th>
              <th>Change</th>
            </tr>
          </thead>

          <tbody>
            {isi.map((val, index) => (
              <tr key={index}>
                <td>{no++}</td>
                <td>{val.kategori}</td>
                <td>{val.menu}</td>
                <td>
                  <img src={val.gambar} height="100" width="150" />
                </td>
                <td>Rp. {val.harga}</td>
                <td>
                  <button
                    onClick={() => hapus(val.idmenu)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
                <td>
                    <button
                      onClick={() => showData(val.idmenu)}
                      className="btn btn-secondary"
                    >
                      Edit
                    </button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Menu;
