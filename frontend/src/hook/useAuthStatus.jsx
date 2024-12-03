// src/hooks/useAuthStatus.js
import { useSelector } from "react-redux";

const useAuthStatus = () => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  return { user, loading, error };
};

export default useAuthStatus;
