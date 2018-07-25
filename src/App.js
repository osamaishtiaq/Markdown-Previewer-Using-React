import React, { Component } from 'react';
import './App.css';
import marked from 'marked';

marked.setOptions({
  breaks: true
});

const renderer = new marked.Renderer();

renderer.link = (href, title, text) => `<a target="_blank" href="${href}">${text}` + '</a>';

const renderMarkdown = (text) => {
  return {
    __html: marked(text, {
      renderer: renderer
    })
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rawText : ''
    }
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  componentDidMount() {
    console.log(marked('Hello World'));
  }

  handleTextChange(event) {
    this.setState({
      rawText : event.target.value,
    });
  }

  render() {
    return (
      <div className="App">
        <Header />  
        <Main text={this.state.rawText} handleTextChange={this.handleTextChange}/>
        <Footer />
      </div>
    );
  }
}

const Header = () => {
return (
    <header className="App-header">
      <h1 className="App-title">Markdown Previewer by <span style={{color: 'cyan', fontWeight: 'bold'}}>Ozarion</span></h1>
    </header>
  );
}

const Main = (props) => {
  return (
    <main className='App-body'>
      <Editor text={props.text} handleTextChange={props.handleTextChange}/>
      <Preview text={props.text}/>
    </main>
  );
}

const Footer = () => {
  return (
    <footer className='footer'>
      <p className='footer-text'>Created by Ozarion</p>
    </footer>
  )
}

const Preview = (props) => {
  return (
    <div className='preview-box'>
      <div className='tool-bar'>Preview</div>
      <div id='preview' dangerouslySetInnerHTML={renderMarkdown(props.text)}/>
    </div>
  );
}

const Editor = (props) => {
  return (
    <div className='editor-box'>
      <div className='tool-bar'>Editor</div>
      <textarea id='editor' value={props.text} onChange={props.handleTextChange}></textarea>    
    </div>
  );
}

export default App;