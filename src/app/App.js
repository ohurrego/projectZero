import React, { Component } from 'react';

const options = [
  'one', 'two', 'three'
]

const defaultOption = options[0]

class App extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      category: '',
      site: '',
      address: '',
      startDate: new Date().toISOString().substring(0, 10),
      endDate: new Date().toISOString().substring(0, 10),
      type: '',
      _id: '',
      events: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.addEvent = this.addEvent.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  addEvent(e) {
    e.preventDefault();
    if(this.state._id) {
      fetch(`/api/events/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: this.state.name,
          category: this.state.category,
          site: this.state.site,
          address: this.state.address,
          startDate: this.state.startDate,
          endDate: this.state.endDate,
          type: this.state.type
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          window.M.toast({html: 'Event Updated'});
          this.setState({_id: '', name: '', category: '', site: '', address: '', startDate: new Date().toISOString().substring(0, 10), endDate: new Date().toISOString().substring(0, 10), type: ''});
          this.fetchEvents();
        });
    } else {
      fetch('/api/events', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          window.M.toast({html: 'Event Saved'});
          this.setState({name: '', category: '', site: '', address: '', startDate: new Date().toISOString().substring(0, 10), endDate: new Date().toISOString().substring(0, 10), type: ''});
          this.fetchEvents();
        })
        .catch(err => console.error(err));
    }

  }

  deleteEvent(id) {
    if(confirm('Are you sure you want to delete it?')) {
      fetch(`/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          M.toast({html: 'Event deleted'});
          this.fetchEvents();
        });
    }
  }

  editEvent(id) {
    fetch(`/api/events/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          name: data.name,
          category: data.category,
          site: data.site,
          address: data.address,
          startDate: data.startDate,
          endDate: data.endDate,
          type: data.type,
          _id: data._id
        });
      });
  }

  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents() {
    fetch('/api/Events')
      .then(res => res.json())
      .then(data => {
        this.setState({events: data});
        console.log(this.state.events);
      });
  }

  render() {
    return (
      <div>
        {/* NAVIGATION */}
        <nav className="light-blue darken-4">
          <div className="container">
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">ABC ProjectZero - oh.urrego@uniandes.edu.co</a>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addEvent}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="name" onChange={this.handleChange} value={this.state.name} type="text" placeholder="Event Name" autoFocus/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="category" onChange={this.handleChange} value={this.state.category} cols="30" rows="10" placeholder="Event Category" className="materialize-textarea"></textarea>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="site" onChange={this.handleChange} value={this.state.site} cols="30" rows="10" placeholder="Event Site" className="materialize-textarea"></textarea>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="address" onChange={this.handleChange} value={this.state.address} cols="30" rows="10" placeholder="Event Address" className="materialize-textarea">
                        <select value={this.state.value} onChange={this.handleChange}>
                          <option value="grapefruit">Grapefruit</option>
                          <option value="lime">Lime</option>
                          <option value="coconut">Coconut</option>
                          <option value="mango">Mango</option>
                          </select>
                        </textarea>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                      <input name="startDate" onChange={this.handleChange} value={this.state.startDate.substring(0, 10)} type="date" autoFocus/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                      <input name="endDate" onChange={this.handleChange} value={this.state.endDate.substring(0, 10)} type="date" autoFocus/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="type" onChange={this.handleChange} value={this.state.type} cols="30" rows="10" placeholder="Event Type" className="materialize-textarea"></textarea>
                      </div>
                    </div>

                    <button type="submit" className="btn light-blue darken-4">
                      Send 
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Site</th>
                    <th>Address</th>
                    <th>StartDate</th>
                    <th>EndDate</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  { 
                    this.state.events.map(event => {
                      return (
                        <tr key={event._id}>
                          <td>{event.name}</td>
                          <td>{event.category}</td>
                          <td>{event.site}</td>
                          <td>{event.address}</td>
                          <td>{event.startDate.substring(0, 10)}</td>
                          <td>{event.endDate.substring(0, 10)}</td>
                          <td>{event.type}</td>
                          <td>
                            <button onClick={() => this.deleteEvent(event._id)} className="btn light-blue darken-4">
                              <i className="material-icons">delete</i> 
                            </button>
                            <button onClick={() => this.editEvent(event._id)} className="btn light-blue darken-4" style={{margin: '4px'}}>
                              <i className="material-icons">edit</i>
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default App;
