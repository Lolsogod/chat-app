import Keycloak from 'keycloak-js'
import './App.css'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import { chatApi } from './components/api/ChatApi'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/home/Home';
import Navbar from './components/Navbar';

function App() {
  const keycloak = new Keycloak({
    url: "http://localhost:8080",
    realm: "company-services",
    clientId: "movies-app"
  })
  const initOptions = { pkceMethod: 'S256' }

  const loadingComponent = (
    <div className='text-blue-700'>Loading...</div>
  )

  const handleOnEvent = async (event: any, error:any) => {
    if (event === 'onAuthSuccess') {
      if (keycloak.authenticated) {
        let response = await chatApi.getUserExtrasMe(keycloak.token)
        if (response.status === 404) {
          const userExtra = { avatar: keycloak.tokenParsed!.preferred_username }
          response = await chatApi.saveUserExtrasMe(keycloak.token, userExtra)
          console.log('UserExtra created for ' + keycloak.tokenParsed!.preferred_username)
        }
        //@ts-ignore
        keycloak['avatar'] = response.data.avatar
      }
    }
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
  ]);
  

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={initOptions}
      LoadingComponent={loadingComponent}
      onEvent={(event, error) => handleOnEvent(event, error)}
    >
        <Navbar/>
       <RouterProvider router={router} />
    </ReactKeycloakProvider>
      
  )
}

export default App
