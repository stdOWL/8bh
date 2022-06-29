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

export default function PagesComponent({ PageName, setPageName }) {
  const [Pages, setPages] = React.useState([]);

  const handleClose = () => {
    setPageName(null);
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const allData = await api.get(`/info/all`);
        setPages(allData.pages);
      } catch (err) {
        notify.error(err.response ? err.response.data : err.message);
      }
    };
    fetchPages();
  }, []);

  return (
    <Dialog
      fullScreen
      open={PageName != null}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      {PageName && (
        <>
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
              {Pages.find((s) => s.name === PageName).title}
              </Typography>
            </Toolbar>
          </AppBar>
          <div style={{ color: "black" }} dangerouslySetInnerHTML={{ __html: Pages.find((s) => s.name === PageName).description }}>
          </div>
        </>
      )}
    </Dialog>
  );
}
