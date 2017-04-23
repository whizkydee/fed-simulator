import './stylesheets/roster.scss'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import maleImg from '../assets/male.png'
import femaleImg from '../assets/female.png'

class RosterPage extends Component {
  displayName = 'RosterPage'

  render() {
    return (
      <section className="page roster">
        <h1>
          Whos on the books?
        </h1>
        <div className="row top-xs">
          <div className="col-xs-12 col-lg-6">
            <div className="box">
              <img className="icon" src={maleImg} />
              <br />
            </div>
          </div>
          <div className="col-xs-12 col-lg-6">
            <div className="box">
              <img className="icon" src={femaleImg} />
              <br />
            </div>
          </div>
        </div>
        <div>
          <button type="submit">
            Update the books and open the calendar
          </button>
        </div>
      </section>
    )
  }
}

RosterPage.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(state => ({
  federation: state.federation,
}))(RosterPage)

// Gender icons by Icon Geek; https://thenounproject.com/icongeek/collection/gender/?oq=gender&cidx=0&i=801870
