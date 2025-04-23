import axios from 'axios';
import { Results } from '../context/GameSettingsContext';

export function saveGameResult(result: Results) {
  const answered = result.questions.filter((q) => q.userAnswer !== '');

  return axios.post('http://localhost:8080/api/history', {
    username: result.username,
    category: result.category,
    difficulty: result.difficulty,
    score: result.score,
    questionsJson: JSON.stringify(answered),
  });
}
