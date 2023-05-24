export const isAdmin = (keycloak: any) => {
    return keycloak && 
           keycloak.tokenParsed && 
           keycloak.tokenParsed.resource_access['movies-app'] && 
           keycloak.tokenParsed.resource_access['movies-app'].roles.includes('MOVIES_MANAGER')
  }