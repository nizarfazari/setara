import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function PlainLayout() {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </>
    )
}