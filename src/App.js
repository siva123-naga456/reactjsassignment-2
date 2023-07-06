import {Component} from 'react'
import {v4} from 'uuid'

import './App.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    isShow: false,
    list: [],
    websiteInput: '',
    userInput: '',
    passwordInput: '',
    isTrue: false,
  }

  websiteChange = event => {
    this.setState({websiteInput: event.target.value})
  }

  userNameChange = event => {
    this.setState({userInput: event.target.value})
  }

  passwordChange = event => {
    this.setState({passwordInput: event.target.value})
  }

  AddDetails = event => {
    event.preventDefault()
    const {websiteInput, userInput, passwordInput} = this.state
    const initial = websiteInput.slice(0, 1).toUpperCase()
    const color = colorList[Math.floor(Math.random() * colorList.length)]

    const newList = {
      id: v4(),
      initialValue: initial,
      website: websiteInput,
      userName: userInput,
      password: passwordInput,
      colorAdd: color,
    }

    this.setState(prevState => ({
      list: [...prevState.list, newList],
      websiteInput: '',
      userInput: '',
      passwordInput: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  searchList = event => {
    this.setState({searchInput: event.target.value})
  }

  DeleteItem = id => {
    const {list} = this.state
    const modifyList = list.filter(each => each.id !== id)
    const listLength = modifyList.length !== 0
    this.setState({list: modifyList, isTrue: listLength})
  }

  render() {
    const {
      websiteInput,
      userInput,
      passwordInput,
      list,
      searchInput,
      isShow,
    } = this.state
    let {isTrue} = this.state
    const newLists = list.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newLists.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="main-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo"
        />
        <div className="sub-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="pass-manager-image"
          />
          <form className="login-container" onSubmit={this.AddDetails}>
            <h1 className="heading">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="website-logo"
              />
              <input
                type="text"
                className="website-input"
                value={websiteInput}
                placeholder="Enter Website"
                onChange={this.websiteChange}
              />
            </div>

            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="website-logo"
              />
              <input
                type="text"
                value={userInput}
                placeholder="Enter Username"
                className="website-input"
                onChange={this.userNameChange}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="website-logo"
              />
              <input
                type="password"
                value={passwordInput}
                placeholder="Enter Password"
                className="website-input"
                onChange={this.passwordChange}
              />
            </div>
            <div className="btn-container">
              <button type="submit" className="add-btn">
                Add
              </button>
            </div>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-large-image"
          />
        </div>
        <div className="sub2-container">
          <div className="sub1-container">
            <div className="passwordCount-container">
              <h1>Your Passwords</h1>
              <p className="password-count">{newLists.length}</p>
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="website-logo"
              />
              <input
                type="search"
                className="website-input"
                onChange={this.searchList}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="show-password-container">
            <input type="checkbox" id="check" onChange={this.showPassword} />
            <label htmlFor="check" className="show-password">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="result-image-container">
              <img
                className="result-image"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p>No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="unorder-container">
              {newLists.map(each => (
                <li id={each.id} key={each.id} className="list-container">
                  <div className="list1-container">
                    <p className={`initial ${each.colorAdd}`}>
                      {each.initialValue}
                    </p>
                    <div className="web-container">
                      <p className="result-heading">{each.website}</p>
                      <p className="result-para">{each.userName}</p>
                      {!isShow && (
                        <img
                          className="star-icon"
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          alt="stars"
                        />
                      )}
                      {isShow && (
                        <p className="result-password">{each.password}</p>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    data-testid="delete"
                    className="delete-btn"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="delete-img"
                      onClick={() => this.DeleteItem(each.id)}
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
