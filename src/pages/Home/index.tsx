import { useAuth } from "../../hooks/useAuth";
import { FavoriteTransaction } from "../../components/Homepage/FavoriteTransaction";
import InfoSaldo from "../../components/Homepage/InfoSaldo";
import { MenuList } from "../../components/Homepage/MenuList";
import { CatatanKeuangan } from "../../components/Homepage/CatatanKeuangan";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="mx-auto container mt-5 mb-20">
      <p
        aria-label={`Halo, ${user?.user.name}`}
        className="text-heading-5 font-bold text-primary-100"
        tabIndex={0}
      >
        <span>Halo, {user?.user.name}</span>
      </p>
      <div>
        <InfoSaldo />
      </div>
      <div>
        <div className="my-10">
          <p className="text-primary-100 font-bold text-heading-6 py-3" tabIndex={0}>
            Menu
          </p>
          <div className="pt-0 pb-3">
            <MenuList />
          </div>
        </div>
        <>
          <p
            className="text-primary-100 text-heading-6 font-bold"
            aria-label="Transaksi Favorit"
            tabIndex={0}
          >
            Transaksi Favorit
          </p>
          <FavoriteTransaction />
        </>
      </div>
      <div>
        <p
          className="text-primary-100 text-heading-6 font-bold py-3"
          aria-label="Catatan Keuangan"
          tabIndex={0}
        >
          Catatan Keuangan
        </p>
        <CatatanKeuangan />
      </div>
    </div>
  );
};

export default Home;