import React, { Component } from "react";
import styled from "styled-components";
import FileIcon from "components/Commons/FileIcon";
import { FormControl } from "modules/FormControl";

const FileWrap = styled.div`
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  img {
    max-width: 100%;
    vertical-align: top;
  }
  .iconWrap {
    padding: 10px 20px;
    &::after {
      display: block;
      content: "";
      clear: both;
    }
    .LinkFileName {
      line-height: 70px;
      font-size: 20px;
    }
  }
`;

const File = styled.div`
  width: 1px;
  height: 1px;
  margin: -1px;
  position: absolute;
  clip: rect(0, 0, 0, 0);
  overflow: hidden;
  outline: 0;
  border: 0;
`;

class FileController extends Component {
  state = {
    fileUrl: null,
    is_image: false,
    extension: "",
    type: "",
    value: [],
    target: null,
    validates: ["MaxFileSize(99999999)"]
  };

  async componentDidMount() {
    console.log("componentDidMount");
    if (this.props.item) {
      await this.setInit({ ...this.props.item });
      if (this.props.item.initClick) {
        console.log("1");
        this.state.target.click();
      }
    }
  }

  async shouldComponentUpdate(nextProps) {
    let newProp = { ...this.props.item };
    delete newProp.target;
    let copyProps = { ...nextProps.item };
    delete copyProps.target;
    if (JSON.stringify(newProp) !== JSON.stringify(copyProps)) {
      let obj = {
        fileUrl: null,
        is_image: false,
        extension: "",
        type: "",
        ...nextProps.item
      };
      if (!copyProps.uid) {
        obj.uid = null;
        obj.fileUrl = "";
      }
      await this.setInit(obj);
    } else if (
      nextProps.item.fileUrl == null ||
      nextProps.item.content === ""
    ) {
      if (this.state.target) {
        setTimeout(() => {
          if (nextProps.item.initClick) {
            console.log("2", nextProps.item);
            this.state.target.click();
          }
        }, 100);
      }
    }
    return true;
  }

  setInit = async item => {
    console.log("item2", item);
    await this.setState({
      ...item,
      target: this.input
    });
    if (!item.content) return;
    if (item.data_type.split("/")[0] === "image") {
      await this.setState({
        file_type: item.data_type.split("/")[0],
        is_image: true
      });
    } else {
      await this.setState({
        file_type: item.data_type.split("/")[0],
        is_image: false
      });
    }
  };

  readUploadedFileAsText = inputFile => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsDataURL(inputFile);
    });
  };

  onChangeValue = async (e) => {
    console.log("onChangeValue", this.input.files);
    const event = {...e};
    let data = this.input.files;
    if (data[0]) {
      let type = null;
      if (data[0].type) type = await data[0].type.split("/")[0];
      let extension = await data[0].name.split(".");
      extension = await extension[extension.length - 1];

      const fileUrl = await this.readUploadedFileAsText(data[0]);
      if (type === "image") {
        await this.setState({
          fileUrl: fileUrl,
          is_image: true,
          file_type: type,
          extension: extension,
          file_name: data[0].name
        });
      } else {
        await this.setState({
          fileUrl: fileUrl,
          is_image: false,
          file_type: type,
          extension: extension,
          file_name: data[0].name
        });
      }
    } else {
      await this.setState({
        fileUrl: "",
        is_image: false,
        file_type: "",
        extension: "",
        file_name: null
      });
    }
    await this.setState({ ...data });
    if (data.length > 0) {
      const target = event.currentTarget;
      await this.setState({ value: target.files, target });
      FormControl(this.state)
        .then(data => {
          this.returnData();
        })
        .catch(err => {
          console.log("formFile", err);
          alert(err.message);
        });
    }
  };

  onClickFile = () => {
    this.state.target.click();
  };

  returnData = async e => {
    if (this.props.getValue) await this.props.getValue(this.state);
    if (e && this.props.onBlur) await this.props.onBlur();
  };

  render() {
    const contentImg = this.props.item.content
      ? this.props.item.content
      : this.props.item.fileUrl;
    return (
      <FileWrap>
        {(this.props.item.content || this.props.item.fileUrl) &&
        this.state.is_image ? (
          <img src={contentImg} alt="이미지" />
        ) : (this.props.item.content || this.props.item.extension) &&
        !this.state.is_image ? (
          <div className="iconWrap">
            <FileIcon
              type={this.props.item.file_type}
              extension={this.props.item.extension}
            />
            <span className="LinkFileName">{this.props.item.file_name}</span>
          </div>
        ) : null}
        <File>
          <input
            type="file"
            name="source"
            onChange={this.onChangeValue}
            ref={ref => (this.input = ref)}
            style={{ display: "none" }}
          />
          <span></span>
        </File>
      </FileWrap>
    );
  }
}

export default FileController;
