import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import './App.css'

const BgColors = ['yellow', 'green', 'light-green', 'orange', 'red']

class App extends Component {
  state = {
    websiteName: '',
    userName: '',
    password: '',
    passwordList: [],
    showPassword: false,
    searchInput: '',
  }

  addPassword = event => {
    event.preventDefault()
    const {websiteName, userName, password} = this.state
    this.setState(prevState => ({
      passwordList: [
        ...prevState.passwordList,
        {id: uuidv4(), websiteName, userName, password},
      ],
      websiteName: '',
      userName: '',
      password: '',
    }))
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeWebsiteName = event => {
    this.setState({websiteName: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  toggleShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onDeletePassword = id => {
    this.setState(prevState => ({
      passwordList: prevState.passwordList.filter(each => each.id !== id),
    }))
  }

  renderPasswords = passwordDetails => {
    const {showPassword} = this.state
    const {websiteName, userName, password, id} = passwordDetails
    const randomBg = BgColors[Math.floor(Math.random() * BgColors.length)]

    const deletePassword = () => {
      this.onDeletePassword(id)
    }

    return (
      <li key={id} className="list-item">
        <p className={`first-latter-container ${randomBg}`}>
          {websiteName.charAt(0).toUpperCase()}
        </p>
        <div className="text-container">
          <p className="website-name">{websiteName}</p>
          <p className="user-name">{userName}</p>
          {showPassword ? (
            <p className="user-name">{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="star-img"
            />
          )}
        </div>
        <button
          type="button"
          className="delete-btn"
          onClick={deletePassword}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </li>
    )
  }

  renderNoPasswordView = () => (
    <div className="no-password-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-password-image"
      />
      <p className="no-password-p">No Passwords</p>
    </div>
  )

  renderPasswordListView = () => {
    const {passwordList, searchInput} = this.state
    const filteredList = passwordList.filter(each =>
      each.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="bg-password-List">
        <div className="password-search-container">
          <div className="count-container">
            <h1 className="title-h1">Your Passwords </h1>
            <p className="password-count">{passwordList.length}</p>
          </div>
          <div className="input-container bottom-mgn">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              alt="search"
              className="img"
            />
            <input
              type="search"
              placeholder="Enter Website"
              value={searchInput}
              className="input"
              onChange={this.onChangeSearchInput}
            />
          </div>
        </div>
        <hr className="hr-line" />
        <div className="checkbox-container">
          <input
            type="checkbox"
            className="checkbox-input"
            onChange={this.toggleShowPassword}
            id="showPassword"
          />
          <label htmlFor="showPassword" className="label">
            Show passwords
          </label>
        </div>
        {filteredList.length === 0 ? (
          this.renderNoPasswordView()
        ) : (
          <ul className="list">
            {filteredList.map(each => this.renderPasswords(each))}
          </ul>
        )}
      </div>
    )
  }

  render() {
    const {websiteName, userName, password} = this.state
    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo"
        />
        <div className="create-password-div">
          <div className="form-text-div">
            <h1 className="form-h1">Add New Password</h1>
            <form className="form" onSubmit={this.addPassword}>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="img"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="input"
                  value={websiteName}
                  onChange={this.onChangeWebsiteName}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="img"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="input"
                  value={userName}
                  onChange={this.onChangeUserName}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="img"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="input"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
          </div>
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="create-password-img"
            />
          </div>
        </div>
        {this.renderPasswordListView()}
      </div>
    )
  }
}

export default App
