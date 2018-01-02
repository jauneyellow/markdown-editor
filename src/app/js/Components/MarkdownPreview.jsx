const React = require("react");
const MarkdonwIt = require("markdown-it");
const renderHTML = require("react-render-html");

class MarkdownPreview extends React.Component {
  constructor(props) {
    super(props);
    this.md2HTML = this.md2HTML.bind(this);
  }

  md2HTML(markdown) {
    const md = new MarkdonwIt();
    return md.render(markdown);
  }

  render() {
    const { md } = this.props;
    return (
      <div className="pane">
        <div className="markdown-preview">{renderHTML(this.md2HTML(md))}</div>
      </div>
    );
  }
}

module.exports = MarkdownPreview;
