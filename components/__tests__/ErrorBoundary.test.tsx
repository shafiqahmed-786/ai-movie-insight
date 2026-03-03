import { render, screen } from "@testing-library/react";
import ErrorBoundary from "../ErrorBoundary";

const ProblemChild = () => {
  throw new Error("Error!");
};

test("renders fallback UI on error", () => {
  const spy = jest.spyOn(console, "error").mockImplementation(() => {});

  render(
    <ErrorBoundary>
      <ProblemChild />
    </ErrorBoundary>
  );

  expect(screen.getByText("Something went wrong.")).toBeInTheDocument();

  spy.mockRestore();
});