/* eslint-disable react/prop-types */
import { List } from "@mui/material";
import BookCard from "../BookCard/BookCard";

export default function BooksDisplay(props) {
  const { books } = props;

  return (
    <List
      sx={{
        color: "black",
        backgroundColor: "white",
        margin: "auto",
      }}
    >
      {books.map((book) => (
        <BookCard key={book.id} {...book} />
      ))}
    </List>
  );
}
