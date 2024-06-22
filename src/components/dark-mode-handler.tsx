import { useAuthContext } from '@/context/auth-context';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';

const DarkModeHandler = () => {

    const { theme, setTheme } = useAuthContext();
  return (
    <div>
        <Button variant={'outline'}>
        {
            theme === "light" ? <Moon onClick={() => setTheme("dark")}/> : <Sun onClick={() => setTheme("light")}/>
    }
    </Button></div>
  )
}

export default DarkModeHandler;