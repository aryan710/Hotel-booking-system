import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSingleHotel } from "../stores/allHotelsSlice";

export function useSingleHotels(id) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/get-hotel/${id}`,
          { withCredentials: true }
        );
        dispatch(setSingleHotel(data.data));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, []);

  return { loading };
}
