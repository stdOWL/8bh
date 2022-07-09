import React from "react";
import "./style.scss";
import { Modal, Row, Col, Table, Pagination } from "react-bootstrap";
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
              <Col xs={9} sm={9} md={8} lg={9}>
                <div className="copy-url-left">
                  <h4>Your Referral Link</h4>
                  <a href="#">https://test.com/test</a>
                </div>
              </Col>
              <Col xs={3} sm={3} md={4} lg={3}>
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
              <Row>
                <Col className="model-pagination">
                  <Pagination>
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Item>{1}</Pagination.Item>
                    <Pagination.Item>{2}</Pagination.Item>
                    <Pagination.Item active>{3}</Pagination.Item>
                    <Pagination.Item>{4}</Pagination.Item>
                    <Pagination.Next />
                    <Pagination.Last />
                  </Pagination>
                </Col>
              </Row>
            </Row>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Index;
