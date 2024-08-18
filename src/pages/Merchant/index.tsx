import React, { useEffect, useRef, useState } from 'react';
import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser';
import Breadcrumb from '../../components/Breadcumb';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface TransactionDetail {
  id: string;
  amount: number;
  date: string;
  status: string;
  name: string; // Add these fields if they are part of the response
  address: string;
  imageUrl: string;
}

const QRISScanner = () => {
  const { user } = useAuth();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [, setTransactionDetail] = useState<TransactionDetail | null>(null);
  const codeReader = useRef<BrowserQRCodeReader | null>(null);
  const scannerControlsRef = useRef<IScannerControls | null>(null);
  const navigate = useNavigate();

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
                  setResult(result.getText());
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
      const response = await axios.get<TransactionDetail>(
        `${process.env.VITE_API_URL}/merchants/qris/${merchantId}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setTransactionDetail(response.data);
      navigate('/payqr', { state: { transactionDetail: response.data } });
    } catch (err) {
      setError(`Error fetching transaction details: ${err}`);
      console.error('API Fetch Error:', err);
    }
  };

  useEffect(() => {
    if (result) {
      fetchTransactionDetail(result);
    }
  }, [result]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setIsProcessing(true);
      setResult(null);
      setError(null);

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
                setResult(result.getText());
              } catch (err) {
                setError('Error decoding QR code from image');
                console.error('Image Decode Error:', err);
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
    <div className="container">
      <div className="my-[30px]">
        <div className="mb-5">
          <Breadcrumb
            title="Scan QRIS"
            subtitle="Scan QR Code atau Upload QR Code"
          />
        </div>

        <div className="flex items-center justify-center">
          <div className="scanner-container p-12 rounded-lg shadow-lg w-full max-w-2xl">
            <div className="video-container mb-8">
              <video
                ref={videoRef}
                className="video-preview w-full h-80 rounded-lg shadow-inner"
                style={{ transform: 'scaleX(-1)' }}
              ></video>
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
            {result && !isProcessing && (
              <p className="result-text text-center text-green-600 font-semibold mb-6 text-lg">
                QR Code Result: {result} SUCCESS
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRISScanner;
