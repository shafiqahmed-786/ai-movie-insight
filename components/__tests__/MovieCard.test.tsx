import { render, screen } from "@testing-library/react";
import MovieCard from "../MovieCard";

const mockMovie = {
  title: "Test Movie",
  year: "2024",
  rating: "8.5",
  plot: "This is a test plot",
  cast: ["Actor 1"],
  poster: "test.jpg",
};

describe("MovieCard Component", () => {
  test("renders movie title", () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
  });

  test("renders movie year and rating", () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText(/2024/)).toBeInTheDocument();
    expect(screen.getByText(/8.5/)).toBeInTheDocument();
  });

  test("renders movie plot", () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText("This is a test plot")).toBeInTheDocument();
  });
});