/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { createBook } from "../../ApiService";
import { GlobalContext } from "../../contexts/GlobalContext";

export default function AddBookModal({ open, onClose, onAdd, propNames }) {
  const { statuses } = useContext(GlobalContext);

  const initialState = propNames.reduce((state, propName) => {
    state[propName] = {
      value: "",
    };
    return state;
  }, {});

  const [formData, setFormData] = useState(initialState);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid = Object.values(formData).every((field) => field.valid);
    setIsFormValid(isValid);
  }, [formData]);

  const isValidDate = (dateString) => {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    return regex.test(dateString);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(["reading status", "current page"].includes(name));
    let isValid;
    if (name === "published date") {
      isValid = isValidDate(value);
    } else {
      isValid =
        ["reading status", "current page"].includes(name) ||
        value.trim() !== "";
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: {
        value,
        valid: isValid,
      },
    }));
  };

  const handleClose = () => {
    onClose();
  };

  const handleAddBook = async () => {
    const newBook = {};
    for (const propName in formData) {
      let formattedPropName = propName.replace(/\s+/g, "_"); // Replace spaces with underscores

      newBook[formattedPropName] =
        formattedPropName === "published_date"
          ? new Date(formData[propName].value).toDateString()
          : formData[propName].value;
    }

    const response = await createBook(newBook);

    if (!response.statusText == "OK") {
      throw new Error("Failed to add new book");
    }

    onAdd(response.data);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-book-modal"
      aria-describedby="add-book-modal-description"
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
          Add New Book
        </Typography>
        {propNames.map((propName, index) => (
          <React.Fragment key={index}>
            {propName === "reading status" ? (
              <Select
                label="reading status"
                id="select"
                variant="outlined"
                fullWidth
                value={formData[propName].value}
                onChange={handleChange}
                name={propName}
                sx={{ mt: 2 }}
              >
                {statuses.map((status) => (
                  <MenuItem key={status.id} value={status.id}>
                    {status.name}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              <TextField
                label={propName}
                variant="outlined"
                fullWidth
                value={formData[propName].value}
                onChange={handleChange}
                name={propName}
                error={!formData[propName].valid}
                helperText={
                  !formData[propName].valid &&
                  `Please correctly fill in ${propName}.`
                }
                sx={{ mt: 2 }}
              />
            )}
          </React.Fragment>
        ))}
        <Button
          onClick={handleAddBook}
          variant="contained"
          color="primary"
          disabled={!isFormValid}
          sx={{ mt: 2 }}
        >
          Add Book
        </Button>
      </Paper>
    </Modal>
  );
}
