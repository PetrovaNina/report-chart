import React, { useState } from "react";
import { DateRangePicker } from "materialui-daterange-picker";
import { CalendarToday } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  IconButton,
  Modal,
  Fade,
  Backdrop,
} from "@material-ui/core";
import { getDateRangeString } from "../utils/get-date-range-string";

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function RangePicker({ placeholder }) {
  const classes = useStyles();
  const [dateRange, setDateRange] = useState({});
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  return (
    <>
      <TextField
        placeholder={placeholder}
        value={getDateRangeString(dateRange)}
        onClick={toggle}
        InputProps={{
          style: { font: "inherit", color: "inherit", padding: 0 },
          readOnly: true,
          disableUnderline: true,
          startAdornment: (
            <IconButton style={{ padding: "0 8px 0 0" }}>
              <CalendarToday style={{ fontSize: "22px" }} />
            </IconButton>
          ),
        }}
      />
      <Modal
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div>
            <DateRangePicker
              open={true}
              toggle={toggle}
              onChange={(range) => {
                setDateRange(range);
                toggle();
              }}
              initialDateRange={dateRange}
              definedRanges={[]}
            />
          </div>
        </Fade>
      </Modal>
    </>
  );
}
