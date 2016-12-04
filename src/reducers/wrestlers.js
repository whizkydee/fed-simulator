import defaultState from "./wrestlers.default"

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case "MOVE_WRESTLER":
      newState.forEach((wrestler, key) => {
        if (Number(wrestler.id) === Number(action.wrestlerId)) {
          newState[key].brand = action.brand.name
        }
      })
      break
      case "AWARD_MATCH_POINTS":
        let loserIds = Object.keys(action.losers).map(f => action.losers[f].id)

        newState.forEach((wrestler, key) => {
          if (loserIds.includes(wrestler.id)) {
            newState[key].losses = newState[key].losses + 1
          } else if (wrestler.id === action.winner.id) {
            newState[key].wins = newState[key].wins + 1
          }
        })
        break
      case "MOVE_All_WRESTLERS_TO_DEFAULT":
        newState.forEach((drop, key) => {
          newState[key].brand = "default"
        })
        break
      default:
        break
  }
  return newState
}
