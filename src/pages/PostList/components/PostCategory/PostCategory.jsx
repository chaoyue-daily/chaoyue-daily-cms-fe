import React, { Component } from 'react';
import { Tab, Button } from '@alifd/next';
import { withRouter } from 'react-router-dom';
import styles from './index.module.scss';

function random(min, max) {
  return parseInt(Math.random() * (max - min + 1) + min, 10);
}

function mockCentent() {
  return Array.from({ length: 2 + Math.round(Math.random() * 5) }).map(() => {
    return {
      id: Math.random(),
      title: ['穿搭日记', '流行指南', '美发心得', '场景搭配'][random(0, 3)],
      cover:
        'https://img.alicdn.com/tfs/TB1sbkkXmBYBeNjy0FeXXbnmFXa-280-498.png',
      url: '#',
      detail: [
        {
          label: '文章简要',
          desc:
            '分享日常的真人穿搭或专业的教程，对时尚有自己的理解，能够给消费者提供时尚搭配心得',
        },
      ],
    };
  });
}

@withRouter
export default class PostCategory extends Component {
  handleNewPost = (id) => {
    this.props.history.push(`/post/new/${id}`);
  };

  render() {
    const tabs = [
      {
        title: '新闻',
        icon: require('./images/post.png'),
        key: 'news',
        content: mockCentent(),
      },
      {
        title: '活动',
        icon: require('./images/fiy.png'),
        key: 'activity',
        content: mockCentent(),
      },
      {
        title: '投稿',
        icon: require('./images/video.png'),
        key: 'contribute',
        content: mockCentent(),
      }
    ];

    return (
      <div>
        <div className={styles.titleWrapper}>
          <span
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: '#333',
              paddingRight: 20,
            }}
          >
            文章列表
          </span>
        </div>
        <Tab
          navStyle={{ backgroundColor: '#fff' }}
          contentStyle={{
            backgroundColor: '#fff',
            marginTop: '20px',
            borderRadius: '6px',
          }}
        >
          {tabs.map((tab) => {
            return (
              <Tab.Item
                tabStyle={{ height: 60, padding: '0 15px' }}
                key={tab.key}
                title={
                  <div className={styles.navItemWraper}>
                    <img
                      alt={tab.title}
                      src={tab.icon}
                      style={{ width: 30, marginRight: 8 }}
                    />
                    {tab.title}
                  </div>
                }
              >
                <div className={styles.postCategoryList}>
                  {tab.content.map((item, index) => {
                    return (
                      <div key={index} className={styles.postCategoryItem}>
                        <div className={styles.coverWrapper}>
                          <img
                            alt={item.title}
                            style={{ width: 140, display: 'block' }}
                            src={item.cover}
                          />
                        </div>
                        <div className={styles.blockDetail}>
                          <h3 className={styles.blockTitle}>{item.title}</h3>

                          {item.detail.map((desc, detailIndex) => {
                            return (
                              <div key={detailIndex} className={styles.blockItem}>
                                <label className={styles.blockLable}>
                                  {desc.label}
                                </label>
                                <div
                                  className={styles.blockDesc}
                                  dangerouslySetInnerHTML={{
                                    __html: desc.desc,
                                  }}
                                />
                              </div>
                            );
                          })}
                          <Button
                            className={styles.blockBtn}
                            onClick={()=>this.handleNewPost(item.id)}
                          >
                            修改文章
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Tab.Item>
            );
          })}
        </Tab>
      </div>
    );
  }
}
