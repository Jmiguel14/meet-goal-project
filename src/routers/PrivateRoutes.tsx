import { RouteProps, Route, Redirect } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";

export type PrivateRouteProps = {
  component: React.ElementType
} & RouteProps;

export const PrivateRoutes: React.FC<PrivateRouteProps> = (props) => {
  const { component: Component , ...rest } = props;
  const { currentUser } = useAuth();
  const render = (props: any) => {
    return currentUser ? (
      <Component {...props} />
    ) : (
      <Redirect to={{pathname: "/home"}} />
    );
  };

  return (
    <>
        <Route {...rest} render={render}></Route>
    </>
  );
};
