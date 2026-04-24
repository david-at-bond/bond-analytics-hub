import SignInScreen from './SignInScreen.jsx'

export default function AuthGate({ auth, children }) {
  if (!auth.user) return <SignInScreen onSignIn={auth.signIn} />
  return children
}
