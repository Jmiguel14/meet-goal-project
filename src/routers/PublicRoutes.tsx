import React from 'react'
import { Route, RouteProps } from 'react-router-dom'

export type PublicRouteProps = {
    component: React.ElementType
  } & RouteProps;

export const PublicRoutes: React.FC<PublicRouteProps> = ({component: Component, ...rest}) => {
    const render = (props: any) => {
        return (
            <Component {...props}/>
        )
    }
    return (
        <>
            <Route {...rest} render={render}/>
        </>
    )
}
