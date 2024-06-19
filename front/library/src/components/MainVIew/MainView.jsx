// App.js
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SearchBar from "../SearchBar/SearchBar";
import BooksDisplay from "../BooksDisplay/BooksDisplay";
import AddBookModal from "../BookModals/AddBookModal";
import BookDetailsModal from "../BookModals/BookDetailsModal";
import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";

function MainView() {
  const [searchQuery, setSearchQuery] = useState("");
  const { books, setBooks } = useContext(GlobalContext);
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);

  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setFilteredBooks(
      books.filter(
        (book) =>
          book.name.includes(event.target.value) ||
          book.author.includes(event.target.value) ||
          book.genre.includes(event.target.value)
      )
    );
  };

  const handleAddBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleOpenDetailsModal = (book) => {
    setSelectedBook(book);
    setOpenDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setSelectedBook(null);
    setOpenDetailsModal(false);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", height: "100%", py: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems:"center", justifyContent: "center", gap:"30px" }}>
        <Box sx={{width:"20rem"}}>
          <SearchBar value={searchQuery} onChange={handleSearchChange} />
        </Box>
        <Box
          sx={{
            height: "60vh",
            overflowY: "scroll",
            borderRadius: "16px",
            border: "solid 1px #4f95dc",
            width:"40rem"
          }}
        >
          <BooksDisplay
            books={filteredBooks ? filteredBooks : books}
            onBookClick={handleOpenDetailsModal}
          />
        </Box>
        <Button
          onClick={handleOpenAddModal}
          variant="contained"
          color="primary"
        >
          Add Book
        </Button>
      </Box>
      {/* <Container maxWidth="lg" sx={{ flex: "1" }}>
        <Grid
          container
          justifyContent="center"
          spacing={2}
          sx={{ height: "100%" }}
        >
          <Grid item xs={12} md={8}>
            <SearchBar value={searchQuery} onChange={handleSearchChange} />
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{ height: "60vh", overflowY: "scroll", borderRadius: "16px", border: "solid 1px #4f95dc", marginTop: "30px"}}
          >
            <BooksDisplay
              books={filteredBooks ? filteredBooks : books}
              onBookClick={handleOpenDetailsModal}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Button
              onClick={handleOpenAddModal}
              variant="contained"
              color="primary"
            >
              Add Book
            </Button>
          </Grid>
        </Grid>
      </Container> */}
      <AddBookModal
        open={openAddModal}
        onClose={handleCloseAddModal}
        onAdd={handleAddBook}
        propNames={[
          "name",
          "author",
          "genre",
          "page count",
          "published date",
          "current page",
          "reading status",
        ]}
      />
      {selectedBook && (
        <BookDetailsModal
          open={openDetailsModal}
          onClose={handleCloseDetailsModal}
          book={selectedBook}
          onUpdate={(updatedBook) => {
            setBooks(
              books.map((book) =>
                book.id === updatedBook.id ? updatedBook : book
              )
            );
          }}
        />
      )}
    </Box>
  );
}

export default MainView;
