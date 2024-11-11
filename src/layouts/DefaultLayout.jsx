import Header from '../components/Header/Header';
import PropTypes from 'prop-types';
import styles from './DefaultLayout.module.scss';
function DefaultLayout({ title,children }) {
    return (
        <div className="App">
            <Header title={title} />
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired
};

export default DefaultLayout;