import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTicket, reset, closeTicket } from "../features/tickets/ticketSlice";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

function Ticket() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ticket, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.ticket
  );
  const { ticketId } = params;
  const handleClose = () => {
    dispatch(closeTicket(ticket._id));
    toast.success("Ticket closed");
    navigate("/tickets");
  };
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);
  useEffect(() => {
    dispatch(getTicket(ticketId));
    if (isError) {
      toast.error(message);
    }
  }, [dispatch, ticketId, isError, message]);

  if (isLoading) {
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
        <h3>
            Product: {ticket.product}
        </h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue:</h3>
          <p>{ticket.description}</p>
        </div>
      </header>
      {ticket.status !== "closed" && (
        <button className="btn btn-block btn-danger" onClick={handleClose}>
          Close Ticket
        </button>
      )}
    </div>
  );
}

export default Ticket;
