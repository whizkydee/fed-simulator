import './stylesheets/ranking.scss'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import orderBy from 'lodash/orderBy'
import Ranking from '../components/ranking/ranking'

const COLUMNS = ['position', 'name', 'wins', 'losses',]

class RankingPage extends Component {
  displayName = 'RankingPage'

  componentDidMount() {
    if (this.props.shows.length === 0) {
      this.props.router.push('/shows')
    }
  }

  render() {
    const wrestlers = orderBy(this.props.roster, 'points', 'desc')
    const maleWrestlers = wrestlers.filter(wrestler => wrestler.male)
    const femaleWrestlers = wrestlers.filter(wrestler => !wrestler.male)
    return (
      <section className="page ranking">
        <h1>
          <span className="gold pop">🌟 Winners </span>
          <span>&nbsp; and &nbsp;</span>
          <span className="gray push"> 🗑 Losers</span>
        </h1>
        <div className="row top-xs">
          <div className="col-xs-12 col-lg-6">
            <div className="box grow">
              <If condition={maleWrestlers.length > 0}>
                <Ranking
                  title="Male Wrestlers"
                  rows={maleWrestlers}
                  columns={COLUMNS}
                />
              </If>
            </div>
          </div>
          <div className="col-xs-12 col-lg-6">
            <div className="box grow">
              <If condition={femaleWrestlers.length > 0}>
                <Ranking
                  title="Female Wrestlers"
                  rows={femaleWrestlers}
                  columns={COLUMNS}
                />
              </If>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

RankingPage.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(state => ({
  roster: state.roster,
  shows: state.shows,
}))(RankingPage)

{
  /* <div className="col-xs-12 col-lg-6">
  <div className="box">
    <RankingCollection
      title={'Male Wrestlers'}
      wrestlers={maleWrestlers}
    />
  </div>
</div> */
}
