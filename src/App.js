import { useCallback, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// pages
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";

const App = () => {
  const [signUp, setSignUp] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  const redirectToSignIn = useCallback(() => setSignUp(false), []);

  const redirectToSignUp = useCallback(() => {
    setSignUp(true);
  }, []);

  const setUser = useCallback((user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setLoggedInUser(user);
  }, []);

  const onSignOut = useCallback(() => {
    localStorage.removeItem("user");
    setLoggedInUser(null);
  }, []);



  if (loggedInUser) {
    return <Home onSignOut={onSignOut} userName={loggedInUser?.userName} />;
  }

  if (signUp) {
    return <SignUp onSignUp={redirectToSignIn} redirectToSignIn={redirectToSignIn} />;
  }

  return <SignIn onSignIn={setUser} redirectToSignUp={redirectToSignUp} />;
};

export default App;
