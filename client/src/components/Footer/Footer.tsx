import classes from './Footer.module.scss';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const iconSize = 18;

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.icons}>
        <a
          href="https://github.com/nikitao13"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          <FaGithub size={iconSize} />
        </a>
        <a
          href="https://linkedin.com/in/nikitaokeeffe"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          <FaLinkedin size={iconSize} />
        </a>
        <a
          href="https://x.com/lvl99str"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          <FaTwitter size={iconSize} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
