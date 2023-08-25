import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUserInfo } from "../Store";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const userInfo = useSelector(selectUserInfo);
  return userInfo ? <>{children}</> : <Navigate to={"/signin"} />;
}
