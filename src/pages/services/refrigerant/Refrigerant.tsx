import NewFooter from "../../homepage/footer/Footer"
import Navigation from "../../homepage/navigation/navigation"
import RefrigerantProp from "./components/RefrigerantProps"

const Refrigerant = () => {
    return (
        <div className="flex flex-col min-h-screen w-screen">
            <Navigation />
            <div className="flex-grow">
                <RefrigerantProp />
            </div>
            <NewFooter />
        </div>
    )
} 
export default Refrigerant
