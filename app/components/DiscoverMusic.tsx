import React, { useState, useCallback } from "react";
import Select from "react-select";
import Anthropic from "@anthropic-ai/sdk";
import optionsJSON from "../utils/options.json";
import { Box, Button, LoadingSpinner, SongCard, TextInput } from "./ui-library";
import responseStructure from "../utils/responseStructure.json";

interface Message {
  isUser: boolean;
  text: string;
}

interface MessageParam {
  role: "user" | "assistant";
  content: string;
}

const mapOptions = (options: string[]) =>
  options.map((option) => ({
    value: option.toLowerCase(),
    label: option,
  }));

const sGenreOptions = mapOptions(optionsJSON.Simple.Genre);
const sThemeOptions = mapOptions(optionsJSON.Simple.Theme);
const sTempoOptions = mapOptions(optionsJSON.Simple.Tempo);

const aGenreOptions = mapOptions(optionsJSON.Advanced.Genre);
const aThemeOptions = mapOptions(optionsJSON.Advanced.Theme);
const aTempoOptions = mapOptions(optionsJSON.Advanced.Tempo);

const selectStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "#F8C630",
    border: "none",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      border: "1px solid #724E91",
      scale: "1.1",
    },
    "&:focus": {
      backgroundColor: "#ed8936"
    },
    boxShadow: "4px solid #E54F6D",
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "#451F55",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#F8C630"
      : state.isFocused
      ? "#E54F6D"
      : "white",
    color: state.isSelected ? "white" : "black",
    "&:hover": {
      backgroundColor: "#E54F6D",
      color: "white",
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#451F55",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#0F0326",
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: "#0F0326",
  }),
};

const DiscoverMusic = () => {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedTempo, setSelectedTempo] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("No additional information");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [advanced, setAdvanced] = useState(false);
  const [songs, setSongs] = useState<any>(null);

  const ClaudeInstruction =
    "You are a music bot on a mission to help users discover new music (both niche and popular music). You provide music based on the user's inputted genre, theme, and tempo along with a custom message. " +
    "You must respond with the song title, artist name, album name, release year, and genre (up to 2 genres) based on the song/album description. " +
    "Ensure that the album cover URL is sourced directly from a reliable API such as last.fm, Discogs, or Spotify's public API. " +
    "For links, prioritize official Spotify URLs by searching the track or album on Spotify's web interface and using the full shareable link. " +
    "If you cannot find a valid Spotify link, fallback to a working YouTube link instead. Always ensure the provided links work properly for Norwegian users by testing the URLs. " +
    "If no relevant song is found, respond with a message indicating that no suitable match could be found." +
    "Respond ONLY in the following JSON format: " +
    JSON.stringify(responseStructure) +
    ". Song genre: " +
    selectedGenre +
    ", song theme: " +
    selectedTheme +
    ", song tempo: " +
    selectedTempo +
    ".";

  const getSpotifyAccessToken = async () => {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(
          `${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${
            import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
          }`
        )}`,
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Spotify access token");
    }

    const data = await response.json();
    return data.access_token;
  };

  const anthropic = useCallback(() => {
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error("Missing Anthropic API key");
    }
    return new Anthropic({
      apiKey,
      dangerouslyAllowBrowser: true,
    });
  }, []);

  const fetchSpotifyLink = async (trackName: string, artist: string) => {
    const accessToken = await getSpotifyAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=artist:${artist} track:${trackName}&type=track&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Spotify link");
    }

    const data = await response.json();
    return data.tracks.items[0]?.external_urls.spotify || "";
  };

  const fetchAlbumCover = async (artistName: string, albumName: string) => {
    try {
      const response = await fetch(
        `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${
          import.meta.env.VITE_LASTFM_API_KEY
        }&artist=${artistName}&album=${albumName}&format=json`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch album cover");
      }

      const data = await response.json();
      return data.album?.image[3]["#text"] || "public/album_placeholder.png";
    } catch {
      return "public/album_placeholder.png";
    }
  };

  const sendMessageToClaude = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const messageHistory: MessageParam[] = [
        {
          role: "assistant",
          content: ClaudeInstruction,
        },
        ...messages.map((msg) => ({
          role: msg.isUser ? "user" : ("assistant" as "user" | "assistant"),
          content: msg.text,
        })),
        {
          role: "user",
          content: inputText,
        },
      ];

      const response = await anthropic().messages.create({
        model: "claude-3-sonnet-20240229",
        max_tokens: 1024,
        messages: messageHistory,
      });

      const responseText =
        response?.content?.[0]?.type === "text" && response?.content?.[0]?.text
          ? response.content[0].text
          : "No response from Claude";

      const parsedResponse = JSON.parse(responseText);

      for (const key in parsedResponse) {
        const song = parsedResponse[key];
        song.link.spotify = await fetchSpotifyLink(song.title, song.artist);
        song.albumcover = await fetchAlbumCover(song.artist, song.album);
      }

      setMessages((prev) => [
        ...prev,
        { isUser: true, text: inputText },
        { isUser: false, text: responseText },
      ]);

      setSongs(parsedResponse);
      setInputText("No additional information");
    } catch (err: unknown) {
      setError(
        (err as Error).message || "An error occurred while sending the message"
      );
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="p-4 w-2/3">
      <form
        className="w-full flex flex-col items-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="font-bold mb-4 text-saffron drop-shadow-textShadow2 !shadow-blush">
          Discover new music!
        </h1>

        <div className="flex flex-col justify-center mt-8 ">
          <div className="flex justify-center">
            <input
              type="checkbox"
              id="toggle"
              onChange={(e) => setAdvanced(e.target.checked)}
              className="mr-2 accent-saffron"
            />
            <h6>Advanced options?</h6>
          </div>
          <div className="flex items-center space-x-4 mb-4 mt-8">
            <h6>Genre</h6>
            <Select
              options={advanced ? aGenreOptions : sGenreOptions}
              styles={selectStyles}
              onChange={(option) => setSelectedGenre(option?.value || null)}
              required
            />
            <h6>Theme</h6>
            <Select
              options={advanced ? aThemeOptions : sThemeOptions}
              styles={selectStyles}
              onChange={(option) => setSelectedTheme(option?.value || null)}
              required
            />
            <h6>Temp</h6>
            <Select
              options={advanced ? aTempoOptions : sTempoOptions}
              styles={selectStyles}
              onChange={(option) => setSelectedTempo(option?.value || null)}
              required
            />
          </div>
        </div>

        <div className="flex flex-col items-center w-full">
          <TextInput
            className="w-96"
            placeholder="Anything you want to specify? (Optional)"
            value={inputText === "No additional information" ? "" : inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={loading}
          />
          <Button
            onClick={sendMessageToClaude}
            disabled={loading}
            type="submit"
            className="disabled:bg-blush disabled:!shadow-ultraViolet disabled:cursor-not-allowed"
          >
            {loading ? "Retreiving songs..." : "Get recommendations"}
          </Button>
        </div>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
            role="alert"
          >
            <strong className="font-bold">Error:</strong> {error}
          </div>
        )}

        <div className="flex flex-wrap justify-center space-x-4 mt-4">
          {loading ? (
            <div>
              <LoadingSpinner />
              <h1 className="sr-only">Loading songs</h1>
            </div>
          ) : (
            songs &&
            Object.values(songs).map((song: any, index: number) => (
              <SongCard key={index} song={song} />
            ))
          )}
        </div>
      </form>
    </Box>
  );
};

export default DiscoverMusic;
