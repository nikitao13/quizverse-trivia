import classes from './Leaderboard.module.scss';

interface ScoreProps {
  username: string;
  score: number;
}

const Score = ({ username, score }: ScoreProps) => {
  return (
    <div className={classes.individualScore}>
      <p>{username}</p> <p className={classes.score}>{score}</p>
    </div>
  );
};

export default Score;
