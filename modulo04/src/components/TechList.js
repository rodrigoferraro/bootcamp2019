import React, { Component } from "react";
import TechItem from './TechItem'

class TechList extends Component {
  state = {
    newTech: "",
    techs: []
  };

  handleInputChange = e => {
    this.setState({ newTech: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.newTech.trim()==="") return;

    this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: ""
    });
  };

  handleDelete = (tech) => {
    this.setState({
      techs: [...this.state.techs.filter(t=>t!==tech)] 
    });
  };

  componentDidMount(){
    const techs = localStorage.getItem('techs')

    if (techs){
      this.setState({techs: JSON.parse(techs)})
    }
  }

  //componentDidUpdate(prevProps, prevState){
  componentDidUpdate(_, prevState){
    if (prevState.techs !== this.state.techs){
      localStorage.setItem('techs', JSON.stringify(this.state.techs))
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ul>
          {this.state.techs.map(t => (
            <TechItem 
              key={t} 
              tech={t}
              onDelete={() => this.handleDelete(t)}
            />)) 
          }
        </ul>
        <input
          type="text"
          onChange={this.handleInputChange}
          value={this.state.newTech}
        />
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default TechList;
