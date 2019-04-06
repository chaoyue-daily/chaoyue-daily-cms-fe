import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

export default class Logo extends PureComponent {
  render() {
    return (
      <Link to="/" className={styles.logo} style={this.props.style}>
        超越日报
      </Link>
    );
  }
}
