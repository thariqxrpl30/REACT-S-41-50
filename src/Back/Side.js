import React from "react";
import { Link } from 'react-router-dom';


const Side = () => {
    
  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-header">Menu Aplikasi</div>
        <ul className="list-group list-group-flush">
            <Link to="kategori" className="text-decoration-none">
            <li className="list-group-item">Kategori</li></Link>

            <Link to="menu" className="text-decoration-none">
            <li className="list-group-item">Menu</li></Link>

            <Link to="pelanggan" className="text-decoration-none">
            <li className="list-group-item">Pelanggan</li></Link>

            <Link to="order" className="text-decoration-none">
            <li className="list-group-item">Order</li></Link>

            <Link to="detail" className="text-decoration-none">
            <li className="list-group-item">Order Detail</li></Link>

            <Link to="user" className="text-decoration-none">
            <li className="list-group-item">User Info</li></Link>
            
        </ul>
      </div>
    </div>
  );
};

export default Side;
