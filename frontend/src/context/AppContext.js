import React, { createContext, useContext, useReducer, useEffect } from 'react';
import apiService from '../services/api';

const AppContext = createContext();

const initialState = {
  classData: null,
  students: [],
  loading: false,
  error: null,
  searchQuery: '',
  selectedStrand: null
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_CLASS_DATA':
      return { ...state, classData: action.payload, loading: false };
    case 'SET_STUDENTS':
      return { ...state, students: action.payload, loading: false };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_SELECTED_STRAND':
      return { ...state, selectedStrand: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const fetchClassData = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const data = await apiService.getClassProfile();
      dispatch({ type: 'SET_CLASS_DATA', payload: data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const fetchStudents = async (studentId = null) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const data = await apiService.getStudents(studentId);
      dispatch({ type: 'SET_STUDENTS', payload: data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const setSearchQuery = (query) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const setSelectedStrand = (strand) => {
    dispatch({ type: 'SET_SELECTED_STRAND', payload: strand });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  useEffect(() => {
    fetchClassData();
    fetchStudents();
  }, []);

  const value = {
    ...state,
    fetchClassData,
    fetchStudents,
    setSearchQuery,
    setSelectedStrand,
    clearError
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
