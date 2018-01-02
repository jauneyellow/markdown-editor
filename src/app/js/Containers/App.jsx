const React = require("react");
const ReactDOM = require("react-dom");

const fs = require("fs");
const path = require("path");
const electron = require("electron");
const ipc = electron.ipcRenderer;

const MarkdownEditor = require("../Components/MarkdownEditor");
const MarkdownPreview = require("../Components/MarkdownPreview");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      md: "",
      currentFile: null
    };
    this.updateMD = this.updateMD.bind(this);
    this.openFile = this.openFile.bind(this);
  }

  componentDidMount() {
    ipc.on("open-file", (event, arg) => {
      const file = arg.toString();
      this.setState({
        currentFile: file
      });
      this.openFile(this.state.currentFile);
    });
  }

  componentWillUnmount() {
    ipc.removeListener("open-file", (event, arg) => {});
  }

  openFile(path) {
    const newMd = fs.readFileSync(path, "utf-8");
    this.setState({
      md: newMd
    });
    this.child.loadFile(this.state.md);
  }

  updateMD(md) {
    this.setState({
      md: md
    });
  }

  loadFile() {}

  render() {
    const { md } = this.state;
    return (
      <div className="window">
        <div className="window-content">
          <div className="pane-group">
            <MarkdownEditor
              onUpdate={this.updateMD}
              value={md}
              ref={instance => (this.child = instance)}
            />
            <MarkdownPreview md={md} />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = App;
