/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  Input,
  Button,
  Select,
  DatePicker,
  Radio,
  Message,
  Upload,
} from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { withRouter } from 'react-router-dom';
import './index.scss'
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper';

const { Option } = Select;

@withRouter
export default class NewPostForm extends Component {
  static displayName = 'NewPostForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        status: 'pending',
        editorState: BraftEditor.createEditorState(),
        pendingUploadImage: '',
        cover: [{
          uid: '0',
          name: 'IMG.png',
          state: 'done',
          url: 'https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg',
          downloadURL: 'https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg',
          imgURL: 'https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg',
        }],
      },
    };
    this.handleContentChange = this.handleContentChange.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  formChange = (value) => {
    console.log('value', value);
    this.setState({
      value,
    });
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        console.log({ errors });
      }
      console.log({ values });
      Message.success('提交成功');
      this.props.history.push('/post/list');
    });
  };

  handleContentChange = (editorState) => {
    this.setState({ editorState })
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
          <div class="container">${this.state.editorState.toHTML()}</div>
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
      editorState: ContentUtils.insertHTML(this.state.editorState,"<h1>123</>",this.state.pendingUploadImage)
    })
  }

  render() {
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
                name="name"
              >
                <Input
                  placeholder="请输入文章名称"
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
              <IceFormBinder name="cate">
                <Select
                  placeholder="请选择"
                  mode="multiple"
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
              <IceFormBinder name="cover">
                <Upload.Card
                  listType="card"
                  action="//www.easy-mock.com/mock/5b960dce7db69152d06475bc/ice/upload" // 该接口仅作测试使用，业务请勿使用
                />
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>文章时间</div>
              <IceFormBinder name="time">
                <DatePicker
                  size="large"
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
