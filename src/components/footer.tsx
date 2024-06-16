import { CircleUserRound, LinkedinIcon } from "lucide-react"
import { Button } from "./ui/button"

export default function Footer() {
  return (
    <footer className="bg-slate-900 py-6 mt-4">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left mb-4 md:mb-0 text-gray-200">
          <p className="text-md">© 2024 Joel Rondinel Pacheco.</p>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <a className="" target="_blank" href="https://joelrondinelpacheco.github.io/portafolio/">
            <Button className="gap-1" variant="outline">
            <CircleUserRound  />
            <span className="sr-only">Portfolio</span>
            </Button>
          </a>
          <a className="" target="_blank" href="https://github.com/JoelRondinelPacheco">
          <Button className="gap-1" variant="outline">
          <GithubIcon />
            <span className="sr-only">GitHub</span>
            </Button>
          </a>
          <a className="" target="_blank" href="https://www.linkedin.com/in/joelrondinelpacheco">
          <Button className="gap-1" variant="outline">
            <LinkedinIcon  />
            <span className="sr-only">Linkedin</span>
            </Button>
          </a>
        </div>
      </div>
    </footer>
  )
}

function GithubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}


