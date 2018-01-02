const React = require("react");
const CodeMirror = require("codemirror");
require("codemirror/mode/markdown/markdown");
require("codemirror/lib/codemirror.css");
require("codemirror/keymap/vim");
require("codemirror/theme/monokai.css");
require("codemirror/addon/edit/continuelist");

class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.loadFile = this.loadFile.bind(this);
  }

  handleUpdate() {
    this.props.onUpdate(this.editor.getValue());
  }

  loadFile(value) {
    this.editor.getDoc().setValue(value);
  }

  componentDidMount() {
    this.editor = CodeMirror.fromTextArea(document.getElementById("code"), {
      lineNumbers: false,
      lineWrapping: true,
      mode: "markdown",
      theme: "monokai",
      keyMap: "vim",
      extraKeys: {
        Enter: "newlineAndIndentContinueMarkdownList"
      }
    });
    this.editor.on("change", this.handleUpdate);
    this.editor.focus();
  }

  render() {
    return (
      <div className="pane">
        <textarea id="code" />
      </div>
    );
  }
}

module.exports = MarkdownEditor;
