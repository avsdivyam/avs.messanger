import axios from "axios";

const login = async () => {
  try{
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await axios.post("/api/auth/login", {
      email: "test@example.com",
      password: "password",
    },
{
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
        },
});
    // Simulate a successful login by resolving the promise after 1 second.
    return "Login successful";
  } catch (error){
    throw error;
  }
}

const logout = async () => {
    try{
        // Simulate a logout process with a delay.
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return "Logout successful";
    } catch (error) {
        throw error;
    }
}

const register = async () => {
  try{
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return "Registration successful";
  } catch(error){
    throw error;
  }
}

export const AuthService = {
  login,
  logout,
  register,
};