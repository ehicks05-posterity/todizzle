import { db } from '@/lib/db';
import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';

// Use the clerk client name you set in the Instant dashboard auth tab
const CLERK_CLIENT_NAME = 'clerk';

export function InstantSignIn() {
	const { getToken, userId } = useAuth();

	const signInToInstantWithClerkToken = async () => {
		const idToken = await getToken();
		if (!idToken) {
			console.log('no token');
			// Sign out of Instant to clear the Instant session.
			db.auth.signOut();
			return;
		}

		// Create a long-lived session with Instant for your clerk user.
		// It will look up the user by email or create a new user with
		// the email address in the session token.
		db.auth.signInWithIdToken({
			clientName: CLERK_CLIENT_NAME,
			idToken,
		});
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		signInToInstantWithClerkToken();
	}, [userId]);

	const { error } = db.useAuth();

	if (error) {
		return <div>Error signing in to Instant! {error.message}</div>;
	}
	return null;
}
