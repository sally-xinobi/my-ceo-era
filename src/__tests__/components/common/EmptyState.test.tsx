import { render, screen } from "@testing-library/react";
import EmptyState from "@/components/EmptyState";

describe("EmptyState", () => {
  it("renders title", () => {
    render(<EmptyState title="No data" />);
    expect(screen.getByText("No data")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<EmptyState title="No data" description="Create your first item" />);
    expect(screen.getByText("Create your first item")).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    render(<EmptyState title="No data" />);
    const description = screen.queryByText("Some description");
    expect(description).not.toBeInTheDocument();
  });

  it("applies correct styling", () => {
    render(<EmptyState title="No data" description="Description" />);
    const title = screen.getByText("No data");
    const description = screen.getByText("Description");

    expect(title).toHaveClass("text-lg", "font-medium");
    expect(description).toHaveClass("text-sm", "text-gray-500");
  });
});
