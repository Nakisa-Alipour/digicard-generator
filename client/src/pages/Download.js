import React, { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_WORK_PROFILE } from '../utils/queries';
import { useParams } from 'react-router-dom';
import '../styles/Download.css';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';

const Download = () => {
  const { workProfileId } = useParams();
  const { loading, data } = useQuery(QUERY_WORK_PROFILE, {
    variables: {
      id: workProfileId
    }
  });

  const qrContainerRef = useRef(null);
  const cardContainerRef = useRef(null);

  useEffect(() => {
    if (data && data.workProfile) {
      generateQRCode(data.workProfile);
    }
  }, [data]);

  const generateQRCode = (workProfile) => {
    // Generate vCard content
    const vCardContent = `BEGIN:VCARD
VERSION:3.0
FN:${workProfile.fullName}
ORG:${workProfile.companyName}
TITLE:${workProfile.jobTitle}
EMAIL:${workProfile.businessEmail}
TEL:${workProfile.phoneNumber}
ADR:${workProfile.address}
END:VCARD`;

    // Generate QR code from vCard content
    QRCode.toCanvas(qrContainerRef.current, vCardContent, function (error) {
      if (error) console.error(error);
      console.log('QR code generated!');
    });
  };

  const downloadQRCode = () => {
    // Get the canvas element for the QR code
    const qrCanvas = qrContainerRef.current;

    // Convert the QR code canvas to a data URL
    const dataURL = qrCanvas.toDataURL('image/png');

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'qr_code.png'; // Set the desired file name here

    // Append the link to the DOM and trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
  };

  const downloadCard = () => {
    const cardContainer = cardContainerRef.current;

    html2canvas(cardContainer).then((canvas) => {
      const dataURL = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'card.png';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(data);
  const { workProfile } = data;

  return (
    <div>
      <div className="d-card-container" ref={cardContainerRef}>
        <div className="d-card1">
          <h3 className="d-name">{workProfile.fullName}</h3>
          <br />
          <h4 className="j-title">{workProfile.jobTitle}</h4>
          <br/>
          <div className="d-info">
            <p>
              <span className="d-property">Email: </span>
              {workProfile.businessEmail}
            </p>
            <p>
              <span className="d-property">Company Name: </span>
              {workProfile.companyName}
            </p>
            <p>
              <span className="d-property">Address: </span>
              {workProfile.address}
            </p>
            <p>
              <span className="d-property">Phone Number: </span>
              {workProfile.phoneNumber}
            </p>
            <div className="d-qr-code-container">
              <div className="d-card3">
                <canvas ref={qrContainerRef} id="d-qrcode" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-button-area d-card3">
        <button className="d-button" onClick={downloadCard}>Download Card</button>
      </div>
      <div className="d-button-area d-card3">
        <button className="d-button" onClick={downloadQRCode}>Download QR code</button>
      </div>
    </div>
  );
};

export default Download;
