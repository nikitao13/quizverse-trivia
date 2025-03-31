import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface FetchTriviaProps {
  queryKey: [string, string, string];
}

const fetchTrivia = async ({ queryKey }: FetchTriviaProps) => {
  const [, difficulty, category] = queryKey;
  const { data } = await axios.get(
    `https://opentdb.com/api.php?amount=7&category=${category}&difficulty=${difficulty}`
  );
  return data;
};

interface GameSettings {
  difficulty: string;
  category: string;
  username: string;
}

export const useTrivia = (gameSettings: GameSettings) => {
  const { difficulty, category } = gameSettings;

  return useQuery({
    queryKey: ['trivia', gameSettings.difficulty, gameSettings.category],
    queryFn: fetchTrivia,
    enabled: difficulty !== '' && category !== '',
    retry: 1,
    retryDelay: 5000,
    staleTime: Infinity,
  });
};
