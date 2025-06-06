// /pages/api/coaches/news-add.tsx
import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer } from '../../../src/lib/supabase/server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { teamId, coachId, title, content, imagePath } = req.body;

  if (!teamId || !coachId || !title || !content) {
    return res
      .status(400)
      .json({ error: 'Team ID, coach ID, title, and content are required' });
  }

  try {
    const { data, error } = await supabaseServer
      .from('news')
      .insert({
        team_id: teamId,
        coach_id: coachId, // Add coach_id
        title,
        content,
        image_path: imagePath,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Error adding news article' });
    }

    return res.status(200).json({ news: data });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Unexpected error occurred' });
  }
}
