import { useAuthContext } from '@/context/auth-context';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';

const DarkModeHandler = () => {

    const { state, dispatch } = useAuthContext();

    const handleToggleTheme = () => {
        dispatch({
            type: 'TOGGLE_THEME'
        })
    }
  return (
    <div onClick={handleToggleTheme}>
        <Button variant={'outline'}>
        {
            state.darkMode ? <Moon /> : <Sun />
    }
    </Button></div>
  )
}

export default DarkModeHandler;