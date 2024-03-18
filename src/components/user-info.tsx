import { useAuthContext } from '@/context/auth-context'

function UserInfo() {

  const {state} = useAuthContext();

  return (
    <div>
      <h2>{state.name}</h2>
      <h2>{state.email}</h2>

    </div>
  )
}

export default UserInfo
