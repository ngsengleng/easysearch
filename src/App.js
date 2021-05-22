import {
    FirebaseAuthConsumer,
    IfFirebaseAuthed,
    IfFirebaseUnAuthed
} from "@react-firebase/auth";

import NoAuth from "./routes/RouteNoAuth";
import UserAuth from "./routes/RouteUserAuth";

export default function App() {
    
    // do firebase authentication
    // TODO
    if (false) {
        return <NoAuth />;
    }
    
    return <UserAuth />;
}