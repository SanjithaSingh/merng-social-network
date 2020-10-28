import React from "react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MenuBar from "./components/MenuBar";
import { Container } from "semantic-ui-react";
import { AuthContextProvider } from "./context/AuthContext";
import AuthRoute from "./utils/AuthRoute";
import { setContext } from "apollo-link-context";
import PostDetail from "./pages/PostDetail";

const httpLink = createHttpLink({ uri: "http://localhost:5000" });

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <AuthContextProvider>
          <Router>
            <Container>
              <MenuBar />

              <Route exact path="/" component={Home} />
              <AuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/register" component={Register} />
              <Route exact path="/posts/:postId" component={PostDetail} />
            </Container>
          </Router>
        </AuthContextProvider>
      </ApolloProvider>
    </div>
  );
}

export default App;
