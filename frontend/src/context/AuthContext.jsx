import React, {
  createContext,
  useEffect,
  useState,
} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // RESTORE USER AFTER PAGE REFRESH
  // =====================================================
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("userInfo");

      if (!storedUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      const parsedUser = JSON.parse(storedUser);

      if (
        parsedUser &&
        parsedUser.token &&
        parsedUser._id
      ) {
        setUser(parsedUser);
      } else {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      }
    } catch (error) {
      console.error(
        "Error restoring authentication:",
        error
      );

      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // =====================================================
  // LOGIN
  // =====================================================
  const login = (userData) => {
    if (!userData) {
      console.error("No login data received");
      return;
    }

    console.log("LOGIN RESPONSE:", userData);

    // ---------------------------------------------------
    // Handle both response formats:
    //
    // Format 1:
    // {
    //   _id,
    //   name,
    //   email,
    //   role,
    //   token
    // }
    //
    // Format 2:
    // {
    //   user: {...},
    //   token
    // }
    // ---------------------------------------------------

    const userDetails = userData.user
      ? userData.user
      : userData;

    let token =
      userData.token ||
      userDetails.token;

    // ---------------------------------------------------
    // Remove "Bearer " if it exists
    // ---------------------------------------------------
    if (
      typeof token === "string" &&
      token.startsWith("Bearer ")
    ) {
      token = token.substring(7);
    }

    if (!token) {
      console.error(
        "Login successful but JWT token is missing"
      );

      return;
    }

    // ---------------------------------------------------
    // Create final user object
    // ---------------------------------------------------
    const loggedInUser = {
      _id: userDetails._id,
      name: userDetails.name,
      email: userDetails.email,
      role: userDetails.role,
      token: token,
    };

    console.log(
      "LOGIN USER:",
      loggedInUser
    );

    console.log(
      "LOGIN ROLE:",
      loggedInUser.role
    );

    console.log(
      "LOGIN TOKEN:",
      loggedInUser.token
    );

    // ---------------------------------------------------
    // Update React state
    // ---------------------------------------------------
    setUser(loggedInUser);

    // ---------------------------------------------------
    // Store ONLY one main auth object
    // ---------------------------------------------------
    localStorage.setItem(
      "userInfo",
      JSON.stringify(loggedInUser)
    );

    // ---------------------------------------------------
    // Keep token separately for API requests
    // ---------------------------------------------------
    localStorage.setItem(
      "token",
      token
    );

    // ---------------------------------------------------
    // Optional compatibility storage
    // ---------------------------------------------------
    localStorage.setItem(
      "user",
      JSON.stringify({
        _id: loggedInUser._id,
        name: loggedInUser.name,
        email: loggedInUser.email,
        role: loggedInUser.role,
      })
    );
  };

  // =====================================================
  // LOGOUT
  // =====================================================
  const logout = () => {
    setUser(null);

    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};