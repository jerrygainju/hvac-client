import NewFooter from "../../homepage/footer/Footer"
import Navigation from "../../homepage/navigation/navigation"
// import RefrigerantForm from "./components/RefrigerantForm"
import RefrigerantProp from "./components/RefrigerantProps"

const Refrigerant = () => {
    return (
        <>
        <Navigation />
        <RefrigerantProp />
        {/* <div className="bottom-0 absolute w-full"> */}
        <NewFooter />
        {/* </div> */}
        </>
    )
} 
export default Refrigerant