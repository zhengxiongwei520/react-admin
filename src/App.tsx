import React, { useState } from 'react';
import 'reset-css'
import Layout from '@/components/Layout';
import { useRoutes } from 'react-router-dom'
import routes from '@/router';
import RouterBeforeEach from './router/RouterBeforeEach';
const App: React.FC = () => {
  const outlet = useRoutes(routes)
  return (
    // <Layout></Layout>
    <RouterBeforeEach>
      {outlet}
    </RouterBeforeEach>
  );
};

export default App;