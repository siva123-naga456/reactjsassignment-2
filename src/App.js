import {Component} from 'react'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      name: '',
      email: '',
      phone: '',
      plan: '',
      addons: [],
    }
  }

  nextStep = () => {
    this.setState(prevState => ({
      step: prevState.step + 1,
    }))
  }

  prevStep = () => {
    this.setState(prevState => ({
      step: prevState.step - 1,
    }))
  }

  handleChange = e => {
    const {name, value} = e.target
    this.setState({[name]: value})
  }

  handleAddonsChange = addon => {
    const {addons} = this.state
    if (addons.includes(addon)) {
      this.setState({addons: addons.filter(a => a !== addon)})
    } else {
      this.setState({addons: [...addons, addon]})
    }
  }

  renderStep() {
    const {step, name, email, phone, plan, addons} = this.state

    switch (step) {
      case 1:
        return (
          <div>
            <h2>Personal Details</h2>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
            <label>Email Address:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
            <label>Phone Number:</label>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={this.handleChange}
            />
            <button onClick={this.nextStep}>Next Step</button>
          </div>
        )
      case 2:
        return (
          <div>
            <button onClick={this.prevStep}>Go Back</button>
            <button onClick={this.nextStep}>Next Step</button>
          </div>
        )
      case 3:
        return (
          <div>
            <h2> Add-ons</h2>

            <button onClick={this.prevStep}>Go Back</button>
            <button onClick={this.nextStep}>Next Step</button>
          </div>
        )
      case 4:
        return (
          <div>
            <h2>Step 4 Summary</h2>

            <button onClick={this.prevStep}>Go Back</button>
            <button onClick={this.nextStep}>Confirm</button>
          </div>
        )
      case 5:
        return (
          <div>
            <h2>Personal info</h2>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
            <h2>Select plan</h2>
            <p>Plan: {plan}</p>
            <h2>Add-ons</h2>
            <ul>
              {addons.map(addon => (
                <li key={addon}>{addon}</li>
              ))}
            </ul>

            <button onClick={this.prevStep}>Go Back</button>
            <button onClick={this.confirm}>Confirm</button>
          </div>
        )
      default:
        return null
    }
  }

  confirm = () => {
    console.log('Data submitted:', this.state)
  }

  render() {
    return (
      <div>
        <h1>Multi-Step Form</h1>
        {this.renderStep()}
      </div>
    )
  }
}

export default App
