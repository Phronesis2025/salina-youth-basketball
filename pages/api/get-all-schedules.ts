import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer } from '../../src/lib/supabase/server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { data, error } = await supabaseServer
      .from('schedules')
      .select('id, title, date, type, location, description')
      .order('date', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Error fetching schedules' });
    }

    return res.status(200).json({ schedules: data || [] });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Unexpected error occurred' });
  }
}
