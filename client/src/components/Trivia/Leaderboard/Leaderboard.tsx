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
        <Score username="petrdragonman" score={102} />        
        <Score username="nathanl2" score={97} />
        <Score username="jamesnemeth" score={84.5} />
        <Score username="nikitao13" score={72} />
      </div>
    </div>
  );
};

export default Leaderboard;
