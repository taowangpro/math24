import React from 'react';

class App extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {cards: [], solution: []}
  }
  componentDidMount() {
    this.generate();
  }
  
  generate() {
    this.setState({
      cards: [
        Math.ceil(Math.random() * 13),
        Math.ceil(Math.random() * 13),
        Math.ceil(Math.random() * 13),
        Math.ceil(Math.random() * 13)
      ],
      solution: []
    });
  }

  resolve(cards, goal, expr, allResults) {
    let solution;

    // at very beginning
    if (cards === undefined) {
      var result = [];
      this.resolve(this.state.cards, 24, '', result);
      this.setState({solution: result});
      return;
    }

    // ending
    if (cards.length === 1) {
      if (cards[0] === goal) {
        allResults.push(expr + cards[0] + ')))');
      }
      return;
    }

    // in processing
    for (var i = 0; i < cards.length ; i++) {
      let [one, ...rest] = cards;

      this.resolve(rest, goal - one, `${expr}(${one} + `, allResults);
      this.resolve(rest, one - goal, `${expr}(${one} - `, allResults);
      this.resolve(rest, goal / one, `${expr}(${one} * `, allResults);
      this.resolve(rest, one / goal, `${expr}(${one} / `, allResults);

      cards.unshift(cards.pop());
    }

    return solution;
  }

  renderGenerate() {
    const {cards} = this.state;

    return (
      <div>
        {
          cards.map((a, i) => (
            <span key={a + '' + i} style={{
              display: 'inline-block',
              fontSize: '5em',
              border: '3px solid',
              width: '120px',
              textAlign: 'center',
              padding: '30px 0',
              margin: '0 20px',
              borderRadius: '10px'
            }}>
              {a}
            </span>
          ))
        }
      </div>
    )
  }

  render() {

    return (
      <React.Fragment>
        <h1>Hello, Eric</h1>
        {this.renderGenerate()}
        <br />
        <button type="button" onClick={()=>this.resolve()}>Resolve It</button>
        <button type="button" onClick={()=>this.generate()}>Re Start</button>
        <h2>Solution</h2>
        <span>{
          this.state.solution.map((a,i) => (<div key={i + a}>{a}</div>))
        }</span>
      </React.Fragment>
    );
  }
}

export default App;