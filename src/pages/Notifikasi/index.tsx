import Breadcrumb from "../../components/Breadcumb"

const Notifikasi = () => {
  const notifs = [
    {
      title: "Top Up OVO ke FELIN AGUSTINA - 2419284753",
      date: "17 Juli 2024, 19.00 WIB"
    },
    {
      title: "Top Up OVO ke FELIN AGUSTINA - 2419284753",
      date: "17 Juli 2024, 19.00 WIB"
    },
    {
      title: "Top Up OVO ke FELIN AGUSTINA - 2419284753",
      date: "17 Juli 2024, 19.00 WIB"
    },
    {
      title: "Top Up OVO ke FELIN AGUSTINA - 2419284753",
      date: "17 Juli 2024, 19.00 WIB"
    },
  ]
  return (
    <div className="container py-5 lg:py-[50px] pb-[50px]">
      <Breadcrumb title="Notifikasi" subtitle="Tinjau Informasi Keuangan Anda"></Breadcrumb>
      <div className="ml-11 mt-5">
        {
          notifs.map(row =>
            <div>
              <p className="text-[16px] font-bold">{row.title}</p>
              <p className="text-slate-400 text-[12px]">{row.date}</p>
              <hr className="border-slate-400 my-4" />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Notifikasi