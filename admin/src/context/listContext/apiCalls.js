import {
  createListFailure,
  createListStart,
  createListSuccess,
  deleteListFailure,
  deleteListStart,
  deleteListSuccess,
  getListsFailure,
  getListsStart,
  getListsSuccess,
} from "./ListActions";
import axios from "../../axiosHook/axiosHook";

export const getLists = async (dispatch) => {
  dispatch(getListsStart());

  try {
    const res = await axios.get("/lists");
    dispatch(getListsSuccess(res.data));
  } catch (err) {
    dispatch(getListsFailure());
  }
};

export const createList = async (list, dispatch) => {
  dispatch(createListStart());
  try {
    const res = await axios.post("/lists/", list);
    dispatch(createListSuccess(res.data));
  } catch (err) {
    dispatch(createListFailure());
  }
};

export const deleteList = async (id, dispatch) => {
  dispatch(deleteListStart());

  try {
    await axios.delete("/lists/" + id);
    dispatch(deleteListSuccess(id));
  } catch (err) {
    dispatch(deleteListFailure());
  }
};
