import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from '@/constants/vars';
import * as Feat from '@/features';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LIST} element={<Feat.List />} />
        <Route path={ROUTES.SETTINGS} element={<Feat.Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
