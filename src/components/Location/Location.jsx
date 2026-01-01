import { useLocation } from "react-router";

function Location() {
    const location = useLocation()

    return (
        <div data-testid="url-path">{location.pathname}</div>
    )
}

export default Location;