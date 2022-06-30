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

export default function FAQComponent({open, setOpen}) {
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
            Frequently asked questions
          </Typography>
        </Toolbar>
      </AppBar>
      {FAQs.map((faq, index) => (
        <Accordion
          key={`faq_${faq.id}`}
          expanded={expanded === `faq_${faq.id}`}
          onChange={handleChange(`faq_${faq.id}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`content-${faq.id}`}
            id={`header-${faq.id}`}
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              {faq.title}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {faq.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              dangerouslySetInnerHTML={{ __html: faq.description }}
            ></Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Dialog>
  );
}
