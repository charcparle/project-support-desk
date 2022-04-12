import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";
import { getTicket, reset, closeTicket } from "../features/tickets/ticketSlice";
import {
  addNote,
  getNotes,
  reset as notesReset,
} from "../features/notes/noteSlice";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import NoteItem from "../components/NoteItem";

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};
Modal.setAppElement("#root");

function Ticket() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const { ticket, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.ticket
  );
  const {
    notes,
    isLoading: noteIsLoading,
    isSuccess: noteIsSuccess,
  } = useSelector((state) => state.note);
  const { ticketId } = params;
  // Close ticket
  const handleClose = () => {
    dispatch(closeTicket(ticket._id));
    toast.success("Ticket closed");
    navigate("/tickets");
  };
  // Open/Close modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  // Submit note
  const handleAddNote = (e) => {
    e.preventDefault();
    console.log("Note submitted");
    closeModal();
    dispatch(addNote({ ticketId, noteText }));
    setNoteText("")
  };
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);
  useEffect(() => {
    return () => {
      if (noteIsSuccess) {
        dispatch(notesReset());
      }
    };
  }, [dispatch, noteIsSuccess]);
  
  useEffect(() => {
    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
    if (isError) {
      toast.error(message);
    }
  }, [dispatch, ticketId, isError, message]);

  if (isLoading || noteIsLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>Something went wrong - please try again</h1>;
  }
  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date submitted: {new Date(ticket.createdAt).toLocaleString("en-CA")}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue:</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>
      {ticket.status !== "closed" && (
        <button className="btn" onClick={openModal}>
          <FaPlus /> Add Note
        </button>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={handleAddNote}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="enter your note"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}
      {ticket.status !== "closed" && (
        <button className="btn btn-block btn-danger" onClick={handleClose}>
          Close Ticket
        </button>
      )}
    </div>
  );
}

export default Ticket;
