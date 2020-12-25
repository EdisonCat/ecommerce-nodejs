import './App.css';
import Header from './components/header/header';
import Main from './components/main/Main';
import Footer from './components/footer/footer';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import NotFound from './components/notfound/NotFound';
import Switch from 'react-bootstrap/esm/Switch';

function App() {
  return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/home" component={Main} exact/>
          <Redirect from="/" to="/home" />
          <Route path="*" component={NotFound} exact/>
        </Switch>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
