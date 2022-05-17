import { BrowserRouter } from 'react-router-dom';
import AppErrorBoundaryFallback from '@/error-handling/AppErrorBoundaryFallback';
import Pages from '@/routes/Pages';
import { globalStyles } from '@/styles/base';
import { ErrorBoundary } from 'react-error-boundary';
import Header from '@/blocks/Header';
import { BookmarksContext } from '@/BookmarksContext';


function App() {
  globalStyles();

  return <ErrorBoundary FallbackComponent={AppErrorBoundaryFallback}>
      <BrowserRouter>
        <BookmarksContext>
          <Header />
          <main>
            <Pages />
          </main>
        </BookmarksContext>
      </BrowserRouter>
  </ErrorBoundary>;
}

export default App;
