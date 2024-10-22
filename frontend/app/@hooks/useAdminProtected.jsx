import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function AdminProtected({ children }) {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      const isAdmin = user.role === "admin";
      if (!isAdmin) {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [user, router]);

  return user && user.role === "admin" ? children : null;
}
