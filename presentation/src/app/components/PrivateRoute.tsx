import { useAppSelector } from 'app/store/storeConfig';
import { ComponentType } from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router';
import { toast } from 'react-toastify';

interface Props extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}

export default function AuthRoute({ component: Component, ...rest }: Props) {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        user?.token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
