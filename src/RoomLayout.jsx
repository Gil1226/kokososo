import LeftPanel from "./LeftPanel";
import './RoomLayout.css'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import chairPic from './pic/chair.png';
import airconPic from './pic/aircon.png';
import apPic from './pic/ap.png';
import cabinetPic from './pic/cabinet.png';
import cctvPic from './pic/cctv.png';
import deskPic from './pic/desk.png';
import efPic from './pic/ef.png';
import pcPic from './pic/pc.png';
import projectorPic from './pic/projector.png';
import routerPic from './pic/router.png';
import switchPic from './pic/switch.png';
import tvPic from './pic/tv.png';
import whiteBoardPic from './pic/whiteboard.png';


function RoomLayoutPage(){
    const [roomNum, setRoomNum] = useState("");
    const [showItem, setShowItem] = useState("");
    const [isEdit, setIsEdit] = useState(true);
    const [items, setItems] = useState([
        {id:1, name:'Chair', pic: chairPic},
        {id:2, name:'Aircon', pic: airconPic},
        {id:3, name:'Air Purifier', pic: apPic},
        {id:4, name:'White Board', pic: whiteBoardPic},
        {id:5, name:'Cabinet', pic: cabinetPic},
        {id:6, name:'CCTV', pic: cctvPic},
        {id:7, name:'Desk', pic: deskPic},
        {id:8, name:'Electric Fan', pic: efPic},
        {id:9, name:'PC', pic: pcPic},
        {id:10, name:'Projector', pic: projectorPic},
        {id:11, name:'Router', pic: routerPic},
        {id:12, name:'TV', pic: tvPic},
        {id:13, name:'Switch', pic: switchPic}
    ]);
    const [draggingItem, setDraggingItem] = useState(null);
    const [draggingPosition, setDraggingPosition] = useState({xPos: 0, yPos: 0});
    const [itemDropped, setItemDropped] = useState([]);
    const [dropDownCFValue, setDropDownCFValue] = useState("ceiling")
    const [showBtnRRR, setShowBtnRRR] = useState("");
    const [selectedItemId, setSelectedItemId] = useState("");
    const [selectedItemInfo, setSelectedItemInfo] = useState([]);
    const [showRT, setShowRT] = useState("");
    const [loading, setLoading] = useState(false);
    const [yPosToRemove, setyPosToRemove] = useState("");
    const [xPosToRemove, setxPosToRemove] = useState("");
    const [itemDeg, setItemDeg] = useState()
    const fetchAsset = async() => {
        setLoading(true);
        try {
            const responseSearchSend = await axios.post(`${import.meta.env.VITE_API_URL}/RoomLayoutFetch.php`, {roomNum: roomNum, ceilingOrFloor: dropDownCFValue});
            setItemDropped(responseSearchSend.data);
        } catch (error) {
            console.log("Room Layout Fetching error");
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAsset();
    }, [roomNum, dropDownCFValue, itemDeg]);

    const search = async() => {
        const searchBar = document.querySelector('.search-rl');
        const searchBarValue = searchBar.value
        if(searchBarValue !== ""){
            setRoomNum(searchBarValue);
        }
        else{
            alert("Requires to Input Room")
            setItemDropped([]);
        }
        console.log(searchBarValue)
    }

    const dropDownCF = () => {
        const dropDownValue = document.querySelector('.drop-down-cf-value').value;
        setDropDownCFValue(dropDownValue);
    }

    const showItemLayout = () => {
        showItem === "" ? setShowItem('show') : setShowItem('');
    }
    const editFunction = () => {
        const editBtn = document.querySelector('.edit-button-rl');
        if (isEdit) {
            setIsEdit(false);
            editBtn.style.color = '#f4bb00';
        }
        else{
            setIsEdit(true);
            editBtn.style.color = '#4d1414';
        }
        isEdit ? setShowBtnRRR('showRRR') : setShowBtnRRR('');
    }
    const removeFunction = async() => {
        if (xPosToRemove === "" && yPosToRemove === "") {
            alert("Select a Item First");
            return;
        }
        const confirm = window.confirm('Are you sure you want to delete this item?')
        if(!confirm){
            return;
        }
        try {
            const responseRemoveItemRL = await axios.post(`${import.meta.env.VITE_API_URL}/RoomLayoutDelete.php`, {xPos: xPosToRemove, yPos: yPosToRemove});
            console.log(responseRemoveItemRL.data);
            const responseSearchSend = await axios.post(`${import.meta.env.VITE_API_URL}/RoomLayoutFetch.php`, {roomNum: roomNum, ceilingOrFloor: dropDownCFValue});
            setItemDropped(responseSearchSend.data);
        } catch (error) {
            console.log("Room Layout Fetching error");
        }
    }
    const removeAllFunction = async() => {
        if (roomNum === "") {
            alert("Select a Item First");
            return;
        }
        const confirm = window.confirm('Are you sure you want to Remove all item?')
        if(!confirm){
            return;
        }
        try {
            const responseRemoveItemRL = await axios.post(`${import.meta.env.VITE_API_URL}/RoomLayoutDelete.php`, {room: roomNum});
            console.log(responseRemoveItemRL.data);
            const responseSearchSend = await axios.post(`${import.meta.env.VITE_API_URL}/RoomLayoutFetch.php`, {roomNum: roomNum, ceilingOrFloor: dropDownCFValue});
            setItemDropped(responseSearchSend.data);
        } catch (error) {
            console.log("Room Layout Fetching error");
        }
    }
    const rotateFunction = async() =>{
        if(itemDeg < 360){
            setItemDeg(itemDeg + 45);
        }
        else{
            setItemDeg(45);
        }
        const sendDeg = itemDeg + 45;
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/rotateFunctionRL.php`, {itemDeg: sendDeg, id: selectedItemId});
            console.log(response.data);
        } catch (error) {
            
        }
        console.log(sendDeg);
    }
    const reportFunction = () =>{
        const reportBtn = document.querySelector('.report-btn');
        reportBtn.style.color = "#f4bb00";
        setShowRT("showRT");
    }
    const reportCancel = () =>{
        const reportBtn = document.querySelector('.report-btn');
        reportBtn.style.color = "#4d1414";
        setSelectedItemInfo({});
        setShowRT("")
    }
    const reportTicketHandler = async (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);

        const objectFormData = {
            id : formdata.get('id'),
            asset : formdata.get('asset'),
            room : formdata.get('room'),
            priority : formdata.get('priority'),
            dateReported : formdata.get('dateReported'),
            description: formdata.get('description'),
            status: "Pending"
        }
        console.log(objectFormData);
        try {
            const responseSubmit = await axios.post(`${import.meta.env.VITE_API_URL}/repairHistoryAdd.php`, objectFormData);
            console.log(responseSubmit.data.status);
            if(responseSubmit.data.status === "success"){
                const responseUpdateDroppedItem = await axios.put(`${import.meta.env.VITE_API_URL}/reportToUpdateStatus.php`, {status: "Pending", id: selectedItemId});
                console.log(responseUpdateDroppedItem.data);
                alert("Submitting Report Successfully");
            }else{
                alert("Submitting Report Failed Must be filled out all the fields");
            }
        } catch (error) {
            alert("Submitting Report Failed");
        }
        const reportBtn = document.querySelector('.report-btn');
        reportBtn.style.color = "#4d1414";
        
        setShowRT("")
    }

    const dragStart = (e, item, isDropped = false) => {
        const itemSize = e.target.getBoundingClientRect();
        setDraggingItem({...item, dropping: isDropped, status: "Repaired", itemDeg: 0});

        setDraggingPosition({
          xPos: e.clientX - itemSize.left,
          yPos: e.clientY - itemSize.top
        })
    }

    const whenDrop = (e) => {
        const containerSize =  e.currentTarget.getBoundingClientRect();

        const xPx = e.clientX - containerSize.left - draggingPosition.xPos;
        const yPx = e.clientY - containerSize.top - draggingPosition.yPos;

        const xPos = (xPx / containerSize.width) * 100;
        const yPos = (yPx / containerSize.height) * 100;

        if(!draggingItem){
            return
        }

        if (draggingItem.dropping && !isEdit) {
            setItemDropped(prevItem =>
                prevItem.map(item =>
                    item.id === draggingItem.id ? { ...item, xPos: xPos, yPos: yPos} : item
                )
            );
        } 
        else if(!draggingItem.dropping){
            setItemDropped(prevItem =>
                [...prevItem, {...draggingItem,id: uuidv4(), xPos: xPos, yPos: yPos, roomNum: roomNum, ceilingOrFloor: dropDownCFValue}]
            )   
        }
    
        setDraggingItem(null);
        setDraggingPosition({xPos: 0, yPos: 0});
    }

    const saveLayout = async() => {
        if (roomNum === '') {
            alert('You Need to Search Room First!');
            return;
        }
        try {
            const responseUpdateWhenDrop = await axios.put(`${import.meta.env.VITE_API_URL}/RoomLayoutPut.php`, itemDropped);
            console.log(responseUpdateWhenDrop.data);
            const responseAddWhenDrop = await axios.post(`${import.meta.env.VITE_API_URL}/RoomLayoutPost.php`, itemDropped);
            console.log(responseAddWhenDrop.data);
            alert("Save Successfully");
        } catch (error) {
            console.log(responseWhenDrop.data);
        }
    }

    const dragOver = (e) => {
        e.preventDefault();
    } 
    const selectedItem = (id) => {
        setSelectedItemId(id.id);
        setItemDeg(id.itemDeg)
        setSelectedItemInfo(id);
        setyPosToRemove(id.yPos);
        setxPosToRemove(id.xPos);
    }
    return( 
        <div className="container"> 
            <div>
                <LeftPanel />
            </div>
            <div>
                <div className='top-panel-container'>
                    <p className="room-num">{roomNum}</p>
                    <div className='search-container'>
                        <input type="text" placeholder='Search for Accountable Person' className='search-bar search-rl'/>
                        <input type="submit" value="search" className='search-button'onClick={search}/>    
                    </div>
                </div>
                <div className="option-panel-container">
                    <div className='dropdown'>
                        <select onChange={dropDownCF} className="drop-down-cf-value">
                            <option value="ceiling">Ceiling</option>
                            <option value="floor">Floor</option>
                        </select>
                    </div>
                    {/*Mga pindutan*/}
                    <div className="modify-container">
                        <p onClick={editFunction} className="edit-button-rl">Edit</p>
                        <p onClick={removeFunction} className={`rrr-btn ${showBtnRRR}`}>Remove</p>
                        <p onClick={removeAllFunction} className={`rrr-btn ${showBtnRRR}`}>Remove All</p>
                        <p onClick={rotateFunction} className={`rrr-btn ${showBtnRRR}`}>Rotate</p>
                        <p onClick={reportFunction} className="report-btn">Report</p>
                        <p onClick={showItemLayout} className={showItem}>Show Items</p>
                    </div>
                </div>
                <div 
                    className="layout-area-panel"
                    onDrop={whenDrop}
                    onDragOver={dragOver}
                >
                    {/*Items sa layout */}
                    {loading ? <div className="spinner"></div> : itemDropped.map((item) =>
                        <div
                            key={item.id}
                            className={`item-dropped 
                                        ${item.id === selectedItemId ? 'selected' : ''} 
                                        ${item.status === "Pending" ? "pendingItem": ""}`
                                    }
                            draggable
                            onDragStart={(e) => dragStart(e, item, true)}
                            onClick={() => selectedItem(item)}
                            style={{
                                transform: selectedItemId === item.id ? `rotate(${itemDeg}deg)` : `rotate(${item.itemDeg}deg)`,
                                position:"absolute",
                                top: `${item.yPos}%`,
                                left: `${item.xPos}%`
                            }} 
                        >
                            <img src={item.pic} alt={item.name} 
                            className="item-dropped-pic"
                            />
                        </div>
                    )}
                    {/* report ticket */}
                    <div className={`report-ticket-container ${showRT}`}>
                        <p className="lbl-report-ticket">Report Ticket</p>
                        <form className="report-ticket-form" onSubmit={reportTicketHandler}>
                            <div className="form-row">
                                <label htmlFor="id">ID:</label>
                                <input type="text" readOnly name="id" value={selectedItemInfo.id || ""}/>
                            </div>
                            <div className="form-row">
                                <label htmlFor="asset">Asset:</label>
                                <input type="text" readOnly name="asset" value={selectedItemInfo.name || ""}/>
                            </div>
                            <div className="form-row">
                                <label htmlFor="room">Room#:</label>
                                <input type="text" readOnly name="room" value={selectedItemInfo.roomNum || ""}/>
                            </div>
                            <div className="form-row">
                                <label htmlFor="priority">Priority:</label>
                                <select name="priority" defaultValue={""}>
                                    <option value="" disabled hidden>Select priority level</option>
                                    <option value="high">High Priority</option>
                                    <option value="low">Low Priority</option>
                                </select>
                            </div>
                            <div className="form-row">
                                <label htmlFor="date-reported">Date Reported:</label>
                                <input type="date" name="dateReported"/> 
                            </div>
                            <textarea name="description" id="" placeholder="Description"></textarea>
                            <div className="btn-container-form-RL">
                                <input type="button" value="Cancel" className="btn" onClick={reportCancel} />
                                <input type="submit" className="btn"/>
                            </div>
                        </form>
                    </div>
                </div>
                {/*Mga item sa show Item*/}
                <div className={`item-container ${showItem}`}>
                    {items.map((item) => 
                        <div 
                            draggable
                            key={item.id}
                            onDragStart={(e) => dragStart(e, item, false)}
                        >   
                            <div className="item-image-container">
                                <img src={item.pic} alt={item.name}/>
                            </div>
                            <p>{item.name}</p>
                        </div>
                    )}
                </div>
                <button onClick={saveLayout} className="btn save-btn-rl">Save</button>
            </div>
        </div>
    )
}
export default RoomLayoutPage;
