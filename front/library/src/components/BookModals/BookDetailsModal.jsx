/* eslint-disable react/prop-types */
// BookDetailsModal.js
import { useContext, useState } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { updateCurrentPage, updateReadingStatus } from "../../ApiService";
import { GlobalContext } from "../../contexts/GlobalContext";

export default function BookDetailsModal({ open, onClose, book, onUpdate }) {
  const { statuses } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(book.current_page);
  const [readingStatus, setReadingStatus] = useState(book.reading_status);

  const handleCurrentPageChange = (event) => {
    setCurrentPage(event.target.value);
  };

  const handleReadingStatusChange = (event) => {
    setReadingStatus(event.target.value);
  };

  const handleClose = () => {
    onClose();
  };

  const handleSave = async () => {
    if (currentPage !== book.current_page) {
      console.log("updateding current page " + currentPage + " book id" + book.id + "old current page" + book.current_page)
      const response = await updateCurrentPage(book.id, currentPage);

      if (!response.statusText == 'OK') {
        throw new Error('Failed to update current page');
      }

      onUpdate({
        ...book,
        current_page: currentPage,
        reading_status: readingStatus,
      });
    }

    if (readingStatus !== book.reading_status) {
      const response = await updateReadingStatus(book.id, readingStatus);

      if (!response.statusText == 'OK') {
        throw new Error('Failed to update reading status');
      }

      onUpdate({
        ...book,
        current_page: currentPage,
        reading_status: readingStatus,
      });
    }

    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Paper
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          {book.name}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Author: {book.author}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Genre: {book.genre}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Page Count: {book.page_count}
        </Typography>
        <TextField
          label="Current Page"
          variant="outlined"
          fullWidth
          value={currentPage}
          onChange={handleCurrentPageChange}
          sx={{ mt: 2 }}
        />
        <Select
          variant="outlined"
          fullWidth
          value={readingStatus}
          onChange={handleReadingStatusChange}
          sx={{ mt: 2 }}
        >
          {statuses.map((status) => (
            <MenuItem key={status.id} value={status.id}>
              {status.name}
            </MenuItem>
          ))}
        </Select>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Save
        </Button>
      </Paper>
    </Modal>
  );
}
