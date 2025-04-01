import { BeatLoader } from 'react-spinners';
import classes from './Loader.module.scss';

const Loader = () => {
  return <BeatLoader className={classes.loader} color="#2e8b57" size={10} />;
};
export default Loader;
