import React, { useState, useEffect } from "react";
import { Row, Col, Image } from "react-bootstrap";
import qrcode from "../../../assets/imgs/qrcode.png";
import { Link } from "react-router-dom";
import "./style.scss";
import CircularProgress from "@mui/material/CircularProgress";
import { notify, api } from "../../../util";

export default function TwoFactorAuthentication() {
  const [tfaCode, setTfaCode] = React.useState("");

  const [loading, setLoading] = React.useState(true);
  const [securityDetails, setSecurityDetails] = React.useState(null);

  const fetchSecurityDetails = async () => {
    try {
      setLoading(true);
      const resp = await api.get(`/account/securityDetails`);
      setSecurityDetails(resp);
      setLoading(false);
    } catch (err) {
      notify.error(err.response ? err.response.data : err.message);
    }
  };
  const toggleTFA = async () => {
    try {
      const resp = await api.post(`/account/securityDetails`, {
        tfaCode,
      });

      if (resp.status === false) {
        notify.error(resp.message);
      } else if (resp.status === true) {
        setSecurityDetails(resp);
        setTfaCode("");
        if (resp.tfaActivated === false) {
          notify.success("Two-factor authentication successfully disabled!");
          await fetchSecurityDetails();
        } else
          notify.success("Two-factor authentication successfully enabled!");
      }
    } catch (err) {
      notify.error(err.response ? err.response.data : err.message);
    }
  };

  useEffect(() => {
    fetchSecurityDetails();
  }, []);

  return (
    <Row className="two-factor-authentication">
      {loading || !securityDetails ? (
        <CircularProgress />
      ) : (
        <>
          {securityDetails.tfaActivated === false && (
            <Col md={4} className="qrcode">
              <Image
                src={`https://chart.googleapis.com/chart?chs=322x322&cht=qr&chl=${securityDetails.tfaQRCode}`}
                alt="Qr Code"
              />
            </Col>
          )}

          <Col
            md={securityDetails.tfaActivated === false ? 8 : 12}
            className="enable"
          >
            <div className="desc">
              <p>
                Scan the QR code or enter the secret into your 2FA app manually,
                then enter a code to toggle two-factor authentication.
              </p>
              <p>
                Without your 2FA code, you might lose access to your account! Do
                not enable 2FA until you've created a backup of your 2FA app,
                the QR code or the secret.
              </p>
            </div>

            <div className="form-group otp">
              <div className="label">Two-factor authentication code</div>
              <input
                value={tfaCode}
                onChange={({ target }) => setTfaCode(target.value)}
                placeholder="Enter TFA Code"
              />
            </div>
            <button className="primary-btn" onClick={toggleTFA}>
              {securityDetails.tfaActivated ? "Disable 2FA" : "Enable 2FA"}
            </button>
          </Col>
        </>
      )}
    </Row>
  );
}
