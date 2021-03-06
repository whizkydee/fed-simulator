import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import groupBy from "lodash.groupby"

import { getId } from "../../models/model.helper"
import * as matchesAction from "../../actions/matches"
import Teams from "./teams"

class MatchContainer extends Component {
  render() {
    const { onAddWrestler, onSelectWinner, onRemoveWrestler, } = this
    const { currentMatch, } = this.props

    if (!currentMatch || !currentMatch.id) {
      return null
    } else {
      return (
        <div className="match">
          <Teams
            onDrop={onAddWrestler}
            onAddWrestler={onAddWrestler}
            onSelectWinner={onSelectWinner}
            onRemoveWrestler={onRemoveWrestler}
            teams={this.getTeams(currentMatch.wrestlers)}
          />
        </div>
      )
    }
  }

  getTeams(wrestlers, teams = {}) {
    if (wrestlers.length > 0) {
      wrestlers = wrestlers.map(wrestler => {
        return Object.assign({}, wrestler, this.props.roster.find(item => item.id === wrestler.id))
      })
      teams = groupBy(wrestlers, "teamId")
    } else {
      teams = { [getId()]: [] }
    }
    return Object.assign({}, teams, { [getId()]: [] })
  }

  onAddWrestler = (teamId, wrestler) => {
    const wrestlerId = wrestler.wrestler
    const { roster, dispatch, currentMatch: { id: matchId } } = this.props

    wrestler = Object.assign({}, roster.find(wrestler => wrestler.id === wrestlerId), { teamId })

    dispatch(
      matchesAction.addWrestlerToMatch({
        matchId,
        wrestler,
      })
    )
  }

  onSelectWinner = wrestlerId => {
    const { dispatch, currentMatch: { id: matchId } } = this.props

    dispatch(
      matchesAction.selectWinnerOfMatch({
        matchId,
        wrestlerId,
      })
    )
  }

  onRemoveWrestler = wrestlerId => {
    const { dispatch, currentMatch: { id: matchId } } = this.props

    dispatch(
      matchesAction.removeWrestlerFromMatch({
        matchId,
        wrestlerId,
      })
    )
  }
}

MatchContainer.propTypes = {
  currentMatch: PropTypes.object,
  dispatch: PropTypes.func,
  matches: PropTypes.array.isRequired,
  roster: PropTypes.array.isRequired,
  simulateMatch: PropTypes.func,
}

MatchContainer.displayName = "MatchContainer"

export default connect(state => ({
  matches: state.federation.matches,
  roster: state.federation.roster,
}))(MatchContainer)
