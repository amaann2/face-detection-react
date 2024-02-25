import { Link } from "react-router-dom"

const ValidationFacePage = () => {
    return (
        <div>
            <Link className=" bg-white text-black p-5 rounded-md " to={'/face'}>Validate your face</Link>
        </div >
    )
}

export default ValidationFacePage