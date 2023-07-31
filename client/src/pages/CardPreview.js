import React, { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_WORK_PROFILE } from '../utils/queries';
import { Link, useParams } from 'react-router-dom';
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

          <div className="back side">
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
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPreview;





   /*
    return (
      <div>
        <h2>Card Preview</h2>
        <div>
          <h3>Full Name: {workProfile.fullName}</h3>
          <p>Business Email: {workProfile.businessEmail}</p>
          <p>Job Title: {workProfile.jobTitle}</p>
          <p>Company Name: {workProfile.companyName}</p>
          <p>Address: {workProfile.address}</p>
          <p>Phone Number: {workProfile.phoneNumber}</p>
        </div>
  
        <Link to="/me">Back to Work Profile</Link>
      </div>
    );
  };
  
  export default CardPreview;

 */

  /*
  <div className="middle-container">
        <Link to="/me" className="back-link">Back to Work Profile</Link>
      </div>

  */