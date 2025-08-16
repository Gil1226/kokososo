import { useEffect, useState } from "react";
import LeftPanel from "./LeftPanel";
import "./repairHistory.css";
import axios from "axios";

function RepairHistoryPage(){
    const [reportedList, setReportedList] = useState([]);
    const [selectedBtn, setSelectedBtn] = useState("All");
    const [loading, setLoading] = useState(false)

    const fetchAsset = async() => {
        setLoading(true);
        try {
            const responseFetch = await axios.post(`${import.meta.env.VITE_API_URL}/repairHistoryFetch.php`, {status: selectedBtn});
            setReportedList(responseFetch.data);
            console.log(responseFetch.data);
            
        } catch (error) {
            
        }
        finally{
            setLoading(false);
        }  
    };

    useEffect(() => {
        fetchAsset();
    }, [selectedBtn]);

    const allBtn = () => {
        setSelectedBtn("All")
    }

    const repairedBtn = () => {
        setSelectedBtn("Repaired")
    }

    const pendingBtn = () => {
        setSelectedBtn("Pending")
        
    }
    return(
        <div className="container">
            <div>
                <LeftPanel />
            </div>
            <div>
                <div className='top-panel-container rp'>
                    <p id={selectedBtn == 'All' ? 'selected-btn' : ''} onClick={allBtn}>All</p>
                    <p id={selectedBtn == 'Repaired' ? 'selected-btn' : ''} onClick={repairedBtn}>Repaired</p>
                    <p id={selectedBtn == 'Pending' ? 'selected-btn' : ''} onClick={pendingBtn}>Pending</p>
                </div>
                <div className="middle-panel">
                    <ul className='label-container rh'>
                        <li>ID</li>
                        <li>Asset</li>
                        <li>Description</li>
                        <li>Date Reported</li>
                        <li>Date Fixed</li>
                        <li>Priority Level</li>
                        <li>Room#</li>
                        <li>Status</li>
                    </ul>
                    {loading ? <div className="spinner"></div> : reportedList.map((list) =>
                        <ul 
                            key={list.id}
                            className='label-container rh list'
                        >
                            <li>{list.id}</li>
                            <li>{list.asset}</li>
                            <li>{list.description}</li>
                            <li>{list[`dateReported`]}</li>
                            <li>{list[`dateFixed`]}</li>
                            <li>{list.priority}</li>
                            <li>{list.room}</li>
                            <li>{list.status}</li>
                            <li className={list.priority === "high" && list.status === "Pending" ? "high" 
                                        : list.priority === "low" && list.status === "Pending" ? "low" 
                                        : ""}></li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}
export default RepairHistoryPage;