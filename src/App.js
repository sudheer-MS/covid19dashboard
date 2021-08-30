import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import About from './components/About'
import NotFound from './components/NotFound'
import StateData from './components/StateData'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/state/:id" component={StateData} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
