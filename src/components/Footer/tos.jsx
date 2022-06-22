import React, { useEffect } from "react";
import "./style.scss";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { notify, api } from "../../util";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FAQComponent({ open, setOpen }) {
  const [FAQs, setFAQs] = React.useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    const fetchFAQS = async () => {
      try {
        const faqs = await api.get(`/info/faq`);
        setFAQs(faqs);
      } catch (err) {
        notify.error(err.response ? err.response.data : err.message);
      }
    };
    fetchFAQS();
  }, []);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{ width: "auto" }}
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
          Terms of Service
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ color: "black" }}>
        <p id="isPasted">Terms of Service&nbsp;Version&nbsp;1, 2022-06-06</p>
        <p>
          These terms of service define the relationship between 8BetHub ("the
          operator") and the end user ("the user") regarding the use of the
          website provided at&nbsp;8bethub.com&nbsp;("the service").
        </p>
        <p>Prohibited users</p>
        <ol start="1" type="1">
          <li>
            Users that are citizens or residents of any of the following
            jurisdictions are prohibited from using the service:
          </li>
        </ol>
        <div>
          <ul>
            <li>Applicable on a case-by-case basis</li>
          </ul>
        </div>
        <ol start="2" type="1">
          <li>
            Users younger than 18 years of age are prohibited from using the
            service.
          </li>
          <li>
            Users for which using the service is not legal in their applicable
            jurisdiction(s) are prohibited from using the service.
          </li>
          <li>
            Ensuring they are legally permitted to use the service is the user's
            responsibility. The operator makes no claims and provides no
            guarantees that using the service is legal for the user.
          </li>
          <li>
            To ensure that no prohibited users are using the service, the
            operator may demand proof of age, citizenship, and residence of any
            user at his own discretion. If the user does not provide adequate
            proof at the operator's request, they may be barred from further
            using the service.
          </li>
        </ol>
        <p>Account access</p>
        <ol start="1" type="1">
          <li>
            An account's owner is authenticated solely by his login credentials:
            the combination of his username, password, and two-factor
            authentication method (if enabled). The operator need not accept any
            other form of authentication. The user acknowledges that he may
            permanently lose access to his account and all funds contained
            within if he loses his login credentials.
          </li>
          <li>
            The user is responsible for securing his login credentials. The
            operator shall not be liable for lost user accounts, or the funds
            contained within or any other resulting damages if the user
            knowingly or unknowingly provides a third party with his login
            credentials, especially but not limited to the user falling victim
            to social engineering or malware attacks.
          </li>
          <li>
            By voluntarily deleting his account, the user forfeits any remaining
            balance and bankroll investments of the account.
          </li>
        </ol>
        <p>Deposits &amp; withdrawals</p>
        <ol start="1" type="1">
          <li>
            A variety of coins is accepted for deposits and withdrawals. Other
            cryptocurrencies that are not included in the list displayed on this
            website sent to the service's deposit addresses cannot be accessed
            by the operator and will not be credited to the user's account or
            returned to the user.
          </li>
          <li>
            In the case of blockchain forks, the operator may decide which chain
            is considered to be used.
          </li>
          <li>
            The operator attempts to process all withdrawals instantly unless
            the user explicitly opts to queue his withdrawal. The operator shall
            not be liable for delayed withdrawals including those that are
            delayed through fault of the operator.
          </li>
          <li>
            The operator may temporarily halt all deposits to and withdrawals
            from the service if he deems it necessary to ensure the safety of
            users' funds (e.g., in the event of blockchain forks) or for any
            other important reason.
          </li>
        </ol>
        <p>Betting</p>
        <ol start="1" type="1">
          <li>
            All bets are final. The operator will not provide refunds of lost
            bets, including but not limited to accidentally submitted bets or
            bets lost due to network latency.
          </li>
          <li>
            In the case of a dispute, the information received and recorded by
            the service in its database shall be deciding.
          </li>
          <li>
            Use of the script editor and the automated betting feature is
            voluntary. The operator assumes no liability for malfunctioning
            scripts.
          </li>
        </ol>
        <p>Chat</p>
        <ol start="1" type="1">
          <li>
            The user agrees to abide by the chat rules. The operator may
            temporarily or permanently prevent users that violate the chat rules
            or are otherwise disruptive from participating in the chat at the
            operator's sole discretion and without any warning.
          </li>
          <li>
            The operator is not liable for content that other users post or link
            to in the chat.
          </li>
          <li>
            The service is not a trading forum, and the operator discourages all
            sorts of trading or other dealing among players. The operator will
            not intervene in disputes among players under any circumstances and
            shall not be liable for any losses arising from such disputes.
          </li>
        </ol>
        <p>Forfeiture of dormant accounts</p>
        <ol start="1" type="1">
          <li>
            The operator may permanently delete accounts that have not been
            accessed for two years and may make usernames of deleted accounts
            available for use with new accounts again.
          </li>
          <li>
            For this purpose, an account's last access time is the time that the
            user last signed into the account or connected to the service while
            already signed in.
          </li>
          <li>
            All funds of deleted dormant accounts including their balance and
            any bankroll investments are forfeited by the user and assumed by
            the operator.
          </li>
          <li>No dormant accounts shall be deleted before October 1, 2021.</li>
        </ol>
        <p>Miscellaneous</p>
        <ol start="1" type="1">
          <li>
            The agreement shall be governed by the laws of Cura&ccedil;ao. Any
            legal disputes between the operator and the user regarding the use
            of the service are to be decided by the courts of Cura&ccedil;ao.
          </li>
          <li>
            The operator may unilaterally modify these terms of service at any
            time and without notice. Continued use of the service implies
            consent to the new terms of service. For this purpose, remaining
            invested in the bankroll is considered use of the service.
          </li>
          <li>
            The operator not insisting on one of his rights granted by these
            terms of service in one or more specific instances shall not
            pre-empt the operator from making use of this right in the future.
          </li>
        </ol>
      </div>
    </Dialog>
  );
}
