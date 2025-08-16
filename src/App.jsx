import LoginPage from "./Login"
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import InventoryPage from "./Inventory"
import RoomLayoutPage from "./RoomLayout";
import RepairHistoryPage from "./RepairHistory";
import GenerateCodePage from "./GenerateCode";
import ScannerQRPage from "./ScannerQR";
function App() {
    return(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<LoginPage />}/>
            <Route path="/InventoryPage" element={<InventoryPage/>}/>
            <Route path="/RoomLayoutPage" element={<RoomLayoutPage/>}/>
            <Route path="/RepairHistoryPage" element={<RepairHistoryPage/>}/>
            <Route path="/GenerateCodePage" element={<GenerateCodePage />} />
            <Route path="/ScannerQRPage" element={<ScannerQRPage />} />
        </Routes>
    </BrowserRouter>
    );
}

export default App
