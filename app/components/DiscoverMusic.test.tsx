import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DiscoverMusic from "~/components/DiscoverMusic";
import selectEvent from "react-select-event";

jest.mock("@anthropic-ai/sdk", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    messages: {
      create: jest.fn().mockResolvedValue({
        content: [
          {
            type: "text",
            text: JSON.stringify({
              1: {
                title: "Mock Song",
                artist: "Mock Artist",
                album: "Mock Album",
                released: "2023",
                genre: "Mock Genre",
                albumcover: "mock-cover-url",
                link: {
                  spotify: "mock-spotify-link",
                  youtube: "mock-youtube-link",
                },
              },
            }),
          },
        ],
      }),
    },
  })),
}));

jest.mock("aws-amplify/auth", () => ({
  getCurrentUser: jest.fn().mockResolvedValue({
    signInDetails: {
      loginId: "mockLoginId",
    },
  }),
  fetchAuthSession: jest.fn().mockResolvedValue({
    tokens: {
      idToken: "mockToken",
    },
  }),
}));

globalThis.import.meta = {
  env: {
    VITE_SPOTIFY_CLIENT_ID: "mockSpotifyClientId",
    VITE_SPOTIFY_CLIENT_SECRET: "mockSpotifyClientSecret",
    VITE_ANTHROPIC_API_KEY: "mockAnthropicApiKey",
    VITE_LASTFM_API_KEY: "mockLastFmApiKey",
  },
};

describe("DiscoverMusic", () => {
  it("renders correctly", () => {
    render(<DiscoverMusic />);
    expect(screen.getByText("Discover new music!")).toBeInTheDocument();
  });

  it("handles genre selection", async () => {
    render(<DiscoverMusic />);
    const genreSelect = screen.getByLabelText("Genre");
    await selectEvent.select(genreSelect, "rock");
    expect(screen.getByText("rock")).toBeInTheDocument();
  });

  it("displays error message when no genre, theme, or tempo is selected", () => {
    render(<DiscoverMusic />);
    fireEvent.click(screen.getByText("Get recommendations"));
    expect(
      screen.getByText(
        "Please select genre, theme and tempo to get recommendations."
      )
    ).toBeInTheDocument();
  });

  it("fetches and displays song recommendations", async () => {
    render(<DiscoverMusic />);
    await selectEvent.select(screen.getByLabelText("Genre"), "rock");
    await selectEvent.select(screen.getByLabelText("Theme"), "happy");
    await selectEvent.select(screen.getByLabelText("Tempo"), "fast");
    fireEvent.click(screen.getByText("Get recommendations"));

    expect(await screen.findByText("Mock Song")).toBeInTheDocument();
  });
});
