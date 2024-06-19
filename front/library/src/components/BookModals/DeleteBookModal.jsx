/* eslint-disable react/prop-types */
// BookDetailsModal.js
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { deleteBook } from "../../ApiService";

export default function DeleteBookModal({ open, onClose, book, onDelete }) {
  const handleClose = () => {
    onClose();
  };

  const handleDelete = async () => {
    const response = await deleteBook(book.id);

    if (!response.statusText == "OK") {
      throw new Error("Failed to delete book");
    }

    onDelete({
      ...book,
    });

    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
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

        <Button
          onClick={handleDelete}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Delete
        </Button>
      </Paper>
    </Modal>
  );
}
