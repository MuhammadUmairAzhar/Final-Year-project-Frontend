import { Route, Routes } from "react-router-dom";
import Basic from "../../components";

export const HomeRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Basic.Home />} />
            <Route path='/home' element={<Basic.Home />} />
        </Routes>
    )
}