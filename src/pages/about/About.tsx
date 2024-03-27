import NewFooter from "../homepage/home/footer/NewFooter"
import Navigation from "../homepage/navigation/navigation"

const About = () => {
    return (
        <div className="flex flex-col min-h-screen">
                <Navigation />
                <div className="flex text-4xl font-serif justify-center">
                Welcome to About us
                </div>
                <div className="mt-auto">
                <NewFooter />
                </div>
                
        </div>
    )
}

export default About