import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const ProtectedRoute = <T extends {}>(
  Component: React.ComponentType<T>
): React.FC<T> => {
  const WrapperComponent: React.FC<T> = (props) => {
    const user = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push("/login");
      }
    }, [user, router]);

    if (!user) {
      return null;
    }

    return <Component {...props} />;
  };

  WrapperComponent.displayName = `Protected(${Component.displayName || Component.name || "Component"})`;

  return WrapperComponent;
};

export default ProtectedRoute;