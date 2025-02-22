import React from 'react'
import InputPodcast from '../components/AddPodcast/InputPodcast';
import ErrorPage from './ErrorPage';
import { useSelector } from 'react-redux';

function AddPodcast() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    return (
      <div>
        {isLoggedIn ? (
          <>
            <InputPodcast />
          </>
        ) : (
          <ErrorPage />
        )}
      </div>
    )
};

export default AddPodcast
