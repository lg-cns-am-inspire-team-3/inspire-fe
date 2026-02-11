 import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QrScanner = () => {
  const scannerRef = useRef(null);
  const [qrToken, setQrToken] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const hasSentRef = useRef(false);

  const sendQrTokenToServer = async (qrToken) => {
    try {
      const response = await fetch("http://localhost:8081/api/v1/attend/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qrToken: qrToken,
        }),
      });

      if (!response.ok) {
        console.error("서버 전송 실패");
      }
    } catch (error) {
      console.error("서버 요청 에러", error);
    }
  };


  useEffect(() => {
    const html5QrCode = new Html5Qrcode("qr-reader");
    scannerRef.current = html5QrCode;

    return () => {
      // 컴포넌트 언마운트 시 카메라 정리
      if (html5QrCode.isScanning) {
        html5QrCode.stop().catch(() => {});
      }
    };
  }, []);

  const startScan = async () => {
    if (!scannerRef.current) return;

    setIsScanning(true);

    try {
      await scannerRef.current.start(
        { facingMode: "environment" }, // 후면 카메라
        { fps: 10, qrbox: 250 },
        (decodedText) => {
            if (hasSentRef.current) return;

            hasSentRef.current = true;
            sendQrTokenToServer(decodedText);

            scannerRef.current.stop();
            setIsScanning(false);
          },
        (error) => {
          // 스캔 실패 로그 (무시해도 됨)
        }
      );
    } catch (err) {
      console.error("QR Scan Error", err);
      setIsScanning(false);
    }
  };

  return (
    <div>
      <h2>QR 출석 스캔</h2>

      <div
        id="qr-reader"
        style={{ width: "300px", marginBottom: "1rem" }}
      />

      {!isScanning && (
        <button onClick={startScan}>QR 스캔 시작</button>
      )}

      {qrToken && (
        <p>
          스캔된 QR 토큰: <strong>{qrToken}</strong>
        </p>
      )}
    </div>
  );


};

export default QrScanner;
