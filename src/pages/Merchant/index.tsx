import React, { useEffect, useRef, useState } from 'react';
import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser';
import Breadcrumb from '../../components/Breadcumb';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { GetData } from '../../utils/GetData';
import { CameraSlash } from '@phosphor-icons/react';

interface MerchantData {
  name: string;
  nmid: string;
  terminal_id: string;
  amount: number | null;
  image_path: string;
  address: string;
  qris_code: string;
}

const QRISScanner = () => {
  const { user } = useAuth();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [videoAllowed, setVideoAllowed] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [scanFailed, setScanFailed] = useState<boolean>(false);
  const codeReader = useRef<BrowserQRCodeReader | null>(null);
  const scannerControlsRef = useRef<IScannerControls | null>(null);
  const { setRecipients } = useAuth();
  const navigate = useNavigate();
  console.log(error);

  useEffect(() => {
    codeReader.current = new BrowserQRCodeReader();

    const startScan = async () => {
      try {
        const devices = await BrowserQRCodeReader.listVideoInputDevices();
        if (devices.length === 0) {
          setError('No camera devices found');
          return;
        }

        const firstDeviceId = devices[0].deviceId;

        if (videoRef.current && codeReader.current) {
          scannerControlsRef.current =
            await codeReader.current.decodeFromVideoDevice(
              firstDeviceId,
              videoRef.current,
              (result, err) => {
                if (result) {
                  const scannedResult = result.getText();
                  setResult(scannedResult);
                  setScanFailed(!isValidQRCode(scannedResult)); // Set scan failure status if the result is invalid
                  stopScan();
                }
                if (err) {
                  // Handle error
                }
              }
            );
        }
      } catch (err) {
        setError(`Error starting scan: ${err}`);
        setVideoAllowed(false);
      }
    };

    const stopScan = () => {
      if (scannerControlsRef.current) {
        scannerControlsRef.current.stop();
        scannerControlsRef.current = null;
      }

      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    };

    startScan();

    return () => {
      stopScan();
    };
  }, []);

  const fetchTransactionDetail = async (merchantId: string) => {
    try {
      const response = await GetData<MerchantData>(
        `/merchants/qris/${merchantId}`,
        user?.token
      );

      setRecipients({
        nama: response.name,
        wallet: response.terminal_id,
        bank: 'QRIS',
        account_number: merchantId,
        numberDestination: response.nmid,
        imageUrl: response.image_path,
        address: response.address
      });
      navigate('/payqr', { state: { transactionDetail: response } });
    } catch (err) {
      setError(`Error fetching transaction details: ${err}`);
      console.error('API Fetch Error:', err);
    }
  };

  useEffect(() => {
    if (result) {
      if (isValidQRCode(result)) {
        fetchTransactionDetail(result);
      } else {
        setScanFailed(true);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const isValidQRCode = (code: string): boolean => {
    // eslint-disable-next-line no-useless-escape
    const idPattern = /^[a-f0-9\-]{36}$/; 
    return idPattern.test(code.trim());
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setIsProcessing(true);
      setResult(null);
      setError(null);
      setScanFailed(false);

      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          if (e.target?.result) {
            const image = e.target.result as string;
            const imageElement = new Image();
            imageElement.src = image;

            imageElement.onload = async () => {
              try {
                const codeReader = new BrowserQRCodeReader();
                const result = await codeReader.decodeFromImageElement(
                  imageElement
                );
                const scannedResult = result.getText();
                setResult(scannedResult);
                setScanFailed(!isValidQRCode(scannedResult));
              } catch (err) {
                setError('Error decoding QR code from image');
                console.error('Image Decode Error:', err);
                setScanFailed(true);
              } finally {
                setIsProcessing(false);
              }
            };
          }
        };
        reader.readAsDataURL(file);
      } catch (err) {
        setError(`Error reading file: ${err}`);
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="container mx-auto">
      <div className="my-[30px]">
        <div className="mb-5">
          <Breadcrumb
            title="Scan QRIS"
            subtitle="Scan QR Code atau Upload QR Code"
          />
        </div>

        <div className="flex items-center justify-center">
          <div className="scanner-container p-12 rounded-lg shadow-lg w-full max-w-2xl">
            <div className="video-container mb-8 flex justify-center">

              {videoAllowed ? (
                <video
                  ref={videoRef}
                  className="video-preview  rounded-2xl  w-[500px] h-full"
                  style={{ transform: 'scaleX(-1)' }}
                ></video>
              ) : (
                <div className="bg-gray-400 w-[500px] h-[400px] rounded-2xl flex items-center justify-center flex-col">
                  <CameraSlash size={64} />
                  <p className="text-black-800 text-lg font-semibold mt-3">Vidio Tidak Diijinkan</p>
                </div>
              )}
            </div>
            <div className="upload-container mb-8">
              <label className="block text-base font-medium text-gray-700 mb-3">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="block w-full text-base text-gray-500 file:mr-4 file:py-3 file:px-5 file:rounded-full file:border-0 file:text-base file:font-semibold file:bg-primary-100 file:text-white hover:file:bg-primary-200"
              />
            </div>
            {isProcessing && (
              <p className="result-text text-center text-gray-600 mb-6 text-lg">
                Processing...
              </p>
            )}
            {scanFailed && !isProcessing && (
              <p className="result-text text-center text-red-600 font-semibold mb-6 text-lg">
                Pemindaian QR Code Gagal, Format tidak valid! Silakan coba lagi.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRISScanner;
