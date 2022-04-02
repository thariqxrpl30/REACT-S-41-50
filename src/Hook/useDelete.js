import { link } from "../Axios/link";
import { useState } from 'react';

const useDelete = (url) => {

    //mengambil pesan dr console log
    const [pesan, setPesan] = useState("");

    async function hapus(id) {  
        //membuat function hapus
        if (window.confirm("Anda akan menghapus item ini?")) { //membuat konfirmasi
            const res = await link.delete(url + id);
            setPesan(res.data.pesan);
        }
    }

    return {hapus, pesan, setPesan};
}

export default useDelete;
