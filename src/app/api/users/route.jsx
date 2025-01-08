
export const dynamic = 'force-dynamic'; // Disable pre-rendering
import { User } from "@/app/models/User";
import { connectDB } from '@/utils/db';

export async function GET(req) {
  try {
    await connectDB(); // Connect to DB
    const users = await User.find(); // Fetch users
    return Response.json(users);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
