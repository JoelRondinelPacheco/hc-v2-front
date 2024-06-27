import { useGlobalContext } from '@/lib/common/infraestructure/react/auth-context';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';

const DarkModeHandler = () => {

    const { theme, setTheme } = useGlobalContext();
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