import { useState, useEffect, useRef } from "react";
import LeftPanel from "./LeftPanel";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./ScannerQR.css";

function ScannerQR() {
    const [qrScanResult, setQrScanResult] = useState();
    const preventDoubleScan = useRef(false);

    
    useEffect(() => {
        if (preventDoubleScan.current) {
            return;
        }
        preventDoubleScan.current = true;

        console.log(preventDoubleScan.current);

        const scanner = new Html5QrcodeScanner("reader", {
            qrbox: { width: 250, height: 250 },
            fps: 5,
        });

        const success = (result) => {

            setQrScanResult(result);
        };

        const error = () => {
            console.log("It requires to Scan QR!!");
        };

        scanner.render(success, error);

    }, []);

    let convertToObject = null;
    if(qrScanResult){
        convertToObject = JSON.parse(qrScanResult);
        console.log(convertToObject);
    }
    return (
        <div className="container">
            <LeftPanel />
            <div className="scanner-container">
                {convertToObject ? (
                    <div>
                        <p>{convertToObject.prop}</p>
                        <p>{convertToObject.asset}</p>
                        <p>{convertToObject.room}</p>
                        <p>{convertToObject.accountable}</p>
                        <p>{convertToObject.lifeSpan}</p>
                        <p>{convertToObject.dateAcquired}</p>
                    </div>

                ) : (
                    <div id="reader"></div>
                )}
            </div>
        </div>
    );
}

export default ScannerQR;