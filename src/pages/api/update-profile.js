import { getSession } from 'next-auth/react';
import { connectToDatabase } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  // Get the user session
  const session = await getSession({ req });

  // If the user is not authenticated, return an error
  if (!session) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  // Get the user ID from the session
  const userId = session.user.id;

  // Extract the updated profile information from the request body
  const { firstName, lastName, profilePhoto, newPassword, oldPassword } = req.body;

  try {
    // Connect to the database
    const client = await connectToDatabase();
    const db = client.db();

    // Fetch the user's current profile from the database
    const user = await db.collection('users').findOne({ _id: userId });

    // Check if oldPassword matches the user's current password
    if (oldPassword && user.password !== oldPassword) {
      return res.status(401).json({ success: false, error: 'Old password does not match' });
    }

    // Update the profile information
    const updateResult = await db.collection('users').updateOne(
      { _id: userId },
      {
        $set: {
          firstName,
          lastName,
          profilePhoto,
          password: newPassword,
        },
      }
    );

    if (updateResult.modifiedCount === 1) {
      return res.status(200).json({ success: true, message: 'Profile updated successfully' });
    } else {
      return res.status(500).json({ success: false, error: 'Profile update failed' });
    }
  } catch (error) {
    console.error('An error occurred during profile update:', error);
    return res.status(500).json({ success: false, error: 'An error occurred during profile update' });
  }
}
