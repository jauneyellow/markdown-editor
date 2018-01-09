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
    this.getVimCommand = this.getVimCommand.bind(this);
    this.evalVimCommand = this.evalVimCommand.bind(this);
  }

  componentDidMount() {
    ipc.on("open-file", (event, arg) => {
      const file = arg.toString();
      this.setState({
        currentFile: file
      });
      this.openFile(this.state.currentFile);
    });
    ReactDOM.findDOMNode(this).addEventListener("keypress", e => {
      const keyName = e.key;
      if (keyName == ":") {
        $("footer").toggleClass("is-hidden");
        $("#vim-input").focus();
        $("#vim-input")[0].scrollIntoView();
        // if ($("footer").hasClass("is-hidden")) {
        //   $(".vim-input").focus();
        // }
      }
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

  getVimCommand(event) {
    if (event.key == "Enter") {
      console.log(event.target.value);
      this.evalVimCommand(event.target.value.slice(1));
    }
  }

  evalVimCommand(command) {
    console.log(command);
  }

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
        <footer className="footer is-hidden">
          <input
            type="text"
            id="vim-input"
            className="vim-input"
            defaultValue=":"
            onKeyDown={this.getVimCommand}
          />
        </footer>
      </div>
    );
  }
}

module.exports = App;
