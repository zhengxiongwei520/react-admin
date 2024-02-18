import React, { useState } from 'react';
import 'reset-css'
import Layout from '@/components/Layout';
import { useRoutes } from 'react-router-dom'
import routes from '@/router';
import RouterBeforeEach from './router/RouterBeforeEach';
import store from '@/store'
import { Provider } from 'react-redux'
const App: React.FC = () => {
  const outlet = useRoutes(routes)
  return (
    // <Layout></Layout>
    <Provider store={store}>
      <RouterBeforeEach>
        {outlet}
      </RouterBeforeEach>
    </Provider>
  );
};

export default App;