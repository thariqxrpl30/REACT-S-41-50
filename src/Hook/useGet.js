//custom hook untuk proses get data

import React from 'react';
import { useState, useEffect } from 'react';
import { link } from "../Axios/link";

const useGet = (url) => {
    const [isi, setIsi] = useState([]);

    // useEffect(() => {
    //     //utk fetchdata
    //     async function fetchData() {
    //         const request = await link.get(url);
    //         //console.log(request.data);
    //         setIsi(request.data);
    //     }

    //     fetchData(); //menjalankan functionnya
    //   }, [isi]);

    //menggunakan cleanup
    useEffect(() => {
        let ambil = true;
        async function fetchData() {
            const res = await link.get(url);
            if (ambil) {
                setIsi(res.data);
            }
        }
        
        fetchData();
        return () => { ambil = false;  };
    }, [isi]);

    return [isi]; // utk mengeksport, bisa dimasukkn ke dlm array 
}

export default useGet;
