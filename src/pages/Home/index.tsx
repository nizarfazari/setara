import { useAuth } from "../../hooks/useAuth";
import { FavoriteTransaction } from "../../components/Homepage/FavoriteTransaction";
import InfoSaldo from "../../components/Homepage/InfoSaldo";
import { MenuList } from "../../components/Homepage/MenuList";
import { CatatanKeuangan } from "../../components/Homepage/CatatanKeuangan";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="mx-auto container mt-5 mb-20">
      <h1
        aria-label={`Halo, ${user?.user.name}`}
        className="text-heading-5 font-bold text-primary-100"
      >
        <span>Halo, {user?.user.name}</span>
      </h1>
      <div>
        <InfoSaldo />
      </div>
      <div>
        <div className="my-10">
          <h1 className="text-primary-100 font-bold text-heading-6 py-3">
            Menu
          </h1>
          <div className="pt-0 pb-3">
            <MenuList />
          </div>
        </div>
        <>
          <h1
            className="text-primary-100 text-heading-6 font-bold"
            aria-label="Transaksi Favorit"
          >
            Transaksi Favorit
          </h1>
          <FavoriteTransaction />
        </>
      </div>
      <div>
        <h1
          className="text-primary-100 text-heading-6 font-bold py-3"
          aria-label="Catatan Keuangan"
        >
          Catatan Keuangan
        </h1>
        <CatatanKeuangan />
      </div>
    </div>
  );
};

export default Home;
