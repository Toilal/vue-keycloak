import { toRefs, Ref } from 'vue'
import { KeycloakState, state } from './state'
import { isNil } from './utils'

export interface KeycloakComposable {
  isAuthenticated: Ref<boolean>
  hasFailed: Ref<boolean>
  isPending: Ref<boolean>
  token: Ref<string>
  username: Ref<string>
  roles: Ref<string[]>
  hasRoles: (roles: string[]) => boolean
}

export const useKeycloak = (): KeycloakComposable => {
  return {
    ...toRefs<KeycloakState>(state),
    hasRoles: (roles: string[]) =>
      !isNil(roles) && state.isAuthenticated && roles.every(role => state.roles.includes(role)),
  }
}
