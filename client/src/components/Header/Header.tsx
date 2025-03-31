import classes from './Header.module.scss';
import { FaBookOpen } from 'react-icons/fa';

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <h2>quizverse</h2>
        <FaBookOpen size={22} />
      </div>
    </header>
  );
};

export default Header;
