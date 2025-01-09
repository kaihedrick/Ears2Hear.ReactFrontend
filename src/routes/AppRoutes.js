import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home/Home';
import LikedTracks from '../components/LikedTracks/LikedTracks';
import CreateTrack from '../components/CreateTrack/CreateTrack';
import Login from '../components/Login/Login';
import ListTracks from '../components/ListTracks/ListTracks';
import Register from '../components/Register/Register';
import ViewTrack from '../components/ViewTrack/ViewTrack';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/tracks" element={<ListTracks />} />
      <Route path="/liked-tracks" element={<LikedTracks />} />
      <Route path="/create-track" element={<CreateTrack />} />
      <Route path="/view-track/:trackId" element={<ViewTrack />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
