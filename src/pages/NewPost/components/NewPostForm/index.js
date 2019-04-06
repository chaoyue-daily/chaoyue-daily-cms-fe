/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  Input,
  Button,
  Select,
  DatePicker,
  Radio,
  Upload,
} from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import Notification from '@icedesign/notification';
import { withRouter } from 'react-router-dom';
import './index.scss'
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper';
import { getArticleById, addArticle, updateArticle } from '../../../../api/article';
const { Option } = Select;

@withRouter
export default class NewPostForm extends Component {
  static displayName = 'NewPostForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      pendingUploadImage: '',
      value: {
        content: BraftEditor.createEditorState(),
      },
    };
    this.handleContentChange = this.handleContentChange.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  componentDidMount() {
    let isUpdate = this.props.location.pathname.includes("update");
    if(isUpdate){
      let id = this.props.location.pathname.split("/").pop();
      getArticleById(id).then(data => {
        data.content = BraftEditor.createEditorState(data.content);
        this.setState({value:data});
      }).catch((error) => {
        console.log(error)
      })
    }
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        Notification.error('请修正数据');
        return;
      }

      let isUpdate = this.props.location.pathname.includes("update");
      this.state.value.image_url = "test";
      this.state.value.content = this.state.value.content.toHTML();
      let request = isUpdate ? updateArticle(this.state.value) : addArticle(this.state.value);
      request.then(data => {
          Notification.info(isUpdate ? '修改成功！' : '创建成功');
          this.props.history.push('/post/list');
        }).catch((error) => {
          console.log(error)
        })
    });
  };

  handleContentChange = (content) => {
    this.setState({ content })
  }

  preview = () => {

    if (window.previewWindow) {
      window.previewWindow.close()
    }

    window.previewWindow = window.open()
    window.previewWindow.document.write(this.buildPreviewHtml())
    window.previewWindow.document.close()

  }

  buildPreviewHtml () {
    return `
      <!Doctype html>
      <html>
        <head>
          <title>Preview Content</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container">${this.state.content.toHTML()}</div>
        </body>
      </html>
    `
  }
  onFileUpload(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ pendingUploadImage: reader.result });
    };
    reader.readAsDataURL(files[0]);
  }

  _crop(){
    // image in dataUrl
    // console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
  }

  handleFileUpload = () => {  
    this.setState({
      content: ContentUtils.insertHTML(this.state.content,"<h1>123</>",this.state.pendingUploadImage)
    })
  }

  render() {
    const { value } = this.state;
    const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator', 'media' ]
    const extendControls = [
      {
        key: 'custom-modal',
        type: 'modal',
        text: '插入图片',
        modal: {
          id: 'img-model',
          title: 'Please select.',
          width: 500, // 指定弹窗组件的宽度
          // height: 500, // 指定弹窗组件的高度
          showConfirm: true,
          confirmable: true,
          onConfirm: () => {this.handleFileUpload()},
          children: (
            <div>
              <input type="file" onChange={this.onFileUpload} />
              <Cropper
                ref='cropper'
                src={this.state.pendingUploadImage}
                style={{height: 240, width: 240}}
                // Cropper.js options
                aspectRatio={16 / 9}
                guides={false}
                crop={this._crop.bind(this)} />
            </div>
          )
        }
      },
      {
        key: 'custom-button',
        type: 'button',
        text: '预览',
        onClick: this.preview
      }]

    return (
      <IceContainer style={styles.container}>
        <div style={styles.title}>发布文章</div>
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div style={styles.formContent}>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>标题</div>
              <IceFormBinder
                required
                triggerType="onBlur"
                message="文章名称不能为空"
                name="title"
              >
                <Input
                  placeholder="请输入文章名称"
                  value = {value.title}
                  size="large"
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="name" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>文章类别</div>
              <IceFormBinder name="type">
                <Select
                  placeholder="请选择"
                  value = {value.type}
                  size="large"
                  style={{ width: '400px' }}
                >
                  <Option value="1001">个人动态</Option>
                  <Option value="1002">相关动态</Option>
                  <Option value="1003">故事</Option>
                  <Option value="1004">精品视频</Option>
                  <Option value="1005">活动</Option>
                  <Option value="1006">原创文章</Option>
                </Select>
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>封面图</div>
              <IceFormBinder name="imageUrl">
                <Upload.Card
                  listType="card"
                  action="//www.easy-mock.com/mock/5b960dce7db69152d06475bc/ice/upload" // 该接口仅作测试使用，业务请勿使用
                />
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>文章时间</div>
              <IceFormBinder name="date">
                <DatePicker
                  size="large"
                  value = {value.date}
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>内容</div>
              <IceFormBinder
                required
                triggerType="onBlur"
                message="内容不能为空"
                name="content"
              >
                 <BraftEditor
                  value = {value.content}
                  className="my-editor"
                  controls={controls}
                  extendControls={extendControls}
                  placeholder="请输入正文内容"
                  onChange={this.handleContentChange}
                />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="author" />
              </div>
            </div>
            <Button
              type="primary"
              size="large"
              style={styles.submitButton}
              onClick={this.validateAllFormField}
            >
              提 交
            </Button>
          </div>
        </IceFormBinderWrapper>
      </IceContainer>
    );
  }
}

const styles = {
  title: {
    marginBottom: '30px',
    fontSize: '18px',
    fontWeight: '500',
    color: 'rgba(0, 0, 0,.85)',
  },
  formContent: {
    marginLeft: '30px',
  },
  formItem: {
    marginBottom: '25px',
    display: 'flex',
    alignItems: 'center',
  },
  formLabel: {
    width: '70px',
    marginRight: '15px',
    textAlign: 'right',
  },
  formError: {
    marginLeft: '10px',
  },
  tips: {
    color: '#f37327',
    fontSize: '12px',
    margin: '20px 0',
  },
  submitButton: {
    marginLeft: '85px',
  },
};
