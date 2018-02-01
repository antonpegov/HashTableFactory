class AddItem extends React.Component {
  constructor(props) {
    super();
    this.state = {name: '', age: ''}
  }

  render() {
    return(
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <div className="col-auto">          
            <input type="text" className="form-control" name="name"
                value={this.state.name} onChange={this.handleChange} placeholder="Name" />
          </div>
          <div className="col-auto">
            <input type="text" className="form-control" name="age"
                value={this.state.age} onChange={this.handleChange} placeholder="Age" />
          </div>
          <div className="col-auto">
            <input type="submit" className="btn btn-success" value="Add item"/>
          </div>
        </div>
      </form>
    )
  }

  handleSubmit = (event) => {
    let name = this.state.name;
    let value = {age: this.state.age};
    this.props.hashTable.insert(name, value);
    this.props.refresher();
    event.preventDefault();
    console.log(this);
  }

  handleChange = (event) => {
    let newState = {}; 
    newState[event.target.name] = event.target.value; // to identify input source
    this.setState(prevState => Object.assign({}, prevState, newState));
  }
}