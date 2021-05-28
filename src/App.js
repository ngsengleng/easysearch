import {
    FirebaseAuthConsumer,
    FirebaseAuthProvider,
    IfFirebaseAuthed,
    IfFirebaseUnAuthed
} from "@react-firebase/auth";

import { config } from "./config/firebase";
import firebase from "@firebase/app";
import "@firebase/auth";

import AppShell from "./components/AppShell";
import NoAuth from "./routes/RouteNoAuth";
import UserAuth from "./routes/RouteUserAuth";
import PageTitle from "./components/PageTitle";


export default function App() {
    return (
        <div>
            <FirebaseAuthProvider {...config} firebase={firebase}>
                <AppShell />
                <PageTitle />
                <FirebaseAuthConsumer >
                    <IfFirebaseAuthed>
                        <UserAuth />
                    </IfFirebaseAuthed>
                    <IfFirebaseUnAuthed>
                        <NoAuth />
                    </IfFirebaseUnAuthed>
                </FirebaseAuthConsumer>
            </FirebaseAuthProvider>
        </div>
    )
}