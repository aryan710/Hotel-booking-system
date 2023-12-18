import React, { useState } from "react";
import styles from "./RoomsCard.module.css";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { deleteHotelRoomApi, editHotelRoomApi } from "../../http";
import { useDispatch } from "react-redux";
import { openToaster } from "../../stores/toasterSlice";
const RoomsCard = ({ room, hotelID }) => {
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };
  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };

  const handleDelete = () => {
    handleOpenDelete();
  };
  const handleUpdate = () => {
    handleOpenUpdate();
  };
  return (
    <div className={styles.bookingCardContainer}>
      <DeleteDialog
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
        room={room}
        hotelID={hotelID}
      />
      <UpdateDialog
        openUpdate={openUpdate}
        handleCloseUpdate={handleCloseUpdate}
        room={room}
        hotelID={hotelID}
      />
      <div className={styles.bookingCardInnerContainer}>
        <div className={styles.image}>
          <img src={room.room_image} alt="" />
        </div>
        <div className={styles.details}>
          <h5>Room Type: {room.room_type}</h5>
          <h5>Rooms Available: {room.total_room_available}</h5>
          <h5>Price: ₹{room.price_per_nigh}/-</h5>
        </div>
        <div className={styles.btns}>
          <button
            className={`${styles.edit} ${styles.btn}`}
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            className={`${styles.delete} ${styles.btn}`}
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const UpdateDialog = ({ openUpdate, handleCloseUpdate, room, hotelID }) => {
  const [roomPrice, setRoomPrice] = useState(room.price_per_nigh);
  const [roomAvailable, setRoomAvailable] = useState(room.total_room_available);
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useDispatch();

  const handleUpdate = async () => {
    setIsUpdating(true);
    if (!roomPrice || !roomAvailable || !room.room_type) {
      dispatch(
        openToaster({
          message: "something went wrong, Please check all fields",
          error: true,
          success: false,
        })
      );
      setIsUpdating(false);
      handleCloseUpdate();
    }
    try {
      const { data } = await editHotelRoomApi(hotelID, {
        roomTypeName: room.room_type,
        price: roomPrice,
        roomAvailable: roomAvailable,
      });
      // navigate("/hotel/edit-room");
      dispatch(
        openToaster({
          message: `${room.room_type} updated successfuly`,
          error: false,
          success: true,
        })
      );
      handleCloseUpdate();
      setIsUpdating(false);
    } catch (error) {
      dispatch(
        openToaster({
          message: "Room Updation Failed",
          error: true,
          success: false,
        })
      );
      setIsUpdating(false);
      handleCloseUpdate();
    }
  };
  return (
    <Dialog open={openUpdate} onClose={handleCloseUpdate}>
      <DialogTitle>Update Room</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <h2>{room.room_type}</h2>
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Room Price"
          type="number"
          fullWidth
          variant="standard"
          value={roomPrice}
          onChange={(e) => setRoomPrice(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Room Available"
          type="number"
          fullWidth
          variant="standard"
          value={roomAvailable}
          onChange={(e) => setRoomAvailable(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseUpdate}>Cancel</Button>
        {isUpdating ? (
          <button
            className={`${styles.btn}`}
            onClick={handleUpdate}
            disabled={true}
            style={{ background: "#fff" }}
          >
            <CircularProgress style={{ width: "30px", height: "30px" }} />
          </button>
        ) : (
          <button
            className={`${styles.edit} ${styles.btn}`}
            onClick={handleUpdate}
            disabled={isUpdating ? true : false}
          >
            Update
          </button>
        )}
      </DialogActions>
    </Dialog>
  );
};

const DeleteDialog = ({ openDelete, handleCloseDelete, room, hotelID }) => {
  const [roomType, setroomType] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useDispatch();
  const roomName =
    room.room_type.charAt(0).toUpperCase() + room.room_type.slice(1);
  const handleDelete = async () => {
    setIsUpdating(true);
    if (roomType !== roomName) {
      dispatch(
        openToaster({
          message: "Entered room type is not matching",
          error: true,
          success: false,
        })
      );
      setIsUpdating(false);
      return;
    }
    try {
      const { data } = await deleteHotelRoomApi(hotelID, {
        roomTypeName: room.room_type,
      });
      // navigate("/hotel/edit-room");
      dispatch(
        openToaster({
          message: `${room.room_type} deleted successfuly`,
          error: false,
          success: true,
        })
      );
      setIsUpdating(false);
      handleCloseDelete();
    } catch (error) {
      dispatch(
        openToaster({
          message: "Room Updation Failed",
          error: true,
          success: false,
        })
      );
      setIsUpdating(false);
      handleCloseDelete();
    }
  };
  return (
    <Dialog open={openDelete} onClose={handleCloseDelete}>
      <DialogTitle>Delete Room</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <h2>{room.room_type}</h2>
          <h5>In Order to delete this room</h5>
          <h6>Enter the room type</h6>
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Room type"
          type="text"
          fullWidth
          variant="standard"
          value={roomType}
          onChange={(e) => setroomType(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDelete}>Cancel</Button>
        {isUpdating ? (
          <button
            className={`${styles.btn}`}
            disabled={true}
            style={{ background: "#fff" }}
          >
            <CircularProgress style={{ width: "30px", height: "30px" }} />
          </button>
        ) : (
          <button
            className={`${styles.delete} ${styles.btn}`}
            onClick={handleDelete}
            disabled={isUpdating ? true : false}
          >
            Delete
          </button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default RoomsCard;
