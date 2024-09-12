import { Outlet } from 'react-router-dom';
import LayoutHeader from "./header";

export default function MainLayout (){
    return (
        <>
            <LayoutHeader />
            <Outlet />
        </>
    )
}

