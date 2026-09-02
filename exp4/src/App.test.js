import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders calendar scheduler", () => {
  render(<App />);

  expect(
    screen.getByText("Social Media Post Scheduler")
  ).toBeInTheDocument();
});

test("renders initial posts", () => {
  render(<App />);

  expect(
    screen.getByText("Instagram: Instagram Campaign")
  ).toBeInTheDocument();

  expect(
    screen.getByText("LinkedIn: LinkedIn Update")
  ).toBeInTheDocument();
});

test("adds a new post", () => {
  render(<App />);

  const titleInput = screen.getByPlaceholderText("Post title");

  const dateInput = screen.getByDisplayValue("");

  fireEvent.change(titleInput, {
    target: {
      value: "Test Post"
    }
  });

  fireEvent.change(dateInput, {
    target: {
      value: "2026-09-15T10:00"
    }
  });

  fireEvent.click(
    screen.getByText("Schedule Post")
  );

  expect(
    screen.getByText("Instagram: Test Post")
  ).toBeInTheDocument();
});