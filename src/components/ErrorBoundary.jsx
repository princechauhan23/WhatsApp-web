import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary component caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="people-container">
          <p>
            There is an error with this User. please refresh the site.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
