import './LeftPanel.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)


function LeftPanel(){
    const location = useLocation();
    const navigate = useNavigate();

    const name = location.state?.name || 'guest';
    const activePage = location.pathname;

    const directInventory = () =>{
        navigate("/InventoryPage", { state: {name}});
    }
    const directRoomLayout = () =>{
        navigate("/RoomLayoutPage", { state: {name}});
    }
    const directRepairHistory = () =>{
        navigate("/RepairHistoryPage", { state: {name}});
    }
    const directGenerateCode = () =>{
        navigate("/GenerateCodePage", { state: {name}});
    }

    return(
        <div> 
            <div className="left-panel-container">
                <div className="info-container">
                    <p>{name}</p>
                    <FontAwesomeIcon icon="fa-solid fa-bell" />
                </div>
                <div className="nav-option-container">
                    <p onClick={directInventory} className={activePage === "/InventoryPage" ? "colored-nav-option" : ""}>Inventory</p>
                    <p onClick={directRoomLayout} className={activePage ==="/RoomLayoutPage" ? "colored-nav-option" : ""}>Room Layout</p>
                    <p onClick={directRepairHistory} className={activePage ==="/RepairHistoryPage" ? "colored-nav-option" : ""}>Repair History</p>
                    <p onClick={directGenerateCode} className={activePage ==="/GenerateCodePage" ? "colored-nav-option" : ""}>Generate Code</p>
                    <FontAwesomeIcon icon="fa-solid fa-pen-nib" onClick={directRoomLayout} className={activePage ==="/RoomLayoutPage" ? "colored-nav-option" : ""}/>
                    <FontAwesomeIcon icon="fa-solid fa-check-to-slot" />
                    <FontAwesomeIcon icon="fa-solid fa-qrcode" />
                </div>
                <div className="logout-container">
                    <FontAwesomeIcon icon="fa-solid fa-power-off" />
                    <p>Logout</p>
                </div>
            </div>
        </div>
    );
}
export default LeftPanel;