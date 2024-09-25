import { Outlet } from 'react-router-dom';
import DashBoardHeader from "./DashBoardHeader";

export default function DashBoardLayout (){
    return (
        <>
            <DashBoardHeader />
            <Outlet />
        </>
    )
}

