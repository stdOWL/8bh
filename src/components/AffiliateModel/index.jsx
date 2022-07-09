import React from "react";
import "./style.scss";
import { Modal, Row, Col, Table } from "react-bootstrap";
import { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
function Index(props) {
  const [showAffiliateMpdel, setShowAffiliateMpdel] = useState(false);
  return (
    <>
      <button onClick={() => setShowAffiliateMpdel(true)}>Open Model</button>
      <Modal
        show={showAffiliateMpdel}
        onHide={() => setShowAffiliateMpdel(false)}
        centered
      >
        <div className="tip-container">
          <div onClick={() => setShowAffiliateMpdel(false)} className="close">
            X
          </div>
          <div className="orange-gradient-text heading">Affiliate Panel</div>
          <div className="copy-url">
            <Row className="align-items-center">
              <Col sm={12} md={9} lg={9}>
                <div className="copy-url-left">
                  <h4>Your Referral Link</h4>
                  <a href="#">https://test.com/test</a>
                </div>
              </Col>
              <Col sm={12} md={3} lg={3}>
                <div className="copy-url-right">
                  <ContentCopyIcon />
                  <span>Copy Url</span>
                </div>
              </Col>
            </Row>
          </div>
          <div className="normal-text">
            Share the link above or have friends use your promo code. "stdowl".
            They'll be rewarded with a free RooWards boost to level 1 - and you
            will receive commission on all wagers, for life.
            <span className="why-text"> Marketing Assets</span>
          </div>
          <div className="rollers-box">
            <Row className="justify-content-center">
              <Table responsive borderless>
                <thead>
                  <tr>
                    <th>Users</th>
                    <th>Earnings</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Admin</td>
                    <td>120$</td>
                  </tr>
                  <tr>
                    <td>User</td>
                    <td>70$</td>
                  </tr>
                  <tr>
                    <td>Johan</td>
                    <td>168$</td>
                  </tr>
                </tbody>
              </Table>
            </Row>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Index;
