import classes from './Footer.module.scss';
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';

const iconSize = 18;

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <FaGithub size={iconSize} />
      <FaLinkedin size={iconSize} />
      <FaTwitter size={iconSize} />
    </footer>
  );
};

export default Footer;
