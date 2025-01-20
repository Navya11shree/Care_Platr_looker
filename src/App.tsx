// App.tsx 
import React, { useState } from 'react';
import { ExtensionProvider } from '@looker/extension-sdk-react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopNavBar from './components/TopNavBar';
import './tailwind.css';
import LookerEmbed from './components/LookerEmbed';
import LoginPage from './components/LoginPage';
import ExploreComponent from './components/ExploreComponent';
import GridComponent from './components/GridComponent';
import UserComponent from './components/UserComponent';
import DocumentsComponent from './components/DocumentsComponent';
import APIComponent from './components/APIComponent';
import LookerAPIComponent from './components/LookerAPIComponent';
import LookerConvo from './components/LookerConvo';

const App = hot(() => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <ExtensionProvider>
      <Router>
        {isAuthenticated ? (
          <div style={{ height: '100vh', width: '100vw', display: 'flex', overflow: 'hidden' }}>
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              {/* Top Navigation Bar */}
              <TopNavBar setIsAuthenticated={setIsAuthenticated} />

              {/* Content Area */}
              <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                <Switch>
                  <Route exact path="/" component={() => (
                    <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                      <LookerEmbed folderId="117" />
                    </div>
                  )} />
                  <Route path="/explore" component={() => (
                    <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                      <ExploreComponent exploreId="care_platr/patient_healthcare_records" />
                    </div>
                  )} />
                  <Route path="/grid" component={GridComponent} />
                  <Route path="/user" component={UserComponent} />
                  <Route path="/documents" component={DocumentsComponent} />
                  <Route path="/api" component={APIComponent} />
                  <Route path="/looker-api" component={LookerAPIComponent} />
                  <Route path="/lookerconvo" component={LookerConvo} />

                  {/* Redirect unknown routes to home */}
                  <Redirect from="*" to="/" />
                </Switch>
              </div>
            </div>
          </div>
        ) : (
          <Switch>
            <Route path="/login">
              <LoginPage setIsAuthenticated={setIsAuthenticated} />
            </Route>
            <Redirect to="/login" />
          </Switch>
        )}
      </Router>
    </ExtensionProvider>
  );
});

export default App;