
import React, { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_WORK_PROFILE } from '../utils/queries';
import { useParams } from 'react-router-dom';
import '../styles/CardPreview.css';
import QRCode from 'qrcode';


const CardPreview = () => {
  const { workProfileId } = useParams();
  const { loading, data } = useQuery(QUERY_WORK_PROFILE, {
    variables: {
      id: workProfileId
    }
  });

  const qrContainerRef = useRef(null);
  const backSideRef = useRef(null);

  useEffect(() => {
    if (data && data.workProfile) {
      generateQRCode(data.workProfile._id);
    }
  }, [data]);

  const generateQRCode = (text) => {
    QRCode.toCanvas(qrContainerRef.current, text, function (error) {
      if (error) console.error(error);
      console.log('QR code generated!');
    });
  };


  const downloadQRCode = () => {
    const qrCanvas = qrContainerRef.current;
  
    const dataURL = qrCanvas.toDataURL('image/png');
  
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'qr_code.png'; 
  
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(data);
  const { workProfile } = data;

  return (
    <div>
      <div className="container">
        <div className="card">
          <div className="front side">
            <h1 className="logo">{workProfile.fullName}</h1>
          </div>

          <div className="back side" ref={backSideRef}>
            <h3 className="name">{workProfile.fullName}</h3>
            <br/>
            <div>{workProfile.jobTitle}</div>
            <div className="info">
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
                <canvas ref={qrContainerRef} id="qrcode" />
              </div>

              <button onClick={downloadQRCode}>Download QR code</button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPreview;


