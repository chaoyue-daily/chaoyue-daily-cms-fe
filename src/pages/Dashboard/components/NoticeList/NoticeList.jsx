import Container from '@icedesign/container';
import React, { Component } from 'react';
import fecha from 'fecha';

import { Pagination } from '@alifd/next';

const mokeDataTitle = [
  '【今日新闻未更新】请及时撰写本日新闻。',
  '【应援活动已开启】请帮助提高曝光量。',
  '【原创作品已提交】请审核作品内容。',
];

class NoticeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: Array.from({ length: 10 }).map(() => {
        return {
          title: mokeDataTitle[Math.floor(Math.random() * 4)],
          url: '#',
          top: Math.random() > 0.5,
          hot: Math.random() > 0.5,
          new: Math.random() > 0.5,
          time: Date.now() - Math.floor(10000000000 * Math.random()),
        };
      }),
    };
  }

  handleChange = () => {
    this.setState({
      dataSource: Array.from({ length: 10 }).map(() => {
        return {
          title: mokeDataTitle[Math.floor(Math.random() * 4)],
          url: '#',
          top: Math.random() > 0.5,
          hot: Math.random() > 0.5,
          new: Math.random() > 0.5,
          time: Date.now() - Math.floor(10000000000 * Math.random()),
        };
      }),
    });
  };

  render() {
    return (
      <Container>
        <h3 style={styles.header}>平台公告</h3>
        <div>
          {this.state.dataSource.map((notice, index) => {
            return (
              <a
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                title={notice.title}
                href={notice.url}
                style={styles.noticeItem}
              >
                <div>
                  <span style={styles.title}>{notice.title}</span>
                  {notice.top && (
                    <span style={{ ...styles.tag, ...styles.top }}>置顶</span>
                  )}
                  {notice.hot && (
                    <span style={{ ...styles.tag, ...styles.hot }}>HOT</span>
                  )}
                  {notice.new && (
                    <span style={{ ...styles.tag, ...styles.new }}>NEW</span>
                  )}
                </div>
                <span style={styles.time}>
                  {fecha.format(notice.time, 'MM-DD HH:mm')}
                </span>
              </a>
            );
          })}
          <div style={{ textAlign: 'right', paddingTop: 20 }}>
            <Pagination onChange={this.handleChange} />
          </div>
        </div>
      </Container>
    );
  }
}

const styles = {
  header: {
    fontSize: 16,
    lineHeight: '16px',
    paddingBottom: 20,
    fontWeight: 700,
  },
  noticeItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #fafafa',
    lineHeight: '54px',
    height: 54,
    textDecoration: 'none',
  },
  title: {
    color: '#333',
  },
  tag: {
    fontSize: 12,
    lineHeight: '16px',
    marginLeft: 5,
    padding: '2px 8px',
    borderRadius: 20,
  },
  top: {
    backgroundColor: '#eff6ff',
    color: '#5e83fb',
  },
  hot: {
    backgroundColor: '#ffe8e8',
    color: '#ee706d',
  },
  new: {
    backgroundColor: '#fff4e2',
    color: '#f7da47',
  },
  time: { color: '#999' },
};

export default NoticeList;
