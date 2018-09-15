class LikeButton extends React.Component {
  render() {
    return (
      <h1>Home</h1>
    );
  }
}

let domContainer = document.querySelector('#app');
ReactDOM.render(<LikeButton />, domContainer);