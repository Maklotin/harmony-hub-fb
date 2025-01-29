import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "~/utils/firebase";
import Nav from "~/components/Nav";
import { ClickableLogo, Box, SongCard } from "~/components/ui-library";

export default function History() {
  const [history, setHistory] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!auth.currentUser) {
        setError("You must be logged in to view history.");
        return;
      }

      try {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const sortedHistory = (userData.history || []).sort(
            (a: any, b: any) => b.timestamp.toMillis() - a.timestamp.toMillis()
          );
          setHistory(sortedHistory);
        } else {
          setError("No history found.");
        }
      } catch (error) {
        setError(
          (error as Error).message || "An error occurred fetching history"
        );
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div>
      <div className="flex justify-between flex-wrap">
        <ClickableLogo />
        <Nav />
      </div>
      <div className="flex flex-col items-center">
        <h1>History</h1>
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
            role="alert"
          >
            <p className="font-bold">{error}</p>
          </div>
        )}
        {history.length > 0 ? (
          history.map((entry, index) => (
            <Box key={index} className="my-4 w-2/3">
              <h4>Genre: {entry.genre}</h4>
              <h4>Theme: {entry.theme}</h4>
              <h4>Tempo: {entry.tempo}</h4>
              <h4>Custom Prompt: {entry.customPrompt}</h4>
              <div className="flex flex-wrap justify-center space-x-4 mt-4">
                {Object.values(entry.songs).map(
                  (song: any, songIndex: number) => (
                    <SongCard key={songIndex} song={song} />
                  )
                )}
              </div>
            </Box>
          ))
        ) : (
          <p>No history found.</p>
        )}
      </div>
    </div>
  );
}
