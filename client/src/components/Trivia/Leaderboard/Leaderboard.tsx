import classes from './Leaderboard.module.scss';
import Score from './Score';
import { FaTrophy } from 'react-icons/fa';

const Leaderboard = () => {
  return (
    <div className={classes.leaderboard}>
      <div className={classes.leaderboardHeader}>
        <p className={classes.title}>leaderboard</p>
        <FaTrophy />
      </div>
      <div className={classes.scores}>
        <Score username="trivia-genuis" score={102} />        
        <Score username="sportfan12" score={97} />
        <Score username="ilovegames" score={84.5} />
        <Score username="nikitao13" score={72} />
      </div>
    </div>
  );
};

export default Leaderboard;
