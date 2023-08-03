import React, { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_WORK_PROFILE } from '../utils/queries';
import { useParams } from 'react-router-dom';
import '../styles/CardPreview.css';
import QRCode from 'qrcode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const CardPreview = () => {
  // Get the workProfileId from URL parameters
  const { workProfileId } = useParams();
  
  // Fetch work profile data
  const { loading, data } = useQuery(QUERY_WORK_PROFILE, {
    variables: {
      id: workProfileId
    }
  });

  // Refs to hold DOM elements
  const qrContainerRef = useRef(null);
  const backSideRef = useRef(null);

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
    // Get the QR code canvas element
    const qrCanvas = qrContainerRef.current;

    // Convert the QR code canvas to a data URL
    const dataURL = qrCanvas.toDataURL('image/png');

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'qr_code.png';

    // Append the link to the DOM and trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Access the workProfile data
  const { workProfile } = data;

  return (
    <div>
      <div className="container">
        <div className="card">
          <div className="front side">
            <h1 className="logo">{workProfile.fullName}</h1>
          </div>

          <div className="back side" ref={backSideRef}>
            <h3 className="name2">{workProfile.fullName}</h3>
            <br/>
            <h4 className="j-title">{workProfile.jobTitle}</h4>
            <div className="info2">
              <p>
                <span className="property">Email: </span>{workProfile.businessEmail}
              </p>
              <p>
                <span className="property">Company Name: </span>{workProfile.companyName}
              </p>
              <p>
                <span className="property">Address: </span>{workProfile.address}
              </p>
              <p>
                <span className="property">Phone Number: </span>{workProfile.phoneNumber}
              </p>
              <div className="qr-container">
                <div className="d-card3">
                  <canvas ref={qrContainerRef} id="qrcode" />
                </div>
                <button className="download-icon" onClick={downloadQRCode}>
                  <FontAwesomeIcon icon={faDownload} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPreview;
