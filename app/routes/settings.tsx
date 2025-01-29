import { useEffect, useState } from "react";
import Nav from "~/components/Nav";
import { Box, Button, ClickableLogo, TextInput } from "~/components/ui-library";
import { useNavigate } from "react-router-dom";
import { auth } from "~/utils/firebase";
import {
  onAuthStateChanged,
  updateProfile,
  updatePassword,
  signOut,
} from "firebase/auth";

export default function Settings() {
  const [loginId, setLoginId] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (mounted) {
        if (user) {
          setLoginId(user.email || null);
          setUsername(user.displayName || "");
        } else if (!isLoggingOut) {
          navigate("/login");
        }
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [navigate, isLoggingOut]);

  const handleUpdateProfile = async () => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: username });
        setSuccess("Profile updated!");
      }
    } catch (error) {
      setError(
        (error as Error).message || "An error occurred updating profile"
      );
      console.error("Error updating profile:", error);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      if (auth.currentUser) {
        await updatePassword(auth.currentUser, newPassword);
        setSuccess("Password updated!");
      }
    } catch (error) {
      setError(
        (error as Error).message || "An error occurred while updating password"
      );
      console.error("Error updating password:", error);
    }
  };

  const handleLogOut = async () => {
    try {
      setIsLoggingOut(true);
      await signOut(auth);
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 500); 
    } catch (error) {
      setError((error as Error).message || "An error occurred");
      console.error("Error logging out:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <ClickableLogo />
        <Nav />
      </div>
      <div className="flex justify-center w-full">
        <Box className="p-4 w-1/2">
          <h1 className="mb-8 text-center">User settings</h1>
          <p>email: {loginId}</p>
          <div className="my-8">
            <h4>Update Username</h4>
            <TextInput
              className="mt-4"
              type="text"
              placeholder="New username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button onClick={handleUpdateProfile} className="mt-4">
              Update Username
            </Button>
          </div>
          <div className="my-4">
            <h4>Update Password</h4>
            <TextInput
              className="mt-4"
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button onClick={handleUpdatePassword} className="mt-4">
              Update Password
            </Button>
          </div>
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
              role="alert"
            >
              <p className="font-bold">{error}</p>
            </div>
          )}
          {success && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4"
              role="alert"
            >
              <p className="font-bold">{success}</p>
            </div>
          )}
          <Button onClick={handleLogOut}>Log out</Button>
        </Box>
      </div>
    </div>
  );
}
