import Header from '../components/Header/Header';
import PropTypes from 'prop-types';
import styles from './DefaultLayout.module.scss';
import useTheme from '../hooks/useTheme';
import classNames from 'classnames';
function DefaultLayout({ title, children }) {
  const [theme] = useTheme();
  const { app, dark, content } = styles;
  return (
    <div className={classNames(app, { [dark]: theme === 'dark' })}>
      <Header title={title} />
      <div className={classNames(content, 'container')}>{children}</div>
    </div>
  );
}
DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};

export default DefaultLayout;
