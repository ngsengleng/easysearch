import {
    FirebaseAuthConsumer,
    IfFirebaseAuthed,
    IfFirebaseUnAuthed
} from "@react-firebase/auth";

import AppShell from "./components/AppShell";
import NoAuth from "./routes/RouteNoAuth";
import UserAuth from "./routes/RouteUserAuth";

export default function App() {
    
    // do firebase authentication
    // TODO
    return (
        <div>
            <AppShell />
            <FirebaseAuthConsumer>
                <IfFirebaseAuthed>
                    <UserAuth />
                </IfFirebaseAuthed>
                <IfFirebaseUnAuthed>
                    <NoAuth />
                </IfFirebaseUnAuthed>
            </FirebaseAuthConsumer>
        </div>
    )
}