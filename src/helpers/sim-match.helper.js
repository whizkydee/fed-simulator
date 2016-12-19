import weighted from "weighted"
import _maxBy from "lodash.maxby"
import _minBy from "lodash.minby"
import { getPercentageAmount } from "./math"
const getWrestlersWeights = (arrayLength) => new Array(arrayLength).fill((1 / arrayLength))

export class SimMatch {

  state = []

  constructor(wrestlers, moves) {
    wrestlers.forEach((wrestler, wrestlerKey) => {
      wrestlers[wrestlerKey] = wrestler
    })
    this.wrestlers = wrestlers
    this.moves = moves
    this.movesWeights = moves.reduce((a, b) => a.concat(b.weight), [])
  }

  logAction = (action, details) => {
    this.state.push({
      action,
      details,
    })
  }

  ringBell() {
    let lowest = this.wrestlers.sort((a, b) => a.damage > b.damage)[0],
      highest = this.wrestlers.sort((a, b) => a.damage < b.damage)[0],
      lowestId = lowest.id,
      highestId = highest.id,
      lowestIndex = this.wrestlers.findIndex(wrestler => wrestler.id === lowestId),
      highestIndex = this.wrestlers.findIndex(wrestler => wrestler.id === highestId),
      attackersWeights = getWrestlersWeights(this.wrestlers.length),
      highestAttackersPercentageGain =  getPercentageAmount(attackersWeights[lowestIndex], 20)

      if (lowest.damage !== highest.damage) {
        attackersWeights[lowestIndex] = attackersWeights[lowestIndex] - highestAttackersPercentageGain
        attackersWeights[highestIndex] = attackersWeights[highestIndex] + highestAttackersPercentageGain
      }
      // console.log(highestAttackersPercentageGain, attackersWeights[lowestIndex], attackersWeights[highestIndex])
      // console.log("attackersWeightTotal", attackersWeights.reduce((sum, weight) => sum + weight), attackersWeights)

    // while the minimum damage done is stil above zero
    while(_minBy(this.wrestlers, "damage").damage > 0) {
      // console.log("count check", this.wrestlers.length, attackersWeights.length)
      let attacker = weighted.select(this.wrestlers, attackersWeights)
      this.finalAttacker = attacker
      let defendersWeights = attackersWeights.slice()
      defendersWeights = defendersWeights.filter((weight, key) => key !== highestIndex)

      let defenders = this.wrestlers.filter((wrestler) => wrestler.name !== attacker.name)
      // console.log("defendersWeights", defendersWeights)
      // console.log("count check", this.wrestlers, defenders.length, defendersWeights.length)
      let defender = weighted.select(defenders, defendersWeights),
      move =  weighted.select(this.moves, this.movesWeights)
      this.hitMove(attacker, defender, move)
    }
    // loop done, now lets log the end
    this.endMatch()
    // return the log
    return this.state
  }

  hitMove = (attacker, defender, move) => {
    this.wrestlers.forEach((wrestler, key) => {
      // wrestler we are looping is the defender
      if (defender.name === wrestler.name) {
        // damage the defender
        this.wrestlers[key].damage = wrestler.damage - move.damage
        this.logAction("move", {
          attacker,
          defender,
          move,
        })
      }
    })
  }

  endMatch = () => {
    let
      potentialWinners = [
        _maxBy(this.wrestlers, "damage"),
        this.finalAttacker
      ],
      winner = weighted.select(potentialWinners, [0.2, 0.8]),
      loser = _minBy(this.wrestlers, "damage"),
      losers = this.wrestlers.filter((wrestler) => wrestler.id !== winner.id)
    this.logAction("winner", {
      wrestlers: this.wrestlers,
      winner,
      loser,
      losers,
    })
  }
}
