export const isAdmin = (keycloak: any) => {
    return keycloak && 
           keycloak.tokenParsed && 
           keycloak.tokenParsed.resource_access['movies-app'] && 
           keycloak.tokenParsed.resource_access['movies-app'].roles.includes('MOVIES_MANAGER')
  }
export const roleParser = (keycloak: any) => {
        return keycloak.authenticated && keycloak.tokenParsed && keycloak.tokenParsed.resource_access["movies-app"].roles
        
}
export const getUsername = (keycloak: any) => {
    return keycloak.authenticated && keycloak.tokenParsed && keycloak.tokenParsed.preferred_username
  }