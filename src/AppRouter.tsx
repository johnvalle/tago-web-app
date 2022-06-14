import React from 'react';
import { nanoid } from 'nanoid';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import * as Feat from '@/features';

export const ROUTES = [
  {
    name: 'My List',
    path: '/',
    element: <Feat.List />,
    index: true,
  },
  {
    name: 'Settings',
    path: '/settings',
    element: <Feat.Settings />,
  },
];

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {ROUTES.map((route) => (
          <Route key={nanoid()} {...route} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
