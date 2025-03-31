import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GameSettingsProvider } from './context/GameSettingsProvider';
import Header from './components/Header/Header';
import Trivia from './components/Trivia/Trivia';
import Footer from './components/Footer/Footer';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GameSettingsProvider>
        <div className="app">
          <Header />
          <Trivia />
          <Footer />
        </div>
      </GameSettingsProvider>
    </QueryClientProvider>
  );
};
export default App;
