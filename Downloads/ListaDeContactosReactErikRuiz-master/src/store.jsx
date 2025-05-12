import React, { createContext, useContext, useReducer } from "react";

export const Context = createContext();

const initialState = {
  contacts: [],
  loading: false,
  error: null,
  editingContact: null
};

export const actionTypes = {
  SET_LOADING: "SET_LOADING",
  SET_CONTACTS: "SET_CONTACTS",
  ADD_CONTACT: "ADD_CONTACT",
  UPDATE_CONTACT: "UPDATE_CONTACT",
  DELETE_CONTACT: "DELETE_CONTACT",
  SET_ERROR: "SET_ERROR",
  SET_EDITING_CONTACT: "SET_EDITING_CONTACT"
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: true };
    case actionTypes.SET_CONTACTS:
      return { ...state, loading: false, contacts: action.payload };
    case actionTypes.ADD_CONTACT:
      console.log(state);
      return { ...state, contacts: [...state.contacts, action.payload] };
    case actionTypes.UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(c => (c.id === action.payload.id ? action.payload : c))
      };
    case actionTypes.DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(c => c.id !== action.payload)
      };
    case actionTypes.SET_ERROR:
      return { ...state, loading: false, error: action.payload };
    case actionTypes.SET_EDITING_CONTACT:
      return { ...state, editingContact: action.payload };
    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchContacts = async () => {
    try {
      const check = await fetch('https://playground.4geeks.com/contact/agendas/ErikRuiz123/contacts');
      if (check.status === 404) {
        await fetch('https://playground.4geeks.com/contact/agendas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug: 'ErikRuiz123' })
        });
      }
    } catch (err) {
      dispatch({ type: actionTypes.SET_ERROR, payload: 'Failed to verify or create agenda' });
    }

    dispatch({ type: actionTypes.SET_LOADING });
    try {
      const response = await fetch('https://playground.4geeks.com/contact/agendas/ErikRuiz123/contacts', {
        headers: { 'Accept': 'application/json' },
      });
      const data = await response.json();
      dispatch({ type: actionTypes.SET_CONTACTS, payload: data.contacts });
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
    }
  };

  const addContact = async (newContact) => {
    try {
      const response = await fetch('https://playground.4geeks.com/contact/agendas/ErikRuiz123/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(newContact),
      });
      const data = await response.json();
      dispatch({ type: actionTypes.ADD_CONTACT, payload: data.contacts });
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: 'Failed to add contact' });
    }
  };

  const updateContact = async (id, updatedContact) => {
    try {
      const response = await fetch(`https://playground.4geeks.com/contact/agendas/ErikRuiz123/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(updatedContact),
      });
      const data = await response.json();
      dispatch({ type: actionTypes.UPDATE_CONTACT, payload: data });
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: 'Failed to update contact' });
    }
  };

  const deleteContact = async (id) => {
    try {
      await fetch(`https://playground.4geeks.com/contact/agendas/ErikRuiz123/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
        },
      });
      dispatch({ type: actionTypes.DELETE_CONTACT, payload: id });
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: 'Failed to delete contact' });
    }
  };

  return (
    <Context.Provider value={{ state, dispatch, fetchContacts, addContact, updateContact, deleteContact }}>
      {children}
    </Context.Provider>
  );
};

export const useStore = () => useContext(Context);
