 import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QrScanner = () => {
  const scannerRef = useRef(null);
  const [qrToken, setQrToken] = useState("");
  const [isScanning, setIsScanning] = useState(false);

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
          console.log("QR Token:", decodedText);
          setQrToken(decodedText);

          // 한 번 읽으면 스캔 중지
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
