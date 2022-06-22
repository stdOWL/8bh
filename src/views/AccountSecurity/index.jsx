import React, { useEffect } from "react";
import { Row } from "react-bootstrap";
import Layout from "../../components/Layout";
import { useNavigate, useLocation } from "react-router-dom";
import EmailAddress from "./EmailAddress";
import ScrollContainer from "react-indiana-drag-scroll";
import TwoFactorAuthentication from "./TwoFactorAuthentication";
import Password from "./Password";
import AccountDeletion from "./AccountDeletion";

import "./style.scss";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function AccountSecurity() {
  const navigate = useNavigate();
  const searchParams = useQuery();

  const searchTab = searchParams.get("tab");

  const handleActiveTab = (tab) => {
    navigate(`?tab=${tab}`);
  };

  useEffect(() => {
    const filtredTabs = tabs.filter((t) => t.name === searchTab);

    if (!filtredTabs.length) navigate("?tab=email-address");
  }, [searchTab]);

  return (
    <div className="account-security">
      <Layout history={false} title="Account security">
        <ScrollContainer className="tabs">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => handleActiveTab(tab.name)}
              className={`tab ${searchTab === tab.name ? "active" : null}`}
            >
              {tab.label}
            </div>
          ))}
        </ScrollContainer>

        <Row className="account-security-box">
          <div>
            {searchTab === "email-address" && <EmailAddress />}

            {searchTab === "two-factor" && <TwoFactorAuthentication />}

            {searchTab === "password" && <Password />}

            {searchTab === "account-deletion" && <AccountDeletion />}
          </div>
        </Row>
      </Layout>
    </div>
  );
}

const tabs = [
  { id: 0, name: "email-address", label: "Email Address" },
  { id: 2, name: "two-factor", label: "Two-factor authentication" },
  { id: 3, name: "password", label: "Password" },
  { id: 4, name: "account-deletion", label: "Account deletion" },
];
