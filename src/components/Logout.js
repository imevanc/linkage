import logout from '../auth.js';
import {Link} from 'react-router-dom'

const Logout = () => {
    logout()

    return ( 
        <Link to={"/"} />

     );
}
 
export default Logout;