import React, { Component } from 'react';
import { Tab, Button } from '@alifd/next';
import BalloonConfirm from '@icedesign/balloon-confirm';
import { withRouter } from 'react-router-dom';
import { getArticleByType, deleteArticle } from '../../../../api/article';
import styles from './index.module.scss';


@withRouter
export default class PostCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {
          title: '新闻',
          icon: require('./images/post.png'),
          key: 'news',
        },
        {
          title: '活动',
          icon: require('./images/fiy.png'),
          key: 'activities',
        },
        {
          title: '投稿',
          icon: require('./images/video.png'),
          key: 'contributes',
        },
      ],
      currentContentType: 'news',
      content: [],
    };
    this.changeTab = this.changeTab.bind(this);
  }

  componentDidMount() {
    this.getContentByType(this.state.currentContentType);
  }

  handleUpdatePost = (id) => {
    this.props.history.push(`/post/update/${id}`);
  }

  handleDeletePost = (id) => {
    deleteArticle(id).then(data => {
      this.getContentByType(this.state.currentContentType);
    }).catch((error) => {
      console.log(error)
    });
  }

  changeTab = (tabName) => {
    this.getContentByType(tabName);
  }

  getContentByType = (type) => {
      getArticleByType(type).then(data => {
        this.setState({currentContentType:type, content:data});
      }).catch((error) => {
        console.log(error)
      })
  }

  render() {
    const { tabs, content } = this.state;
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
          onChange={this.changeTab}
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
                  {content.map((item, index) => {
                    return (
                      <div key={index} className={styles.postCategoryItem}>
                        <div className={styles.blockDetail}>
                          <h3 className={styles.blockTitle}>{item.title}</h3>
                          <Button
                            className={styles.blockBtn}
                            onClick={()=>this.handleUpdatePost(item.id)}>
                            修改文章
                          </Button>
                          <BalloonConfirm
                            onConfirm={()=>this.handleDeletePost(item.id)}
                            title="真的要删除吗亲">
                             <Button
                              className={styles.blockBtn}>
                              删除文章
                            </Button>
                          </BalloonConfirm>
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
