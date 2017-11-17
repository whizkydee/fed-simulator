import React from "react"
import { List } from "immutable"
import PropTypes from "prop-types"

import Wrestlers from "../../components/wrestlers/container"
import { Winner, Loser } from "../../components/winner/winner"
import HeaderOne from "../../components/h1/h1"
import Match from "../../components/match/container"
import Button from "../../components/button/button"
import { Reset } from "../../components/icons"

import "./create-a-match.scss"

const NOOP = () => {}

const CreateAMatch = ({
  buttonText = "",
  currentMatch = {},
  loser = {},
  onReset = NOOP,
  onSimulateMatch = NOOP,
  onWrestlerClick = NOOP,
  style = {},
  winner = {},
}) => {
  const numberOfWrestlers = new List(currentMatch.wrestlers).size
  return (
    <section className="page create-a-match">
      <form onSubmit={onSimulateMatch}>
        <div className="row">
          <div className="col-xs-12">
            <div className="box">
              <HeaderOne>
                Create a match
                <span className="tools">
                  <Reset onClick={onReset} />
                </span>
              </HeaderOne>
              <Match currentMatch={currentMatch} />
              <If condition={numberOfWrestlers > 1}>
                <Button tabIndex="0" value={buttonText} onClick={onSimulateMatch} />
              </If>
            </div>
          </div>
          <If condition={winner.name && loser.name}>
            <div className="col-xs-12">
              <div className="box middle-xs center-xs">
                <br />
                <Winner {...winner} />
                <br />
                <Loser {...loser} />
              </div>
            </div>
          </If>
        </div>
        <br />
        <Wrestlers onClick={onWrestlerClick} style={style} />
      </form>
    </section>
  )
}

CreateAMatch.propTypes = {
  buttonText: PropTypes.string,
  currentMatch: PropTypes.object,
  loser: PropTypes.object,
  onReset: PropTypes.func,
  onSimulateMatch: PropTypes.func,
  onWrestlerClick: PropTypes.func,
  style: PropTypes.object,
  winner: PropTypes.object,
}

export default CreateAMatch