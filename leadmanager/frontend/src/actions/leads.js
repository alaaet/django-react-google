import axios from "axios";
import { tokenConfig } from "./auth";
import { createMessage, returnErrors } from "./messages";
import { ADD_LEAD, DELETE_LEAD, GET_LEADS } from "./types";

// GET LEADS
export const getLeads = () => (dispatch, getState) => {
  axios
    .get("/api/leads/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_LEADS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// DELETE LEAD
export const deleteLead = id => (dispatch, getState) => {
  axios
    .delete(`/api/leads/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(
        createMessage({
          leadDeleted: `Lead with the id: ${id} was deleted successfully! `
        })
      );
      dispatch({
        type: DELETE_LEAD,
        payload: id
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// ADD LEAD
export const addLead = lead => (dispatch, getState) => {
  axios
    .post("/api/leads/", lead, tokenConfig(getState))
    .then(res => {
      dispatch(
        createMessage({
          leadAdded: `Lead with the id: ${res.data.id} was created successfully!`
        })
      );
      dispatch({
        type: ADD_LEAD,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
