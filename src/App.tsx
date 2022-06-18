import { Suspense } from 'react';
import { theme } from './Theme';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* TODO to add a backdrop */}
      <Suspense fallback={<></>}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
