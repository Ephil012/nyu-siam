import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"

const Navigation = () => {
    // Sets menu state to hide it by default on mobile and toggle when you click the menu button
    const [showMenu, setShowMenu] = React.useState(false)
    const onClick = () => setShowMenu(!showMenu)
    return (
        <nav className="flex items-center flex-col lg:flex-row lg:justify-between bg-purple-200 p-6">
            <div className="flex w-full justify-between lg:w-auto">
                <a href="/"><StaticImage src="../images/icon.png" objectFit="contain" alt="" className="w-20"></StaticImage></a>
                <button className="text-black font-semibold hover:text-opacity-70 lg:hidden" onClick={onClick}>Menu</button>
            </div>
            <div className={"lg:flex items-center flex-col lg:flex-row" + (showMenu ? " flex" : " hidden")}>
                <a href="/about" className="text-black font-semibold hover:text-opacity-70 pt-4 lg:pt-0 lg:pl-6">
                    About Us
                </a>
                <a href="/people" className="text-black font-semibold hover:text-opacity-70 pt-4 lg:pt-0 lg:pl-6">
                    People
                </a>
                <a href="/events" className="text-black font-semibold hover:text-opacity-70 pt-4 lg:pt-0 lg:pl-6">
                    Events
                </a>
                <a href="https://forms.gle/dDcWG4jYEjeVbLRr7" className="text-black font-semibold hover:text-opacity-70 pt-4 lg:pt-0 lg:pl-6">
                    Join Us
                </a>
            </div>
        </nav>
    )
}

export default Navigation
