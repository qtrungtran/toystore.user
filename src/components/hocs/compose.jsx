const compose = (...hocs) => Component => {
  return hocs.reduce((EnhancedComponent, hoc) => {
    return hoc(EnhancedComponent)
  }, Component)
}

export default compose
