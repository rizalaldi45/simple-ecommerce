import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full h-auto flex flex-col justify-center items-center mb-10">
        <div className="w-7/12 block md:flex justify-between">
            <div className="w-full md:w-3/4">
                <h1 className="text-base">Shoping</h1>
                <p className="text-xs text-gray-400 pt-3 text-justify">Shoping adalah web-platform  yang menawarkan transaksi jual beli online yang menyenangkan, gratis, dan terpercaya. Bergabunglah dengan jutaan pengguna lainnya dengan mulai mendaftarkan produk jualan dan berbelanja berbagai penawaran menarik kapan saja, di mana saja. Keamanan transaksi kamu terjamin.. Ayo gabung dalam komunitas Shoping dan mulai belanja sekarang!</p>
            </div>
            <div className="mt-3 md:mt-0">
                <h1 className="text-base">Follow</h1>
                <p className="text-xs text-gray-400 pt-3">Instagram</p>
                <p className="text-xs text-gray-400 pt-3">Facebook</p>
                <p className="text-xs text-gray-400 pt-3">Twitter</p>
            </div>
            <div className="mt-3 md:mt-0">
                <h1 className="text-base">Legal</h1>
                <p className="text-xs text-gray-400 pt-3">Term</p>
                <p className="text-xs text-gray-400 pt-3">Policy</p>
            </div>
        </div>
        <div className="w-7/12 text-center">
            <hr className="my-5"/>
            <h1 className="text-xs text-gray-400">© Shoping 2022. Hak Cipta Dilindungi</h1>
        </div>
    </div>  
  );
}
