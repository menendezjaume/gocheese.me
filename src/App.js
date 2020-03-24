import React from "react";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import { LinkContainer } from "react-router-bootstrap";
import { MemoryRouter, Switch, Route } from "react-router-dom";
import { osName } from "react-device-detect";

import "./App.css";

import logo from "./cheese.webp";

function Tip(props) {
  if (props.osName == "Windows") {
    return <p>For {props.osName}, press <b>Win + L</b></p>;
  } else if (props.osName == "Chromium OS") {
    return <p>For {props.osName}, press <b>Search + L</b></p>;
  } else if (props.osName == "Mac OS") {
    return <p>For {props.osName}, press <b>Command + Control + Q</b><br/>For older versions of the operating system, press <b>Control + Shift + Power button</b> (or <b>Control + Shift + Eject</b>)</p>;
  } else if (props.osName == "iOS" || props.osName == "Android") {
    return <p>For {props.osName}, press the <b>Sleep/Wake button</b>.<br/>In fact, you don’t need to do anything to lock the {props.osName}; it happens automatically, if you don’t touch the screen for one minute (but make sure no one is around for that minute!).</p>;
  } 
  return <p>If you don't know how to lock your {props.osName}, search <a href={"https://www.google.com/search?q=how+to+lock+" + props.osName}>how to lock {props.osName}</a> on Google.</p>;
}

function Cheesed(props) {
  return (
    <Jumbotron className="cover-container my-auto mx-auto text-left">
      <LinkContainer to="/">
        <Button
          className="close btn btn-secondary"
          aria-label="Close"
          onClick={props.handler}
        >
          <span aria-hidden="true">&times;</span>
        </Button>
      </LinkContainer>
      {/* <Image src="cheese.webp" /> */}
      <h1 className="cover-heading">Next time, don't forget to lock your machine!</h1>
      <p className="lead">
        You've been cheesed! Next time, don't forget to lock your machine.
        <hr class="my-4" />
        <Tip osName={osName} />
      </p>
    </Jumbotron>
  );
}

function Main(props) {
  return (
    <Jumbotron className="cover-container my-auto mx-auto">
      <Image src={logo} />
      <h1 className="cover-heading">Cheese me!</h1>
      <p className="lead">
        In order to increase Security Awareness, you are about to cheese someone.
        Once you press the button below, remember to lock their machine!
      </p>
      <LinkContainer to="/cheesed">
        <Button
          variant="primary"
          size="lg"
          className="btn btn-lg btn-secondary"
          block
          onClick={props.handler}
        >
          Cheese me!
        </Button>
      </LinkContainer>
    </Jumbotron>
  );
}

const Footer = () => (
  <footer className="fixed-bottom">
    <div className="inner">
      Site created by{" "}
      <a href="https://menendezjaume.com" title="Micky Menendez">
        @menendezjaume
      </a>
      . Icon made by{" "}
      <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
        Freepik
      </a>
    </div>
  </footer>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    const gifs = [
      `url("https://i.giphy.com/media/ASzK5wWjMtc6A/giphy.gif")`,
      `url("https://i.giphy.com/media/88iYsvbegSUn9bSTF8/giphy.gif")`,
      `url("https://i.giphy.com/media/1qB3EwE3c54A/giphy.gif")`,
      `url("https://i.giphy.com/media/ZUomWFktUWpFu/giphy.gif")`,
      `url("https://i.giphy.com/media/cYejmY7tuJ4HTmBYHP/giphy.gif")`,
      `url("https://i.giphy.com/media/mXwxPJjb1SzlhwMHfd/giphy.gif")`,
      `url("https://i.giphy.com/media/iE3lvCgDR29h10Gh5B/giphy.gif")`,
    ]
    const rand = Math.round(Math.random() * gifs.length);
    this.state = {
      gif: gifs[rand],
      show: false
    };

    this.handler = this.handler.bind(this);
  }

  handler() {
    this.setState(prevState => ({
      show: !prevState.show
    }));
  }

  render() {
    return (
      <Container
        className="bg text-center"
        style={{ backgroundImage: this.state.show ? this.state.gif : null }}
      >
        {/* <h2>It is {this.state.gif}.</h2> */}

        <MemoryRouter>
          <Switch>
            <Route path="/cheesed">
              <Cheesed handler={this.handler} />
            </Route>
            <Route path="/">
              <Main handler={this.handler} />
            </Route>
          </Switch>
        </MemoryRouter>
        <Footer />
      </Container>
    );
  }
}

export default App;
