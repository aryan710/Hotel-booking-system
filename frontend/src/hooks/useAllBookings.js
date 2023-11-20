import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAllBookings } from "../stores/allBookingsSlice";

export function useAllBookings() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:7700/api/user/my-bookings`,
          { withCredentials: true }
        );
        dispatch(setAllBookings(data.data))
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, []);

  return {loading};
}
