import React from "react";

class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false
    };
  }

  // Errors aus den children erhalten
  static getDerivedStateFromError(error) {
    // process the error
    // return Object, that sets the state
    return { hasErrored: true };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    if (this.state.hasErrored) {
      return <div> Something went wrong </div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;