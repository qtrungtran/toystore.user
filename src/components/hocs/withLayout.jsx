import React from 'react'
import Layout from 'components/layout'

export default function withLayout(Component) {
  return function LayoutWrapper(props) {
    return <Layout {...props} Content={Component} />
  }
}
