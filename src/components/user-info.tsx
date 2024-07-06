import { useGlobalContext } from '@/lib/common/adapter/react/global-context'

function UserInfo() {

  const {state} = useGlobalContext();

  return (
    <div>
      <h2>{state.name}</h2>
    </div>
  )
}

export default UserInfo
